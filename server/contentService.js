import { policyService } from './policyService.js';
import { businessFactsService } from './businessFactsService.js';
import { auditLogService } from './auditLogService.js';

export const INITIAL_BLOGS = [
  {
    id: 'protecting-surat-home-monsoon-waterproofing',
    title: 'How to Protect Your Surat Home from Monsoon Wall Seepage & Dampness',
    category: 'Waterproofing Tips',
    date: 'May 15, 2026',
    author: 'SuratPaintingSolution Technical Team',
    readTime: '4 min read',
    image: '/assets/images/service_waterproofing.jpg',
    summary: 'Learn essential pre-monsoon waterproofing steps for Surat homeowners to prevent wall fungus, peeling paint, and ceiling leaks during heavy rains.',
    content: `Surat experiences intense rainfall during the monsoon months from July to September. For homes in localities like Adajan, Rander, and Vesu near the Tapi river basin, high humidity and rainwater pooling on flat RCC roofs often lead to wall dampness, peeling paint, and efflorescence (sora).

### Key Signs Your Wall Needs Pre-Monsoon Waterproofing
1. **Peeling or Flaking Paint**: Small bubbles or loose paint flakes indicate moisture trapped behind the paint layer.
2. **White Powdering (Efflorescence)**: Salt deposits pushed out by moisture in brickwork and cement plaster.
3. **Musty Smell & Black Mold**: Fungal spores growing in damp plaster corners, especially behind wardrobes.

### Step-by-Step Waterproofing Solution
To permanently fix dampness before monsoon hits:
- **Terrace Sealing**: Apply an elastomeric liquid membrane like Asian Paints SmartCare Damp Proof on terrace floors and parapet walls.
- **External Crack Repair**: Fill all structural hairline cracks with acrylic elastomeric sealant rather than standard white cement.
- **Internal Anti-Damp Primer**: Treat damp patches with a penetrating silicone waterproofing primer before applying interior emulsion.

By investing in professional waterproofing before monsoon rains start, you protect your building structure and save thousands of rupees in future repair costs.`,
    status: 'PUBLISHED',
    lastVerifiedAt: new Date().toISOString(),
    policySnapshotId: 'snap-seed-1',
    structuredDataEligible: true,
    canonicalUrl: 'https://suratpaintingsolution.onrender.com/blog/protecting-surat-home-monsoon-waterproofing',
    seoTitle: 'How to Protect Your Surat Home from Monsoon Wall Seepage & Dampness',
    seoDescription: 'Learn essential pre-monsoon waterproofing steps for Surat homeowners to prevent wall fungus, peeling paint, and ceiling leaks during heavy rains.'
  },
  {
    id: 'choosing-asian-paints-shades-surat-apartments',
    title: 'Top Asian Paints Color Combinations for Surat Apartments & Bungalows',
    category: 'Color Trends',
    date: 'June 2, 2026',
    author: 'Design Consultant',
    readTime: '5 min read',
    image: '/assets/images/service_home_painting.jpg',
    summary: 'Discover the most popular Asian Paints and Berger color palettes suited for Surat’s climate, natural sunlight, and contemporary interior layouts.',
    content: `Selecting the right wall colors can make a compact apartment in City Light or Pal feel airy and spacious, or give a luxurious Vesu bungalow a regal warmth.

### Popular Color Combinations in Surat Homes
1. **Warm Cream & Soft Beige**: Classic choices that reflect natural sunlight without harsh glare. Perfect for living rooms in Adajan flats.
2. **Royal Teal & Metallic Gold**: Excellent accent combination for TV backdrop walls and dining alcoves.
3. **Soft Sage Green & Pearl White**: Calm, nature-inspired palette ideal for bedrooms, promoting restful sleep.
4. **Muted Terracotta & Off-White**: Brings traditional Gujarati warmth with a modern minimalist twist.

### Tips for Surat Natural Light
Since Surat enjoys bright sunny days most of the year, avoid overly glossy paints on walls facing west or south to prevent blinding glare. Opt for matte or soft-sheen emulsions like Asian Paints Royale Velvet or Royale Health Shield.`,
    status: 'PUBLISHED',
    lastVerifiedAt: new Date().toISOString(),
    policySnapshotId: 'snap-seed-2',
    structuredDataEligible: true,
    canonicalUrl: 'https://suratpaintingsolution.onrender.com/blog/choosing-asian-paints-shades-surat-apartments',
    seoTitle: 'Top Asian Paints Color Combinations for Surat Apartments',
    seoDescription: 'Discover the most popular Asian Paints and Berger color palettes suited for Surat’s climate, natural sunlight, and contemporary interior layouts.'
  },
  {
    id: 'dust-free-painting-process-explained',
    title: 'What Is Mechanized Dust-Free Painting and Why It Matters',
    category: 'Painting Technology',
    date: 'April 20, 2026',
    author: 'Operations Team',
    readTime: '3 min read',
    image: '/assets/images/service_pop_putty.jpg',
    summary: 'Understand how mechanized sanding machines with integrated vacuum extraction keep your home 90% cleaner during house painting.',
    content: `Traditional manual wall sanding generates micro-fine chalk dust that settles inside air conditioner ducts, sofa cushions, electronic circuits, and kitchen cabinets for weeks.

### How Vacuum-Assisted Sanding Works
Our team utilizes specialized electrical sanders connected to HEPA filter dust extractors:
- Sanding dust is sucked away instantly at the wall contact surface before entering room air.
- Walls receive a significantly more uniform, level sanding finish than manual sandpaper rubbing.
- Families with young children or elderly members with asthma can comfortably remain in the home during painting.

Combined with full plastic drop-cloth masking on floorings and furniture, you get a stress-free home makeover.`,
    status: 'PUBLISHED',
    lastVerifiedAt: new Date().toISOString(),
    policySnapshotId: 'snap-seed-3',
    structuredDataEligible: true,
    canonicalUrl: 'https://suratpaintingsolution.onrender.com/blog/dust-free-painting-process-explained',
    seoTitle: 'What Is Mechanized Dust-Free Painting and Why It Matters',
    seoDescription: 'Understand how mechanized sanding machines with integrated vacuum extraction keep your home 90% cleaner during house painting.'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Jayeshbhai Patel',
    role: 'Homeowner',
    area: 'Adajan, Surat',
    rating: 5,
    service: 'Interior Painting & Wall Putty',
    date: 'January 2026',
    comment: 'SuratPaintingSolution did an incredible job painting our 3BHK flat near L.P. Savani Road. They masked all our furniture with plastic sheets so carefully that there was zero dust left on our sofas or TV. Punctual, respectful crew and exact quotation!',
    isAuthenticCustomer: true,
    isIncentivized: false,
    isIncentiveDisclosed: true,
    isDuplicate: false,
    isSelfServingLocalBusiness: true,
    status: 'PUBLISHED',
    lastVerifiedAt: new Date().toISOString(),
    policySnapshotId: 'snap-rev-1',
    structuredDataEligible: false
  },
  {
    id: 'rev-2',
    author: 'Sneha Shah',
    role: 'Apartment Owner',
    area: 'Vesu, Surat',
    rating: 5,
    service: 'Royale Play Texture Wall',
    date: 'December 2025',
    comment: 'The Royale Play metallic texture wall in our living room looks like something straight out of an interior design magazine! Everyone visiting our home in Vesu asks who painted it. Very impressive skill!',
    isAuthenticCustomer: true,
    isIncentivized: false,
    isIncentiveDisclosed: true,
    isDuplicate: false,
    isSelfServingLocalBusiness: true,
    status: 'PUBLISHED',
    lastVerifiedAt: new Date().toISOString(),
    policySnapshotId: 'snap-rev-2',
    structuredDataEligible: false
  },
  {
    id: 'rev-3',
    author: 'Rameshchandra Mehta',
    role: 'Bungalow Owner',
    area: 'Piplod, Surat',
    rating: 5,
    service: 'Exterior Apex Painting & Wood Polish',
    date: 'November 2025',
    comment: 'We needed full exterior repainting and teak door polishing for our bungalow before my daughter’s wedding. The team worked tirelessly, finished 2 days early, and the finish is top class.',
    isAuthenticCustomer: true,
    isIncentivized: false,
    isIncentiveDisclosed: true,
    isDuplicate: false,
    isSelfServingLocalBusiness: true,
    status: 'PUBLISHED',
    lastVerifiedAt: new Date().toISOString(),
    policySnapshotId: 'snap-rev-3',
    structuredDataEligible: false
  }
];

class ContentService {
  constructor() {
    this.blogs = [...INITIAL_BLOGS];
    this.reviews = [...INITIAL_REVIEWS];
    this.lockedContentIds = new Set();
  }

  getBlogs(includeDrafts = false) {
    if (includeDrafts) return this.blogs;
    return this.blogs.filter(b => b.status === 'PUBLISHED');
  }

  getBlogById(id) {
    return this.blogs.find(b => b.id === id);
  }

  getReviews(includePending = false) {
    if (includePending) return this.reviews;
    return this.reviews.filter(r => r.status === 'PUBLISHED');
  }

  getReviewById(id) {
    return this.reviews.find(r => r.id === id);
  }

  getWeeklyPublishedBlogCount() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return this.blogs.filter(b => {
      if (b.status !== 'PUBLISHED' || !b.lastVerifiedAt) return false;
      const pubDate = new Date(b.lastVerifiedAt);
      return pubDate >= oneWeekAgo;
    }).length;
  }

  checkBlogDuplicate(title, summary, excludeId) {
    const normTitle = title.toLowerCase().trim();
    const normSummary = summary.toLowerCase().trim();

    for (const blog of this.blogs) {
      if (excludeId && blog.id === excludeId) continue;

      const existingTitle = blog.title.toLowerCase().trim();
      const existingSummary = blog.summary.toLowerCase().trim();

      if (normTitle === existingTitle) {
        return { isDuplicate: true, duplicateReason: `Exact title match with existing article "${blog.title}"` };
      }

      const words1 = new Set(normTitle.split(/\s+/).filter(w => w.length > 3));
      const words2 = new Set(existingTitle.split(/\s+/).filter(w => w.length > 3));
      let intersection = 0;
      words1.forEach(w => { if (words2.has(w)) intersection++; });

      if (words1.size > 0 && (intersection / words1.size) > 0.75) {
        return { isDuplicate: true, duplicateReason: `High search intent and heading overlap (>75%) with existing article "${blog.title}"` };
      }
    }

    return { isDuplicate: false };
  }

  saveBlog(blogData) {
    const id = blogData.id || `blog-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const existingIndex = this.blogs.findIndex(b => b.id === id);

    const fullBlog = {
      id,
      title: blogData.title || 'Untitled Blog Post',
      category: blogData.category || 'General',
      date: blogData.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: blogData.author || 'SuratPaintingSolution Editorial Team',
      readTime: blogData.readTime || '4 min read',
      image: blogData.image || '/assets/images/service_home_painting.jpg',
      summary: blogData.summary || '',
      content: blogData.content || '',
      status: 'DRAFT',
      scheduledFor: blogData.scheduledFor,
      structuredDataEligible: true,
      canonicalUrl: `https://suratpaintingsolution.onrender.com/blog/${id}`,
      seoTitle: blogData.seoTitle || blogData.title || '',
      seoDescription: blogData.seoDescription || blogData.summary || ''
    };

    if (existingIndex >= 0) {
      this.blogs[existingIndex] = fullBlog;
    } else {
      this.blogs.unshift(fullBlog);
    }

    return fullBlog;
  }

  submitReview(reviewData) {
    const id = reviewData.id || `rev-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    const normComment = (reviewData.comment || '').toLowerCase().trim();
    const isDup = this.reviews.some(r => r.comment.toLowerCase().trim() === normComment);

    const fullReview = {
      id,
      author: reviewData.author || 'Anonymous Customer',
      role: reviewData.role || 'Homeowner',
      area: reviewData.area || 'Surat',
      rating: reviewData.rating || 5,
      service: reviewData.service || 'Painting Service',
      date: reviewData.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      comment: reviewData.comment || '',
      isAuthenticCustomer: reviewData.isAuthenticCustomer ?? true,
      isIncentivized: reviewData.isIncentivized ?? false,
      isIncentiveDisclosed: reviewData.isIncentiveDisclosed ?? true,
      isDuplicate: isDup,
      isSelfServingLocalBusiness: true,
      status: isDup ? 'REJECTED' : 'PENDING',
      publishStatusReason: isDup ? 'Rejected: Duplicate review text detected.' : undefined,
      structuredDataEligible: false
    };

    this.reviews.unshift(fullReview);
    return fullReview;
  }

  async publishBlog(blogId, publisher = 'Admin') {
    const blog = this.blogs.find(b => b.id === blogId);
    const steps = [];

    if (!blog) {
      throw new Error(`Blog post ID ${blogId} not found.`);
    }

    if (this.lockedContentIds.has(blogId)) {
      throw new Error(`Blog post ID ${blogId} publication transaction is currently locked/in progress.`);
    }

    this.lockedContentIds.add(blogId);

    try {
      steps.push('Locking content transaction for publication check...');

      steps.push('Checking weekly publication quota safety...');
      const weeklyCount = this.getWeeklyPublishedBlogCount();
      if (weeklyCount >= 3 && blog.status !== 'PUBLISHED') {
        blog.status = 'REVIEW_REQUIRED';
        blog.publishStatusReason = 'Scaled content safety block: Maximum weekly publication quota of 3 articles reached.';
        this.lockedContentIds.delete(blogId);
        return {
          success: false,
          status: 'REVIEW_REQUIRED',
          blog,
          message: 'Publication blocked by Scaled Content Safety rule. Maximum 3 articles/week reached.',
          verificationSteps: steps
        };
      }

      steps.push('Checking previous content for title, heading, and search intent overlap...');
      const dupCheck = this.checkBlogDuplicate(blog.title, blog.summary, blog.id);
      if (dupCheck.isDuplicate) {
        blog.status = 'REVIEW_REQUIRED';
        blog.publishStatusReason = `Duplicate / Cannibalization risk: ${dupCheck.duplicateReason}`;
        this.lockedContentIds.delete(blogId);
        return {
          success: false,
          status: 'REVIEW_REQUIRED',
          blog,
          message: `Publication blocked: ${dupCheck.duplicateReason}`,
          verificationSteps: steps
        };
      }

      steps.push('Checking claims against verified business facts database...');
      const factVerification = businessFactsService.verifyTextAgainstBusinessFacts(`${blog.title} ${blog.summary} ${blog.content}`);
      if (factVerification.hasUnverifiedClaims) {
        blog.status = 'REVIEW_REQUIRED';
        blog.publishStatusReason = `Unverified business claims detected: ${factVerification.unverifiedMatches.join(', ')}`;
        this.lockedContentIds.delete(blogId);
        return {
          success: false,
          status: 'REVIEW_REQUIRED',
          blog,
          message: 'Publication blocked due to unverified business claims.',
          verificationSteps: steps
        };
      }

      steps.push('Performing Technical SEO and Article Schema eligibility checks...');
      const canonicalValid = blog.canonicalUrl && blog.canonicalUrl.startsWith('https://');
      if (!canonicalValid) {
        blog.status = 'REVIEW_REQUIRED';
        blog.publishStatusReason = 'Technical SEO failure: Invalid or non-secure canonical URL.';
        this.lockedContentIds.delete(blogId);
        return {
          success: false,
          status: 'REVIEW_REQUIRED',
          blog,
          message: 'Publication blocked: Invalid canonical URL.',
          verificationSteps: steps
        };
      }

      steps.push('Executing FRESH live verification against current official Google Search Central documentation...');
      const policyRes = await policyService.verifyCurrentPoliciesForPublication(blog.id, 'BLOG', blog);

      if (!policyRes.allowed) {
        blog.status = 'REVIEW_REQUIRED';
        blog.publishStatusReason = `Google Policy Gate Failed: ${policyRes.failureReason || 'Failed live Google source verification.'}`;

        auditLogService.logPublicationAttempt({
          content_id: blog.id,
          content_type: 'BLOG',
          title_or_snippet: blog.title,
          policy_snapshot_id: policyRes.snapshot.policy_snapshot_id,
          policy_sources: policyRes.verifiedSources,
          policy_versions: ['v-2026-fresh'],
          source_last_updated_dates: policyRes.snapshot.source_last_updated_dates,
          verification_timestamp: new Date().toISOString(),
          policy_change_status: policyRes.verificationStatus,
          risk_results: policyRes.snapshot.risk_results,
          technical_results: { canonicalValid: true },
          structured_data_results: { articleSchemaEligible: blog.structuredDataEligible },
          publisher,
          final_decision: 'REVIEW_REQUIRED'
        });

        this.lockedContentIds.delete(blogId);
        return {
          success: false,
          status: 'REVIEW_REQUIRED',
          blog,
          message: `Publication blocked by Google Policy Gate: ${policyRes.failureReason}`,
          verificationSteps: steps
        };
      }

      steps.push('PASSED: All Google policy, technical SEO, and duplicate safety checks verified.');
      blog.status = 'PUBLISHED';
      blog.lastVerifiedAt = new Date().toISOString();
      blog.policySnapshotId = policyRes.snapshot.policy_snapshot_id;
      blog.publishStatusReason = 'Verified against current official Google Search documentation immediately prior to publication.';

      auditLogService.logPublicationAttempt({
        content_id: blog.id,
        content_type: 'BLOG',
        title_or_snippet: blog.title,
        policy_snapshot_id: policyRes.snapshot.policy_snapshot_id,
        policy_sources: policyRes.verifiedSources,
        policy_versions: ['v-2026-fresh'],
        source_last_updated_dates: policyRes.snapshot.source_last_updated_dates,
        verification_timestamp: new Date().toISOString(),
        policy_change_status: 'VERIFIED',
        risk_results: { passed: true, issues: [] },
        technical_results: { canonicalValid: true, httpStatus: 200 },
        structured_data_results: { articleSchemaEligible: blog.structuredDataEligible },
        publisher,
        final_decision: 'PUBLISHED'
      });

      this.lockedContentIds.delete(blogId);

      return {
        success: true,
        status: 'PUBLISHED',
        blog,
        message: 'Successfully verified against current Google Search documentation and published live.',
        verificationSteps: steps
      };
    } catch (err) {
      this.lockedContentIds.delete(blogId);
      throw err;
    }
  }

  async publishReview(reviewId, publisher = 'Admin') {
    const review = this.reviews.find(r => r.id === reviewId);
    const steps = [];

    if (!review) {
      throw new Error(`Review ID ${reviewId} not found.`);
    }

    if (this.lockedContentIds.has(reviewId)) {
      throw new Error(`Review ID ${reviewId} publication transaction is locked/in progress.`);
    }

    this.lockedContentIds.add(reviewId);

    try {
      steps.push('Locking review transaction for publication check...');

      steps.push('Checking review authenticity and customer verification...');
      if (!review.isAuthenticCustomer) {
        review.status = 'REJECTED';
        review.publishStatusReason = 'Rejected: Unverified customer or fabricated review.';
        this.lockedContentIds.delete(reviewId);
        return {
          success: false,
          status: 'REJECTED',
          review,
          message: 'Publication rejected: Unverified or fabricated review.',
          verificationSteps: steps
        };
      }

      steps.push('Checking incentive disclosure compliance...');
      if (review.isIncentivized && !review.isIncentiveDisclosed) {
        review.status = 'REVIEW_REQUIRED';
        review.publishStatusReason = 'Undisclosed incentivized review violates Google review guidelines.';
        this.lockedContentIds.delete(reviewId);
        return {
          success: false,
          status: 'REVIEW_REQUIRED',
          review,
          message: 'Publication blocked: Undisclosed incentivized review.',
          verificationSteps: steps
        };
      }

      steps.push('Evaluating Google Self-Serving Review policy & Schema eligibility...');
      if (review.isSelfServingLocalBusiness) {
        review.structuredDataEligible = false;
        steps.push('Google Self-Serving Policy Enforced: Visible on website, but Review Schema markup disabled.');
      } else {
        review.structuredDataEligible = true;
      }

      steps.push('Executing FRESH live verification against current official Google Review & Search policies...');
      const policyRes = await policyService.verifyCurrentPoliciesForPublication(review.id, 'REVIEW', review);

      if (!policyRes.allowed) {
        review.status = 'REVIEW_REQUIRED';
        review.publishStatusReason = `Google Policy Gate Failed: ${policyRes.failureReason || 'Failed live Google source verification.'}`;

        auditLogService.logPublicationAttempt({
          content_id: review.id,
          content_type: 'REVIEW',
          title_or_snippet: `${review.author} (${review.rating} stars)`,
          policy_snapshot_id: policyRes.snapshot.policy_snapshot_id,
          policy_sources: policyRes.verifiedSources,
          policy_versions: ['v-2026-fresh'],
          source_last_updated_dates: policyRes.snapshot.source_last_updated_dates,
          verification_timestamp: new Date().toISOString(),
          policy_change_status: policyRes.verificationStatus,
          risk_results: policyRes.snapshot.risk_results,
          technical_results: { authentic: review.isAuthenticCustomer },
          structured_data_results: { reviewSchemaEligible: review.structuredDataEligible },
          publisher,
          final_decision: 'REVIEW_REQUIRED'
        });

        this.lockedContentIds.delete(reviewId);
        return {
          success: false,
          status: 'REVIEW_REQUIRED',
          review,
          message: `Publication blocked by Google Policy Gate: ${policyRes.failureReason}`,
          verificationSteps: steps
        };
      }

      steps.push('PASSED: Verified against current Google review guidelines.');
      review.status = 'PUBLISHED';
      review.lastVerifiedAt = new Date().toISOString();
      review.policySnapshotId = policyRes.snapshot.policy_snapshot_id;
      review.publishStatusReason = 'Verified against current official Google Search review documentation.';

      auditLogService.logPublicationAttempt({
        content_id: review.id,
        content_type: 'REVIEW',
        title_or_snippet: `${review.author} (${review.rating} stars)`,
        policy_snapshot_id: policyRes.snapshot.policy_snapshot_id,
        policy_sources: policyRes.verifiedSources,
        policy_versions: ['v-2026-fresh'],
        source_last_updated_dates: policyRes.snapshot.source_last_updated_dates,
        verification_timestamp: new Date().toISOString(),
        policy_change_status: 'VERIFIED',
        risk_results: { passed: true, issues: [] },
        technical_results: { authentic: true },
        structured_data_results: { reviewSchemaEligible: review.structuredDataEligible },
        publisher,
        final_decision: 'PUBLISHED'
      });

      this.lockedContentIds.delete(reviewId);

      return {
        success: true,
        status: 'PUBLISHED',
        review,
        message: 'Customer review verified against current Google Search review policies and published live.',
        verificationSteps: steps
      };
    } catch (err) {
      this.lockedContentIds.delete(reviewId);
      throw err;
    }
  }
}

export const contentService = new ContentService();
