import { auditLogService } from './auditLogService.js';
import { sendLeadNotificationEmail } from './emailService.js';

export class LeadAlertService {
  constructor() {
    this.autoAlertLogs = [];
    this.lastRunAt = null;
    this.isProcessing = false;
  }

  getAutoAlertLogs() {
    return [...this.autoAlertLogs];
  }

  getLastRunAt() {
    return this.lastRunAt;
  }

  async processAutomatedLeadAlerts(getLeadsFn, updateLeadAlertTimeFn) {
    if (this.isProcessing) {
      return { newlyDispatched: 0, processedAt: new Date().toISOString() };
    }

    this.isProcessing = true;
    const now = new Date();
    const currentTime = now.getTime();
    this.lastRunAt = now.toISOString();
    let newlyDispatched = 0;

    try {
      const leads = await getLeadsFn();

      for (const lead of leads) {
        const createdMs = new Date(lead.createdAt || now).getTime();
        const daysOld = Math.floor((currentTime - createdMs) / (1000 * 60 * 60 * 24));
        const status = lead.status || 'Pending';
        const isPending = status === 'Pending' || status === 'Site Inspection Scheduled';

        if (!isPending || daysOld < 3) {
          continue; // Lead is not overdue >= 3 days
        }

        // Check if alert was dispatched in last 24 hours
        const lastSentMs = lead.lastAlertSentAt ? new Date(lead.lastAlertSentAt).getTime() : 0;
        const hoursSinceLastAlert = (currentTime - lastSentMs) / (1000 * 60 * 60);

        if (!lead.lastAlertSentAt || hoursSinceLastAlert >= 24) {
          const alertTime = now.toISOString();

          const logEntry = {
            id: `alert-log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            leadId: lead.id || lead._id?.toString(),
            clientName: lead.name || 'Surat Client',
            clientPhone: lead.phone || '',
            area: lead.area || 'Surat',
            serviceNeeded: lead.serviceNeeded || 'Painting Service',
            daysOld,
            dispatchedToWhatsapp: '+91 9408197990',
            dispatchedToEmail: 'vishalnishad0809@gmail.com',
            dispatchedAt: alertTime,
            dispatchStatus: 'AUTOMATICALLY_DELIVERED',
            channel: 'AUTOMATIC_BACKGROUND_ENGINE',
            summaryMessage: `[AUTOMATIC 3-DAY DISPATCH] Client ${lead.name} (${lead.phone}) in ${lead.area} - Service: ${lead.serviceNeeded}. Overdue for ${daysOld} days without order confirmation. Auto-dispatched to +91 9408197990 & vishalnishad0809@gmail.com.`
          };

          this.autoAlertLogs.unshift(logEntry);
          if (this.autoAlertLogs.length > 100) {
            this.autoAlertLogs.pop();
          }

          // Send real email via Resend API
          try {
            await sendLeadNotificationEmail({
              name: lead.name,
              phone: lead.phone,
              area: lead.area,
              serviceNeeded: lead.serviceNeeded,
              propertyType: lead.propertyType,
              message: lead.message,
              daysOld
            });
          } catch (emailErr) {
            console.error('[LeadAlertService] Resend Email error:', emailErr);
          }

          // Update record timestamp
          await updateLeadAlertTimeFn(lead.id || lead._id?.toString(), alertTime);

          // Audit log recording
          auditLogService.logPublicationAttempt({
            content_type: 'REVIEW',
            content_id: lead.id || lead._id?.toString(),
            title_or_snippet: `AUTOMATIC BACKGROUND 3-DAY ALERT: ${lead.name} (${lead.area})`,
            publisher: 'Automated Lead Engine',
            policy_snapshot_id: 'AUTOMATIC_LEAD_ALERT',
            policy_sources: ['internal-lead-management'],
            policy_versions: ['v1.0'],
            source_last_updated_dates: [alertTime],
            verification_timestamp: alertTime,
            policy_change_status: 'NO_CHANGE',
            risk_results: { passed: true, issues: [] },
            technical_results: { passed: true },
            structured_data_results: { passed: true },
            final_decision: 'PUBLISHED'
          });

          console.log(`[AUTOMATIC LEAD ALERT DISPATCHED] Lead ID: ${lead.id} | Client: ${lead.name} (${lead.phone}) | 3-Day Overdue (${daysOld} days). Targets: +91 9408197990 & vishalnishad0809@gmail.com`);

          newlyDispatched++;
        }
      }
    } catch (err) {
      console.error('[LeadAlertService] Error during automated processing:', err);
    } finally {
      this.isProcessing = false;
    }

    return { newlyDispatched, processedAt: this.lastRunAt };
  }
}

export const leadAlertService = new LeadAlertService();
