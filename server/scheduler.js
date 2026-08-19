import { contentService } from './contentService.js';
import { leadAlertService } from './leadAlertService.js';
import { policyService } from './policyService.js';

export class PublishingScheduler {
  constructor() {
    this.timer = null;
    this.leadFetchFn = null;
    this.leadUpdateFn = null;
    this.lastPolicySyncAt = null;
  }

  registerLeadAlertHandlers(fetchFn, updateFn) {
    this.leadFetchFn = fetchFn;
    this.leadUpdateFn = updateFn;
  }

  startScheduler(intervalMs = 30000) {
    console.log('[PublishingScheduler] Starting background scheduled publication monitor, Lead Alert Engine, and Google Policy Auto-Healer...');
    this.timer = setInterval(() => this.processScheduledItems(), intervalMs);
    setTimeout(() => this.processScheduledItems(), 2000);
  }

  stopScheduler() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  async processScheduledItems() {
    const now = new Date();

    // 1. Google Policy Registry Continuous Auto-Sync & Self-Healing Loop (Runs periodically in background)
    const shouldSyncPolicies = !this.lastPolicySyncAt || (now.getTime() - this.lastPolicySyncAt.getTime() > 1000 * 60 * 60 * 6); // every 6 hours or on startup
    if (shouldSyncPolicies) {
      this.lastPolicySyncAt = now;
      try {
        console.log('[PublishingScheduler] Running scheduled background Google Policy source verification & auto-discovery...');
        const syncRes = await policyService.syncOfficialGoogleSources();
        console.log(`[PublishingScheduler] Policy sync completed. Verified: ${syncRes.verifiedCount}/13. Auto-healed/Updated: ${syncRes.updatedCount}. Failed: ${syncRes.failedSources.length}`);
      } catch (err) {
        console.error('[PublishingScheduler] Background policy sync error:', err);
      }
    }

    // 2. Scheduled Blog Publishing Gate (Auto-evaluates fresh Google policies before publishing)
    const allBlogs = contentService.getBlogs(true);
    for (const blog of allBlogs) {
      if (blog.status === 'SCHEDULED' && blog.scheduledFor) {
        const scheduledTime = new Date(blog.scheduledFor);
        if (scheduledTime <= now) {
          console.log(`[PublishingScheduler] Scheduled time reached for Blog ID ${blog.id} ("${blog.title}"). Executing FRESH Google policy revalidation gate...`);
          try {
            const res = await contentService.publishBlog(blog.id, 'Scheduler Automation');
            console.log(`[PublishingScheduler] Scheduled Blog ID ${blog.id} result: ${res.status} (${res.message})`);
          } catch (err) {
            console.error(`[PublishingScheduler] Error processing scheduled Blog ID ${blog.id}:`, err);
          }
        }
      }
    }

    // 3. Automated 3-Day Overdue Lead Alerts (Sends automatic alerts)
    if (this.leadFetchFn && this.leadUpdateFn) {
      try {
        await leadAlertService.processAutomatedLeadAlerts(this.leadFetchFn, this.leadUpdateFn);
      } catch (err) {
        console.error('[PublishingScheduler] Error running automated lead alerts:', err);
      }
    }
  }
}

export const publishingScheduler = new PublishingScheduler();
