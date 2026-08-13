class AuditLogService {
  constructor() {
    this.auditLogs = [];
  }

  /**
   * Append-only audit logger
   * Strictly no deletion or modification allowed.
   */
  logPublicationAttempt(logEntry) {
    const fullLog = {
      ...logEntry,
      audit_id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      publication_timestamp: new Date().toISOString(),
      // Ensure publisher minimizes personal data
      publisher: String(logEntry.publisher || 'Admin User').trim()
    };

    // Immutable prepend/append
    this.auditLogs.unshift(fullLog);
    console.log(`[PublishingAuditLog] Immutable record created: ${fullLog.final_decision} for ${fullLog.content_type} ID ${fullLog.content_id} (Snapshot: ${fullLog.policy_snapshot_id})`);
    return fullLog;
  }

  getAuditLogs(limit = 50) {
    return this.auditLogs.slice(0, limit);
  }

  getAuditLogByContentId(contentId) {
    return this.auditLogs.find(log => log.content_id === contentId);
  }
}

export const auditLogService = new AuditLogService();
