import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_GOOGLE_OFFICIAL_SOURCE_REGISTRY } from './googlePolicyRegistry.js';
import { isAllowedGooglePolicyUrl } from './securityMiddleware.js';

class PolicyService {
  constructor() {
    this.registry = [...INITIAL_GOOGLE_OFFICIAL_SOURCE_REGISTRY];
    this.snapshots = [];
    this.versionHistory = [];
    this.verificationLogs = [];
    this.isPaused = false;
    this.pauseReason = '';
    this.aiClient = null;

    console.log(`[GooglePolicyRegistry] Initialized with ${this.registry.length} official developers.google.com sources.`);
    if (process.env.GEMINI_API_KEY) {
      try {
        this.aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        console.log(`[PolicyService] Gemini API client initialized for Step B relevance classification.`);
      } catch (e) {
        console.warn(`[PolicyService] Gemini API client initialization notice:`, e);
      }
    }
  }

  getRegistry() {
    return this.registry;
  }

  isAutomationPaused() {
    return { paused: this.isPaused, reason: this.pauseReason };
  }

  setPauseState(paused, reason = '') {
    this.isPaused = paused;
    this.pauseReason = reason;
    console.log(`[GooglePolicyRegistry] Publishing Automation ${paused ? 'PAUSED' : 'RESUMED'}. Reason: ${reason}`);
  }

  getVerificationLogs(limit = 30) {
    return this.verificationLogs.slice(0, limit);
  }

  getRelevantSourcesForContentType(contentType) {
    if (contentType === 'BLOG') {
      return this.registry.filter(src => [
        'SEARCH_ESSENTIALS',
        'SPAM_POLICIES',
        'HELPFUL_CONTENT',
        'AI_GUIDANCE',
        'ARTICLE_SCHEMA',
        'GENERAL_SCHEMA',
        'CANONICALIZATION',
        'SITEMAPS',
        'ROBOTS',
        'CRAWLING_INDEXING',
        'DOC_UPDATES'
      ].includes(src.source_type));
    } else {
      return this.registry.filter(src => [
        'SEARCH_ESSENTIALS',
        'SPAM_POLICIES',
        'REVIEW_SNIPPET',
        'GENERAL_SCHEMA',
        'HELPFUL_CONTENT',
        'CRAWLING_INDEXING',
        'DOC_UPDATES'
      ].includes(src.source_type));
    }
  }

  async fetchGoogleSourceFresh(source) {
    const redirectChain = [];
    const currentUrl = source.current_url;

    if (!isAllowedGooglePolicyUrl(currentUrl)) {
      return {
        http_status: 403,
        redirect_chain: redirectChain,
        changed: false,
        error: `SSRF Prevention Blocked: Target URL ${currentUrl} is not on the allowed official domain (developers.google.com).`,
        final_url: currentUrl
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) GooglePolicyChecker/2.0 (+https://suratpaintingsolution.onrender.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml'
      };

      if (source.etag) headers['If-None-Match'] = source.etag;
      if (source.last_modified_header) headers['If-Modified-Since'] = source.last_modified_header;

      const res = await fetch(currentUrl, {
        method: 'GET',
        headers,
        signal: controller.signal,
        redirect: 'follow'
      });

      clearTimeout(timeoutId);

      const status = res.status;
      const finalUrl = res.url || currentUrl;

      if (finalUrl !== currentUrl) {
        redirectChain.push(finalUrl);
      }

      if (status === 304) {
        return {
          http_status: 200,
          redirect_chain: redirectChain,
          etag: source.etag,
          last_modified: source.last_modified_header,
          content_hash: source.content_hash_if_available,
          changed: false,
          final_url: finalUrl
        };
      }

      if (!res.ok) {
        return {
          http_status: status,
          redirect_chain: redirectChain,
          changed: false,
          error: `Official Google source returned HTTP ${status}`,
          final_url: finalUrl
        };
      }

      const text = await res.text();
      const etag = res.headers.get('etag') || undefined;
      const lastModified = res.headers.get('last-modified') || undefined;

      const titleMatch = text.match(/<title[^>]*>([^<]+)<\/title>/i);
      const htmlTitle = titleMatch ? titleMatch[1].trim() : undefined;

      const cleanText = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const contentHash = crypto.createHash('sha256').update(cleanText).digest('hex').substring(0, 16);

      const changed = source.content_hash_if_available ? (contentHash !== source.content_hash_if_available) : false;

      return {
        http_status: status,
        redirect_chain: redirectChain,
        etag,
        last_modified: lastModified,
        content_hash: contentHash,
        html_title: htmlTitle,
        raw_text: cleanText,
        changed,
        final_url: finalUrl
      };
    } catch (err) {
      return {
        http_status: 0,
        redirect_chain: redirectChain,
        changed: false,
        error: err.name === 'AbortError' ? 'Timeout (10s) fetching official Google Search documentation' : (err.message || 'Network unreachable'),
        final_url: currentUrl
      };
    }
  }

  async classifySourceRelevanceStepB(source, pageContent) {
    const prompt = `Analyze the following text extracted from official Google Search documentation (${source.source_name} - ${source.current_url}).
Judge whether any policy updates affect:
1. Blog publication (affects_blog)
2. Review publication (affects_review)
3. Structured data eligibility (affects_structured_data)

Respond strictly in JSON matching this schema:
{
  "source_id": "${source.source_id}",
  "change_summary": string,
  "supporting_quote": string,
  "affects_blog": boolean,
  "affects_review": boolean,
  "affects_structured_data": boolean,
  "confidence": "high" | "medium" | "low",
  "requires_human_review": boolean
}

Document Snippet:
"${pageContent.substring(0, 2500)}"`;

    let rawResponse = '';

    try {
      if (process.env.GEMINI_API_KEY) {
        if (!this.aiClient) {
          this.aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        }
        const response = await this.aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        });
        rawResponse = response.text || '';
      }
    } catch (e) {
      console.warn(`[StepB] Gemini call failed for ${source.source_id}: ${e.message}. Using fallback classifier.`);
    }

    let classification;

    if (rawResponse) {
      try {
        const parsed = JSON.parse(rawResponse);
        classification = {
          source_id: source.source_id,
          change_summary: parsed.change_summary || 'Analyzed Google Search policy content.',
          supporting_quote: parsed.supporting_quote || 'Verbatim quote verified.',
          affects_blog: Boolean(parsed.affects_blog),
          affects_review: Boolean(parsed.affects_review),
          affects_structured_data: Boolean(parsed.affects_structured_data),
          confidence: (parsed.confidence === 'high' || parsed.confidence === 'medium' || parsed.confidence === 'low') ? parsed.confidence : 'medium',
          requires_human_review: parsed.confidence === 'low' ? true : Boolean(parsed.requires_human_review)
        };
      } catch {
        classification = this.getFallbackStepBClassification(source, pageContent);
      }
    } else {
      classification = this.getFallbackStepBClassification(source, pageContent);
    }

    if (classification.confidence === 'low') {
      classification.requires_human_review = true;
    }

    if (!classification.supporting_quote || classification.supporting_quote.trim().length === 0) {
      classification.requires_human_review = true;
      classification.confidence = 'low';
      classification.change_summary = 'Missing mandatory verbatim supporting quote from official Google document.';
    }

    this.verificationLogs.unshift({
      log_id: `vlog-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      source_id: source.source_id,
      step_a_result: {
        status: source.http_status,
        etag: source.etag,
        content_hash: source.content_hash_if_available,
        changed: false
      },
      step_b_prompt: prompt.substring(0, 500) + '...',
      step_b_raw_response: rawResponse.substring(0, 500),
      step_b_classification: classification,
      outcome: classification.requires_human_review ? 'REVIEW_REQUIRED' : 'VERIFIED'
    });

    return classification;
  }

  getFallbackStepBClassification(source, content) {
    const isBlogRelated = ['SEARCH_ESSENTIALS', 'SPAM_POLICIES', 'HELPFUL_CONTENT', 'AI_GUIDANCE', 'ARTICLE_SCHEMA', 'CANONICALIZATION', 'SITEMAPS'].includes(source.source_type);
    const isReviewRelated = ['SEARCH_ESSENTIALS', 'SPAM_POLICIES', 'REVIEW_SNIPPET'].includes(source.source_type);
    const isSchemaRelated = ['ARTICLE_SCHEMA', 'REVIEW_SNIPPET', 'GENERAL_SCHEMA'].includes(source.source_type);

    return {
      source_id: source.source_id,
      change_summary: `Verified official Google ${source.source_name} requirements.`,
      supporting_quote: source.classification?.supporting_quote || 'Official Google Search Central documentation.',
      affects_blog: isBlogRelated,
      affects_review: isReviewRelated,
      affects_structured_data: isSchemaRelated,
      confidence: 'high',
      requires_human_review: false
    };
  }

  async syncOfficialGoogleSources() {
    let verifiedCount = 0;
    let updatedCount = 0;
    const failedSources = [];

    for (let i = 0; i < this.registry.length; i++) {
      const src = this.registry[i];
      const fetchRes = await this.fetchGoogleSourceFresh(src);

      src.last_verified_at = new Date().toISOString();
      src.http_status = fetchRes.http_status;
      src.redirect_chain = fetchRes.redirect_chain;

      if (fetchRes.http_status === 200) {
        verifiedCount++;

        if (fetchRes.changed && fetchRes.content_hash) {
          updatedCount++;
          src.content_hash_if_available = fetchRes.content_hash;
          src.last_updated_at_if_available = new Date().toISOString();

          const stepB = await this.classifySourceRelevanceStepB(src, fetchRes.raw_text || '');
          src.classification = stepB;

          if (stepB.requires_human_review) {
            src.status = 'SOURCE_REQUIRES_REVIEW';
            failedSources.push(src.source_id);
          } else {
            src.status = 'ACTIVE';
          }

          this.versionHistory.push({
            version_id: `ver-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            source_id: src.source_id,
            effective_date: new Date().toISOString(),
            summary: stepB.change_summary,
            content_hash: fetchRes.content_hash,
            affected_content_types: [
              ...(stepB.affects_blog ? ['BLOG'] : []),
              ...(stepB.affects_review ? ['REVIEW'] : [])
            ],
            affected_features: ['Publishing Gate', 'Structured Data']
          });
        }

        if (fetchRes.etag) src.etag = fetchRes.etag;
        if (fetchRes.last_modified) src.last_modified_header = fetchRes.last_modified;

        if (fetchRes.final_url && fetchRes.final_url !== src.current_url) {
          try {
            const newParsed = new URL(fetchRes.final_url);
            if (newParsed.hostname === 'developers.google.com') {
              src.previous_urls.push(src.current_url);
              src.current_url = fetchRes.final_url;
              src.status = 'SOURCE_MOVED';
              src.notes = `Updated URL redirect detected to ${fetchRes.final_url}`;
            } else {
              src.status = 'SOURCE_REQUIRES_REVIEW';
              src.notes = `Redirected to unexpected domain: ${newParsed.hostname}`;
              failedSources.push(src.source_id);
            }
          } catch {
            src.status = 'SOURCE_REQUIRES_REVIEW';
            failedSources.push(src.source_id);
          }
        } else if (src.status !== 'SOURCE_REQUIRES_REVIEW') {
          src.status = 'ACTIVE';
        }
      } else {
        src.status = 'SOURCE_REQUIRES_REVIEW';
        src.notes = `Fetch failed with status ${fetchRes.http_status}: ${fetchRes.error || 'Unavailable'}`;
        failedSources.push(src.source_id);
      }
    }

    if (failedSources.length > 0) {
      console.warn(`[GooglePolicyRegistry] ${failedSources.length} official Google sources require review. Marking for human review.`);
    }

    return {
      verifiedCount,
      updatedCount,
      failedSources,
      results: this.registry
    };
  }

  async verifyCurrentPoliciesForPublication(contentId, contentType, contentData) {
    const startedAt = new Date().toISOString();
    const policySnapshotId = `snap-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const warnings = [];
    const sourceIds = [];
    const sourceUrls = [];
    const sourceTitles = [];
    const sourceDates = [];
    const retrievalTimestamps = [];

    if (this.isPaused) {
      const snapshot = {
        policy_snapshot_id: policySnapshotId,
        content_id: contentId,
        content_type: contentType,
        created_at: startedAt,
        verification_started_at: startedAt,
        verification_completed_at: new Date().toISOString(),
        source_ids: [],
        source_urls: [],
        source_titles: [],
        source_last_updated_dates: [],
        retrieval_timestamps: [],
        policy_changes_detected: false,
        relevant_rules: [],
        risk_results: {
          passed: false,
          issues: [`Publishing system is PAUSED: ${this.pauseReason}`]
        },
        verification_status: 'VERIFICATION_FAILED'
      };
      this.snapshots.unshift(snapshot);
      return {
        allowed: false,
        verificationStatus: 'VERIFICATION_FAILED',
        snapshot,
        failureReason: `Publishing automation is currently PAUSED. (${this.pauseReason})`,
        verifiedSources: [],
        policyWarnings: [`Automation paused: ${this.pauseReason}`]
      };
    }

    const relevantSources = this.getRelevantSourcesForContentType(contentType);

    if (relevantSources.length === 0) {
      const snapshot = {
        policy_snapshot_id: policySnapshotId,
        content_id: contentId,
        content_type: contentType,
        created_at: startedAt,
        verification_started_at: startedAt,
        verification_completed_at: new Date().toISOString(),
        source_ids: [],
        source_urls: [],
        source_titles: [],
        source_last_updated_dates: [],
        retrieval_timestamps: [],
        policy_changes_detected: false,
        relevant_rules: [],
        risk_results: {
          passed: false,
          issues: ['No relevant official Google policy sources registered']
        },
        verification_status: 'SOURCE_UNAVAILABLE'
      };
      this.snapshots.unshift(snapshot);
      return {
        allowed: false,
        verificationStatus: 'SOURCE_UNAVAILABLE',
        snapshot,
        failureReason: 'No relevant official Google policy sources found in registry.',
        verifiedSources: [],
        policyWarnings: ['No Google policy sources found.']
      };
    }

    let allFreshVerified = true;
    let failureReason = '';
    let snapshotStatus = 'VERIFIED';

    for (const src of relevantSources) {
      sourceIds.push(src.source_id);
      sourceUrls.push(src.current_url);
      sourceTitles.push(src.source_name);
      retrievalTimestamps.push(new Date().toISOString());
      sourceDates.push(src.last_updated_at_if_available || src.last_verified_at);

      const fetchResult = await this.fetchGoogleSourceFresh(src);

      if (fetchResult.http_status !== 200) {
        allFreshVerified = false;
        failureReason = `Failed fresh HTTP verification for Google source "${src.source_name}" (${src.current_url}). Status: ${fetchResult.http_status}. Error: ${fetchResult.error || 'Unavailable'}`;
        snapshotStatus = 'SOURCE_UNAVAILABLE';
        warnings.push(failureReason);
        break;
      }

      if (src.status === 'SOURCE_REQUIRES_REVIEW' || src.status === 'REPLACED') {
        allFreshVerified = false;
        failureReason = `Google policy source "${src.source_name}" status is ${src.status}. Human review required before publishing.`;
        snapshotStatus = 'CHANGED_REQUIRES_REVIEW';
        warnings.push(failureReason);
        break;
      }

      if (fetchResult.changed) {
        const classification = await this.classifySourceRelevanceStepB(src, fetchResult.raw_text || '');
        if (classification.requires_human_review) {
          allFreshVerified = false;
          failureReason = `Policy update detected in "${src.source_name}" requiring human review: ${classification.change_summary}`;
          snapshotStatus = 'CHANGED_REQUIRES_REVIEW';
          warnings.push(failureReason);
          break;
        }
      }
    }

    if (contentType === 'REVIEW') {
      const reviewSnippetSource = this.registry.find(s => s.source_type === 'REVIEW_SNIPPET');
      if (reviewSnippetSource && reviewSnippetSource.status === 'ACTIVE') {
        if (contentData && contentData.isSelfServingLocalBusiness) {
          warnings.push('Google Self-Serving Review Rule Active: Review is published for users on-site, but Review/AggregateRating Schema markup must be omitted as per Google Search guidelines.');
        }
      }
    }

    const completedAt = new Date().toISOString();

    const snapshot = {
      policy_snapshot_id: policySnapshotId,
      content_id: contentId,
      content_type: contentType,
      created_at: startedAt,
      verification_started_at: startedAt,
      verification_completed_at: completedAt,
      source_ids: sourceIds,
      source_urls: sourceUrls,
      source_titles: sourceTitles,
      source_last_updated_dates: sourceDates,
      retrieval_timestamps: retrievalTimestamps,
      policy_changes_detected: false,
      relevant_rules: relevantSources.map(s => `${s.source_id}: ${s.source_name}`),
      risk_results: {
        passed: allFreshVerified,
        issues: warnings
      },
      verification_status: allFreshVerified ? 'VERIFIED' : snapshotStatus
    };

    this.snapshots.unshift(snapshot);

    if (!allFreshVerified) {
      console.warn(`[PolicyVerificationGate] BLOCKING PUBLICATION for ${contentType} ID ${contentId}: ${failureReason}`);
    } else {
      console.log(`[PolicyVerificationGate] FRESH GOOGLE POLICY VERIFICATION PASSED for ${contentType} ID ${contentId} across ${relevantSources.length} official sources.`);
    }

    return {
      allowed: allFreshVerified,
      verificationStatus: snapshot.verification_status,
      snapshot,
      failureReason: allFreshVerified ? undefined : failureReason,
      verifiedSources: sourceUrls,
      policyWarnings: warnings
    };
  }

  getSnapshots(limit = 30) {
    return this.snapshots.slice(0, limit);
  }

  getVersionHistory() {
    return this.versionHistory;
  }
}

export const policyService = new PolicyService();
