import { contentService } from './contentService.js';
import { leadAlertService } from './leadAlertService.js';

export class PublishingScheduler {
  constructor() {
    this.timer = null;
    this.leadFetchFn = null;
    this.leadUpdateFn = null;
  }

  registerLeadAlertHandlers(fetchFn, updateFn) {
    this.leadFetchFn = fetchFn;
    this.leadUpdateFn = updateFn;
  }

  startScheduler(intervalMs = 30000) {
    console.log('[PublishingScheduler] Starting background scheduled publication monitor and Lead Alert Engine...');
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
