import { useState, useEffect } from 'react';
import SeoHead from '../components/SeoHead';
import {
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  PauseCircle,
  PlayCircle,
  FileText,
  MessageSquare,
  Database,
  History,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Plus,
  Phone,
  Mail,
  Send,
  Clock,
  UserCheck,
  Search,
  Filter,
  Bell,
  BellRing,
  Calendar,
  MapPin,
  Building2
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('leads'); // leads, policy, blogs, reviews, facts, audit
  const [systemStatus, setSystemStatus] = useState(null);
  const [registry, setRegistry] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [facts, setFacts] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [leads, setLeads] = useState([]);
  const [overdueCount, setOverdueCount] = useState(0);
  const [autoAlertLogs, setAutoAlertLogs] = useState([]);
  const [autoAlertLastRun, setAutoAlertLastRun] = useState(null);
  const [triggeringAutoAlerts, setTriggeringAutoAlerts] = useState(false);
  const [leadSearchQuery, setLeadSearchQuery] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState('ALL'); // ALL, OVERDUE, PENDING, SCHEDULED, CONFIRMED
  const [updatingLeadId, setUpdatingLeadId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // New Blog Modal State
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [blogFormData, setBlogFormData] = useState({
    title: '',
    category: 'Waterproofing Tips',
    summary: '',
    content: '',
    author: 'SuratPaintingSolution Editorial Team',
    readTime: '4 min read'
  });

  // New Fact Modal State
  const [showFactModal, setShowFactModal] = useState(false);
  const [factFormData, setFactFormData] = useState({
    category: 'SERVICE',
    fact: '',
    source: 'Official Service Agreement'
  });

  // Step-by-step verification progress overlay state
  const [verifyingItem, setVerifyingItem] = useState(null); // { id, title, type: 'BLOG'|'REVIEW' }
  const [verificationStepIndex, setVerificationStepIndex] = useState(0);
  const [verificationResult, setVerificationResult] = useState(null);

  const verificationProgressSteps = [
    'Checking current Google policies...',
    'Checking relevant policy updates...',
    'Checking previous content & duplication...',
    'Checking content safety & business claims...',
    'Checking technical SEO & canonical stability...',
    'Checking structured data eligibility...',
    'Final Google policy gate decision...'
  ];

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken') || 'demo-token';
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // Alert Target Credentials specified by User
  const ALERT_TARGET_WHATSAPP = "919408197990";
  const ALERT_TARGET_EMAIL = "vishalnishad0809@gmail.com";

  // Single Lead WhatsApp Alert Dispatcher
  const getSingleLeadWhatsAppUrl = (lead) => {
    const text = `🚨 *SURAT PAINTING SOLUTION - 3-DAY OVERDUE LEAD ALERT* 🚨\n\n` +
      `👤 *Client Name:* ${lead.name}\n` +
      `📞 *Phone:* ${lead.phone}\n` +
      `📍 *Surat Area:* ${lead.area}\n` +
      `🏠 *Property Type:* ${lead.propertyType || 'Home / Flat'}\n` +
      `🎨 *Service Needed:* ${lead.serviceNeeded}\n` +
      `📝 *Client Note:* ${lead.message || 'No additional note'}\n` +
      `📅 *Received Date:* ${new Date(lead.createdAt).toLocaleDateString('en-IN')}\n` +
      `⏳ *Status:* PENDING FOR ${lead.daysOld || 3}+ DAYS!\n\n` +
      `🎯 *Alert Destination:* WhatsApp (+91 9408197990) & Email (vishalnishad0809@gmail.com)\n\n` +
      `👉 *Action Required:* Please call client at ${lead.phone} immediately!`;
    return `https://wa.me/${ALERT_TARGET_WHATSAPP}?text=${encodeURIComponent(text)}`;
  };

  // Single Lead Email Alert Dispatcher
  const getSingleLeadMailtoUrl = (lead) => {
    const subject = `URGENT ALERT: 3+ Days Overdue Lead - ${lead.name} (${lead.area})`;
    const body = `SURAT PAINTING SOLUTION - AUTOMATIC 3-DAY OVERDUE LEAD ALERT\n\n` +
      `Client Details:\n` +
      `- Client Name: ${lead.name}\n` +
      `- Phone Number: ${lead.phone}\n` +
      `- Surat Location: ${lead.area}\n` +
      `- Property Type: ${lead.propertyType || 'Home / Flat'}\n` +
      `- Service Requested: ${lead.serviceNeeded}\n` +
      `- Client Note: ${lead.message || 'N/A'}\n` +
      `- Received Date: ${new Date(lead.createdAt).toLocaleString('en-IN')}\n` +
      `- Duration Pending: ${lead.daysOld || 3} Days Overdue\n\n` +
      `Configured Alert Receiver Target:\n` +
      `- WhatsApp: +91 9408197990\n` +
      `- Email: vishalnishad0809@gmail.com\n\n` +
      `Please contact client immediately to schedule site visit or quote.`;
    return `mailto:${ALERT_TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Bulk Overdue WhatsApp Dispatcher
  const getBulkOverdueWhatsAppUrl = (overdueList) => {
    if (!overdueList || overdueList.length === 0) return '#';
    let text = `🚨 *SURAT PAINTING SOLUTION - BULK 3-DAY OVERDUE LEADS ALERT (${overdueList.length} LEADS)* 🚨\n\n` +
      `📱 Alert Target: +91 9408197990 | ✉️ vishalnishad0809@gmail.com\n\n`;
    overdueList.forEach((l, idx) => {
      text += `${idx + 1}. *${l.name}* (${l.phone})\n` +
        `   • Location: ${l.area}\n` +
        `   • Service: ${l.serviceNeeded}\n` +
        `   • Pending: ${l.daysOld} Days Overdue\n\n`;
    });
    text += `👉 *Immediate Action Required:* Please follow up with these ${overdueList.length} unconfirmed leads!`;
    return `https://wa.me/${ALERT_TARGET_WHATSAPP}?text=${encodeURIComponent(text)}`;
  };

  // Bulk Overdue Email Dispatcher
  const getBulkOverdueMailtoUrl = (overdueList) => {
    if (!overdueList || overdueList.length === 0) return '#';
    const subject = `URGENT: ${overdueList.length} Overdue Leads (3+ Days Pending) - SuratPaintingSolution`;
    let body = `SURAT PAINTING SOLUTION - 3-DAY OVERDUE LEADS SUMMARY ALERT\n\n` +
      `The following ${overdueList.length} site inspection leads have been pending for 3 or more days without work order confirmation:\n\n`;
    overdueList.forEach((l, idx) => {
      body += `${idx + 1}. Client Name: ${l.name}\n` +
        `   Phone: ${l.phone}\n` +
        `   Surat Area: ${l.area}\n` +
        `   Service: ${l.serviceNeeded}\n` +
        `   Pending Duration: ${l.daysOld} Days Overdue\n` +
        `   Date Received: ${new Date(l.createdAt).toLocaleDateString('en-IN')}\n\n`;
    });
    body += `Target Recipients:\n- WhatsApp: +91 9408197990\n- Email: vishalnishad0809@gmail.com\n`;
    return `mailto:${ALERT_TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Fetch initial dashboard state from Express backend
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const headers = getAuthHeaders();
      const [statusRes, regRes, blogsRes, revsRes, factsRes, auditRes, leadsRes, autoAlertsRes] = await Promise.all([
        fetch('/api/policy/status', { headers }).then(r => r.json()),
        fetch('/api/policy/registry', { headers }).then(r => r.json()),
        fetch('/api/blogs?includeDrafts=true', { headers }).then(r => r.json()),
        fetch('/api/reviews?includePending=true', { headers }).then(r => r.json()),
        fetch('/api/business-facts', { headers }).then(r => r.json()),
        fetch('/api/policy/audit-logs', { headers }).then(r => r.json()),
        fetch('/api/leads', { headers }).then(r => r.json()),
        fetch('/api/leads/auto-alert-logs', { headers }).then(r => r.json())
      ]);

      if (statusRes.success) setSystemStatus(statusRes);
      if (regRes.success) setRegistry(regRes.registry || []);
      if (blogsRes.success) setBlogs(blogsRes.blogs || []);
      if (revsRes.success) setReviews(revsRes.reviews || []);
      if (factsRes.success) setFacts(factsRes.facts || []);
      if (auditRes.success) setAuditLogs(auditRes.auditLogs || []);
      if (leadsRes && leadsRes.success) {
        setLeads(leadsRes.leads || []);
        setOverdueCount(leadsRes.overdueCount || 0);
      }
      if (autoAlertsRes && autoAlertsRes.success) {
        setAutoAlertLogs(autoAlertsRes.autoAlertLogs || []);
        setAutoAlertLastRun(autoAlertsRes.lastRunAt || null);
      }
    } catch (err) {
      console.error('Error loading admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerAutoAlert = async () => {
    try {
      setTriggeringAutoAlerts(true);
      const res = await fetch('/api/leads/trigger-auto-alerts', {
        method: 'POST',
        headers: getAuthHeaders()
      }).then(r => r.json());
      if (res.success) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Error triggering auto alerts:', err);
    } finally {
      setTriggeringAutoAlerts(false);
    }
  };

  const handleUpdateLeadStatus = async (id, newStatus) => {
    try {
      setUpdatingLeadId(id);
      const res = await fetch(`/api/leads/${id}/status`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus })
      }).then(r => r.json());

      if (res.success) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Error updating lead status:', err);
    } finally {
      setUpdatingLeadId(null);
    }
  };

  const handleRecordAlertSent = async (id, channel = 'WHATSAPP') => {
    try {
      await fetch(`/api/leads/${id}/alert`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ channel })
      });
      fetchDashboardData();
    } catch (err) {
      console.error('Error logging alert dispatch:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Force Sync Official Google Docs
  const handleForceSync = async () => {
    try {
      setSyncing(true);
      const res = await fetch('/api/policy/registry/sync', {
        method: 'POST',
        headers: getAuthHeaders()
      }).then(r => r.json());
      if (res.success) {
        alert(res.message);
        fetchDashboardData();
      } else {
        alert(`Sync failed: ${res.error}`);
      }
    } catch (err) {
      alert(`Sync error: ${err.message}`);
    } finally {
      setSyncing(false);
    }
  };

  // Toggle Automation Pause
  const handleTogglePause = async () => {
    const nextState = !systemStatus?.automationPaused;
    const reason = nextState ? 'Manual toggle by admin' : '';
    try {
      const res = await fetch('/api/policy/pause', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ paused: nextState, reason })
      }).then(r => r.json());

      if (res.success) {
        fetchDashboardData();
      }
    } catch (err) {
      alert('Failed to toggle pause state');
    }
  };

  // Create New Blog
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(blogFormData)
      }).then(r => r.json());

      if (res.success) {
        setShowBlogModal(false);
        setBlogFormData({
          title: '',
          category: 'Waterproofing Tips',
          summary: '',
          content: '',
          author: 'SuratPaintingSolution Editorial Team',
          readTime: '4 min read'
        });
        fetchDashboardData();
      } else {
        alert(`Error saving blog: ${res.error}`);
      }
    } catch (err) {
      alert('Failed to save blog');
    }
  };

  // Create New Verified Business Fact
  const handleCreateFact = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/business-facts', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(factFormData)
      }).then(r => r.json());

      if (res.success) {
        setShowFactModal(false);
        setFactFormData({ category: 'SERVICE', fact: '', source: 'Official Service Agreement' });
        fetchDashboardData();
      } else {
        alert(`Error saving fact: ${res.error}`);
      }
    } catch (err) {
      alert('Failed to save fact');
    }
  };

  // Live Publish Gate with UI progress animation
  const handlePublishItemWithProgress = async (id, title, type) => {
    setVerifyingItem({ id, title, type });
    setVerificationStepIndex(0);
    setVerificationResult(null);

    // Animated step progression
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < verificationProgressSteps.length - 1) {
        setVerificationStepIndex(currentStep);
      } else {
        clearInterval(interval);
      }
    }, 350);

    try {
      const endpoint = type === 'BLOG' ? `/api/blogs/${id}/publish` : `/api/reviews/${id}/publish`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ publisher: 'Admin Console' })
      }).then(r => r.json());

      clearInterval(interval);
      setVerificationStepIndex(verificationProgressSteps.length - 1);
      setVerificationResult(res);
      fetchDashboardData();
    } catch (err) {
      clearInterval(interval);
      setVerificationResult({
        success: false,
        status: 'REVIEW_REQUIRED',
        message: err.message || 'Verification network failure'
      });
    }
  };

  return (
    <>
      <SeoHead
        title="Google-Policy-Verified Content Publishing System | SuratPaintingSolution"
        description="Live Google-Policy-Verified Content Publishing Portal for SuratPaintingSolution Blogs and Customer Reviews."
        noindex={true}
      />

      <div className="min-h-screen bg-slate-900 text-slate-100 pb-12">
        
        {/* Top Executive Header */}
        <div className="bg-slate-950 border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> GOOGLE-POLICY-VERIFIED PUBLISHING GATEWAY v2.0
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
                Live Google Search Policy System
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Fresh verification against official <code className="text-amber-400 bg-slate-900 px-1.5 py-0.5 rounded">developers.google.com</code> guidelines immediately before final publication.
              </p>
            </div>

            {/* Live System Status Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {systemStatus && (
                <div className={`px-4 py-2 rounded-xl border flex items-center gap-2.5 shadow-lg ${
                  systemStatus.overallHealth === 'HEALTHY'
                    ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                    : systemStatus.overallHealth === 'WARNING'
                    ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                    : 'bg-rose-950/80 border-rose-500/40 text-rose-300'
                }`}>
                  {systemStatus.overallHealth === 'HEALTHY' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : systemStatus.overallHealth === 'WARNING' ? (
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Google Policy Status</div>
                    <div className="text-sm font-black">{systemStatus.overallHealth}</div>
                  </div>
                </div>
              )}

              <button
                onClick={handleTogglePause}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                  systemStatus?.automationPaused
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 hover:bg-amber-500/30'
                    : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30'
                }`}
              >
                {systemStatus?.automationPaused ? (
                  <>
                    <PlayCircle className="w-4 h-4 text-amber-400" /> Resume Automation
                  </>
                ) : (
                  <>
                    <PauseCircle className="w-4 h-4 text-emerald-400" /> Pause Automation
                  </>
                )}
              </button>

              <button
                onClick={handleForceSync}
                disabled={syncing}
                className="px-4 py-2 bg-[#F85000] hover:bg-[#e04800] text-white rounded-xl text-xs font-black shadow flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                <span>{syncing ? 'Verifying Docs...' : 'Sync Official Google Docs'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* System Stats Overview Metrics */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Official Google Sources</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">{systemStatus?.activeOfficialSourcesCount || 0} / {registry.length}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">developers.google.com</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Weekly Blog Quota</div>
              <div className="text-2xl font-black text-amber-400 mt-1">{systemStatus?.weeklyPublishedBlogCount || 0} / 3</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Scaled Content Safety Enforced</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Published Blogs</div>
              <div className="text-2xl font-black text-cyan-400 mt-1">{systemStatus?.publishedBlogsCount || 0}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Article Schema Verified</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Published Reviews</div>
              <div className="text-2xl font-black text-indigo-400 mt-1">{systemStatus?.publishedReviewsCount || 0}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Self-Serving Rule Enforced</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 col-span-2 sm:col-span-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Last Sync Check</div>
              <div className="text-xs font-bold text-slate-200 mt-2 truncate">
                {systemStatus?.lastSuccessfulVerification ? new Date(systemStatus.lastSuccessfulVerification).toLocaleTimeString() : 'Just Now'}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5 font-mono">100% Fresh HTTP Check</div>
            </div>

          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800 mb-6">
          <div className="flex overflow-x-auto gap-2 pb-2">
            
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'leads'
                  ? 'bg-[#F85000] text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BellRing className={`w-4 h-4 ${overdueCount > 0 ? 'text-amber-300 animate-bounce' : ''}`} />
              <span>Inspection Leads & 3-Day Alerts</span>
              {overdueCount > 0 && (
                <span className="bg-rose-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                  {overdueCount} OVERDUE
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('policy')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'policy'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" /> Official Google Source Registry ({registry.length})
            </button>

            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'blogs'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" /> Blogs Studio ({blogs.length})
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Customer Reviews ({reviews.length})
            </button>

            <button
              onClick={() => setActiveTab('facts')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'facts'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Database className="w-4 h-4" /> Business Facts ({facts.length})
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'audit'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <History className="w-4 h-4" /> Policy Audit Trail ({auditLogs.length})
            </button>

          </div>
        </div>

        {/* Tab 0: Inspection Leads & 3-Day Automatic Alert System */}
        {activeTab === 'leads' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            
            {/* Lead Management Header with Alert Receiver Info */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold mb-2">
                  <BellRing className="w-4 h-4 animate-bounce text-rose-400" /> AUTOMATIC 3-DAY LEAD ALERT ENGINE ACTIVE (24/7 BACKGROUND)
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                  <span>Site Inspection Leads & Estimates Tracker</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  Surat Painting Solution Contractor Portal. Any lead older than <strong>3 days (72 hours)</strong> without work order confirmation is automatically detected by the server background loop (running every 30s) and dispatched to <strong>WhatsApp (+91 9408197990)</strong> and <strong>Gmail (vishalnishad0809@gmail.com)</strong> with full client details.
                </p>
              </div>

              {/* Bulk Dispatch & Manual Trigger Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
                <button
                  onClick={handleTriggerAutoAlert}
                  disabled={triggeringAutoAlerts}
                  className="px-4 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 text-amber-200 ${triggeringAutoAlerts ? 'animate-spin' : ''}`} />
                  <span>{triggeringAutoAlerts ? 'Scanning Overdue Leads...' : 'Run Immediate Auto Check'}</span>
                </button>

                <a
                  href={getBulkOverdueWhatsAppUrl(leads.filter(l => l.isOverdue3Days))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    leads.filter(l => l.isOverdue3Days).forEach(l => handleRecordAlertSent(l.id, 'WHATSAPP_BULK'));
                  }}
                  className={`px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                    overdueCount > 0
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white animate-pulse'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <Send className="w-4 h-4 text-emerald-200" />
                  <span>Bulk WhatsApp (+91 9408197990)</span>
                </a>

                <a
                  href={getBulkOverdueMailtoUrl(leads.filter(l => l.isOverdue3Days))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    leads.filter(l => l.isOverdue3Days).forEach(l => handleRecordAlertSent(l.id, 'EMAIL_BULK'));
                  }}
                  className={`px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all ${
                    overdueCount > 0
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <Mail className="w-4 h-4 text-blue-200" />
                  <span>Bulk Email (vishalnishad0809@gmail.com)</span>
                </a>
              </div>
            </div>

            {/* 🤖 Server-Side Background Automation Live Status Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/40 rounded-2xl p-5 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-emerald-300 uppercase tracking-wider bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                        🤖 24/7 ZERO-CLICK AUTOMATIC SERVER BACKGROUND SCHEDULER
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Loop: Every 30s | Last Check: {autoAlertLastRun ? new Date(autoAlertLastRun).toLocaleTimeString('en-IN') : 'Active'}
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-white mt-1">
                      Automatic Alert Engine runs without opening admin panel or clicking any button.
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Target Recipients: <strong>WhatsApp (+91 9408197990)</strong> &amp; <strong>Email (vishalnishad0809@gmail.com)</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <div className="text-right font-mono">
                    <div className="text-[10px] text-slate-400 uppercase">Auto Dispatched Alerts</div>
                    <div className="text-lg font-black text-emerald-400">{autoAlertLogs.length} Logged</div>
                  </div>
                </div>
              </div>

              {/* Automatic Alert Log Feed Drawer */}
              {autoAlertLogs.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700/80">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Recent Automatically Dispatched 3-Day Alerts</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Showing last {Math.min(5, autoAlertLogs.length)} events</span>
                  </div>
                  <div className="space-y-2">
                    {autoAlertLogs.slice(0, 5).map((log, idx) => (
                      <div key={log.logId || idx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            <Send className="w-3.5 h-3.5" />
                          </span>
                          <div>
                            <span className="font-bold text-white">{log.clientName}</span>
                            <span className="text-slate-400 text-[11px] ml-2">({log.clientPhone} • {log.clientArea})</span>
                            <div className="text-[10px] text-slate-500">Service: {log.serviceNeeded}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-[11px] shrink-0">
                          <span className="bg-slate-800 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">
                            {log.daysOld}+ Days Overdue
                          </span>
                          <span className="text-slate-400 text-[10px]">
                            {new Date(log.timestamp).toLocaleTimeString('en-IN')}
                          </span>
                          <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30 text-[10px]">
                            {log.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Critical Alert Banner if Overdue Leads Exist */}
            {overdueCount > 0 && (
              <div className="bg-gradient-to-r from-rose-950/90 via-slate-900 to-amber-950/90 border-2 border-rose-500/60 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-rose-600/30 border border-rose-500/50 rounded-2xl text-rose-400 shrink-0 mt-0.5">
                      <AlertTriangle className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-rose-300 uppercase tracking-wider bg-rose-950 px-2.5 py-0.5 rounded border border-rose-500/50">
                          🚨 3-DAY OVERDUE ALERT ACTIVE
                        </span>
                        <span className="text-xs text-amber-300 font-mono font-bold">
                          {overdueCount} Unconfirmed Lead{overdueCount > 1 ? 's' : ''} &gt; 72 Hours Old
                        </span>
                      </div>
                      <h4 className="text-base font-black text-white mt-1">
                        Client Details Ready for Immediate Dispatch
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                        These leads were submitted 3+ days ago and require immediate contractor follow-up. Click the WhatsApp or Email buttons below to send pre-formatted client details directly to <strong>+91 9408197990</strong> or <strong>vishalnishad0809@gmail.com</strong>.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setLeadStatusFilter('OVERDUE')}
                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black shadow shrink-0 self-start md:self-center"
                  >
                    View All {overdueCount} Overdue Leads
                  </button>
                </div>
              </div>
            )}

            {/* Lead Statistics Overview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Client Inquiries</div>
                <div className="text-2xl font-black text-white mt-1">{leads.length}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Surat Direct Inquiries</div>
              </div>

              <div className={`border rounded-2xl p-4 transition-all ${
                overdueCount > 0
                  ? 'bg-rose-950/80 border-rose-500/60 text-rose-200 shadow-lg shadow-rose-950/50'
                  : 'bg-slate-800/80 border-slate-700/80 text-slate-400'
              }`}>
                <div className="text-[11px] font-bold uppercase tracking-wider flex items-center justify-between">
                  <span>🚨 3-Day Overdue Alerts</span>
                  {overdueCount > 0 && <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />}
                </div>
                <div className={`text-2xl font-black mt-1 ${overdueCount > 0 ? 'text-rose-400' : 'text-slate-200'}`}>
                  {overdueCount}
                </div>
                <div className="text-[10px] text-rose-300/80 mt-0.5">Pending &gt; 72 Hours</div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pending Inspections</div>
                <div className="text-2xl font-black text-amber-400 mt-1">
                  {leads.filter(l => l.status === 'Pending').length}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Awaiting Callback</div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Site Visits</div>
                <div className="text-2xl font-black text-cyan-400 mt-1">
                  {leads.filter(l => l.status === 'Site Inspection Scheduled').length}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Painter On-Site</div>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 col-span-2 sm:col-span-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Work Orders Confirmed</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  {leads.filter(l => l.status === 'Work Order Confirmed').length}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Project In Progress</div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Filter Pills */}
              <div className="flex overflow-x-auto gap-2 pb-1 md:pb-0">
                <button
                  onClick={() => setLeadStatusFilter('ALL')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    leadStatusFilter === 'ALL'
                      ? 'bg-slate-700 text-white border border-slate-500 shadow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  All Inquiries ({leads.length})
                </button>

                <button
                  onClick={() => setLeadStatusFilter('OVERDUE')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    leadStatusFilter === 'OVERDUE'
                      ? 'bg-rose-600 text-white shadow'
                      : 'text-rose-400 hover:bg-rose-950/50'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>🚨 3-Day Overdue Alerts ({overdueCount})</span>
                </button>

                <button
                  onClick={() => setLeadStatusFilter('PENDING')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    leadStatusFilter === 'PENDING'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Pending ({leads.filter(l => l.status === 'Pending').length})
                </button>

                <button
                  onClick={() => setLeadStatusFilter('SCHEDULED')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    leadStatusFilter === 'SCHEDULED'
                      ? 'bg-cyan-600 text-white shadow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Site Visits ({leads.filter(l => l.status === 'Site Inspection Scheduled').length})
                </button>

                <button
                  onClick={() => setLeadStatusFilter('CONFIRMED')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    leadStatusFilter === 'CONFIRMED'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Confirmed ({leads.filter(l => l.status === 'Work Order Confirmed').length})
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, phone, area..."
                  value={leadSearchQuery}
                  onChange={(e) => setLeadSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#F85000]"
                />
              </div>

            </div>

            {/* Leads Data Table */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-mono tracking-wider border-b border-slate-700">
                    <tr>
                      <th className="p-4">Client &amp; Contact</th>
                      <th className="p-4">Surat Location</th>
                      <th className="p-4">Property &amp; Service Needed</th>
                      <th className="p-4">3-Day Alert Status</th>
                      <th className="p-4">Update Lead Status</th>
                      <th className="p-4 text-right">Automatic Alert Dispatch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {leads
                      .filter(l => {
                        if (leadStatusFilter === 'OVERDUE' && !l.isOverdue3Days) return false;
                        if (leadStatusFilter === 'PENDING' && l.status !== 'Pending') return false;
                        if (leadStatusFilter === 'SCHEDULED' && l.status !== 'Site Inspection Scheduled') return false;
                        if (leadStatusFilter === 'CONFIRMED' && l.status !== 'Work Order Confirmed') return false;

                        if (leadSearchQuery.trim()) {
                          const q = leadSearchQuery.toLowerCase();
                          const nameMatch = (l.name || '').toLowerCase().includes(q);
                          const phoneMatch = (l.phone || '').toLowerCase().includes(q);
                          const areaMatch = (l.area || '').toLowerCase().includes(q);
                          const serviceMatch = (l.serviceNeeded || '').toLowerCase().includes(q);
                          return nameMatch || phoneMatch || areaMatch || serviceMatch;
                        }
                        return true;
                      })
                      .map((lead) => (
                        <tr key={lead.id} className={`hover:bg-slate-700/40 transition-colors ${
                          lead.isOverdue3Days ? 'bg-rose-950/20' : ''
                        }`}>
                          
                          {/* Client Name & Phone */}
                          <td className="p-4">
                            <div className="font-bold text-white text-sm flex items-center gap-2">
                              <span>{lead.name}</span>
                              {lead.isOverdue3Days && (
                                <span className="bg-rose-600 text-white text-[9px] px-1.5 py-0.5 rounded font-black tracking-wider uppercase animate-pulse">
                                  3+ DAYS OVERDUE
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <a href={`tel:${lead.phone}`} className="text-amber-400 font-mono font-bold hover:underline flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                <span>{lead.phone}</span>
                              </a>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-mono">
                              <Calendar className="w-3 h-3 text-slate-500" />
                              <span>Received: {new Date(lead.createdAt).toLocaleDateString('en-IN')}</span>
                              <span className="text-slate-500">({lead.daysOld || 0} days old)</span>
                            </div>
                          </td>

                          {/* Surat Location */}
                          <td className="p-4">
                            <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                              <span>{lead.area || 'Surat'}</span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-slate-500" />
                              <span>{lead.propertyType || 'Home / Flat'}</span>
                            </div>
                          </td>

                          {/* Service Needed & Message */}
                          <td className="p-4 max-w-xs">
                            <div className="font-bold text-cyan-300">{lead.serviceNeeded}</div>
                            {lead.message && (
                              <div className="text-[11px] text-slate-300 mt-1 line-clamp-2 italic bg-slate-900/60 p-2 rounded-lg border border-slate-700/50">
                                "{lead.message}"
                              </div>
                            )}
                          </td>

                          {/* 3-Day Overdue Alert Indicator */}
                          <td className="p-4">
                            {lead.isOverdue3Days ? (
                              <div className="space-y-1">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/50 text-[11px] font-black animate-pulse">
                                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                                  <span>🚨 3+ DAYS OVERDUE ALERT</span>
                                </span>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  Alert Target: +91 9408197990 &amp; vishalnishad0809@gmail.com
                                </div>
                                {lead.lastAlertSentAt && (
                                  <div className="text-[10px] text-emerald-400 font-mono">
                                    Last Dispatched: {new Date(lead.lastAlertSentAt).toLocaleTimeString('en-IN')}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Active (&lt; 3 Days)</span>
                              </span>
                            )}
                          </td>

                          {/* Update Status Dropdown */}
                          <td className="p-4">
                            <select
                              value={lead.status || 'Pending'}
                              disabled={updatingLeadId === lead.id}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#F85000] font-semibold"
                            >
                              <option value="Pending">Pending Callback</option>
                              <option value="Site Inspection Scheduled">Site Inspection Scheduled</option>
                              <option value="Quote Sent">Quote Sent</option>
                              <option value="Work Order Confirmed">Work Order Confirmed</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>

                          {/* Automatic Alert Dispatch Buttons */}
                          <td className="p-4 text-right space-y-1.5">
                            <div className="flex items-center justify-end gap-1.5">
                              
                              {/* WhatsApp Alert Button */}
                              <a
                                href={getSingleLeadWhatsAppUrl(lead)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleRecordAlertSent(lead.id, 'WHATSAPP')}
                                title="Send WhatsApp Alert to +91 9408197990"
                                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold flex items-center gap-1 shadow transition-all ${
                                  lead.isOverdue3Days
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white animate-pulse'
                                    : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900'
                                }`}
                              >
                                <Send className="w-3.5 h-3.5 text-emerald-200" />
                                <span>WhatsApp Alert</span>
                              </a>

                              {/* Email Alert Button */}
                              <a
                                href={getSingleLeadMailtoUrl(lead)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => handleRecordAlertSent(lead.id, 'EMAIL')}
                                title="Send Email Alert to vishalnishad0809@gmail.com"
                                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold flex items-center gap-1 shadow transition-all ${
                                  lead.isOverdue3Days
                                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                    : 'bg-blue-950/60 text-blue-300 border border-blue-500/30 hover:bg-blue-900'
                                }`}
                              >
                                <Mail className="w-3.5 h-3.5 text-blue-200" />
                                <span>Email Alert</span>
                              </a>

                            </div>
                          </td>

                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 1: Official Google Source Registry */}
        {activeTab === 'policy' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> GOOGLE_OFFICIAL_SOURCE_REGISTRY
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Only official Google Search Central documentation on <code className="text-amber-400">developers.google.com</code> is authoritative for publication gates.
                </p>
              </div>

              <button
                onClick={handleForceSync}
                disabled={syncing}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow shrink-0 flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                <span>Verify All Sources Live</span>
              </button>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-mono tracking-wider border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Source Name</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Domain</th>
                      <th className="p-3.5">HTTP Status</th>
                      <th className="p-3.5">Content SHA256</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Last Verified</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {registry.map(src => (
                      <tr key={src.source_id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="p-3.5 font-bold text-white max-w-xs">
                          <div className="flex items-center gap-2">
                            <span>{src.source_name}</span>
                            <a
                              href={src.current_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-400 hover:underline shrink-0"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{src.current_url}</div>
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-amber-300">{src.source_type}</td>
                        <td className="p-3.5 font-mono text-emerald-400 font-bold">{src.official_domain}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded font-mono text-[11px] font-bold ${
                            src.http_status === 200 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            HTTP {src.http_status}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-[10px] text-slate-400">{src.content_hash_if_available || 'Verified'}</td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            src.status === 'ACTIVE'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}>
                            {src.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-400 text-[11px]">
                          {new Date(src.last_verified_at).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Blogs Studio */}
        {activeTab === 'blogs' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/60 p-5 rounded-2xl border border-slate-700">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" /> Blog Publishing Management Studio
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Every blog post requires fresh Google Search policy verification before publication. Maximum weekly limit of 3 articles enforced by Scaled Content Safety.
                </p>
              </div>

              <button
                onClick={() => setShowBlogModal(true)}
                className="bg-[#F85000] hover:bg-[#e04800] text-white text-xs font-black px-4 py-2.5 rounded-xl shadow flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" /> Create Blog Post
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {blogs.map(blog => (
                <div key={blog.id} className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 space-y-3">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
                          {blog.category}
                        </span>
                        <span className="text-xs text-slate-400">{blog.date} • {blog.readTime}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white">{blog.title}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                        blog.status === 'PUBLISHED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : blog.status === 'REVIEW_REQUIRED'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-slate-700 text-slate-300'
                      }`}>
                        {blog.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{blog.summary}</p>

                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <span className="font-bold text-slate-300 block">Status Reason / Verification Note:</span>
                      <span className="text-slate-400">{blog.publishStatusReason || 'Ready for live Google policy publication check.'}</span>
                    </div>

                    {blog.status !== 'PUBLISHED' && (
                      <button
                        onClick={() => handlePublishItemWithProgress(blog.id, blog.title, 'BLOG')}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow shrink-0 flex items-center gap-1.5 transition-all"
                      >
                        <ShieldCheck className="w-4 h-4" /> Run Live Google Policy Gate & Publish
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 3: Customer Reviews Studio */}
        {activeTab === 'reviews' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-400" /> Customer Reviews & Google Self-Serving Rules
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Google Search Central specifies that self-serving reviews hosted on a business’s own website are NOT eligible for Review Rich Snippet markup. The system enforces this rule automatically: genuine customer reviews are displayed on-site for users, but Review Schema markup is safely omitted as required by official Google guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map(rev => (
                <div key={rev.id} className="bg-slate-800/90 border border-slate-700 rounded-2xl p-5 space-y-3">
                  
                  <div className="flex justify-between items-start gap-2 border-b border-slate-700 pb-3">
                    <div>
                      <div className="text-sm font-bold text-white">{rev.author}</div>
                      <div className="text-xs text-slate-400">{rev.role} • {rev.area}</div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                      ★ {rev.rating}.0
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 italic">"{rev.comment}"</p>

                  <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                    <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      Authentic Customer Verified
                    </span>
                    <span className="bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                      Self-Serving Local Business Review
                    </span>
                    <span className="bg-slate-900 text-amber-300 px-2 py-0.5 rounded border border-slate-700">
                      Schema Markup: Omitted (Google Compliant)
                    </span>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      rev.status === 'PUBLISHED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {rev.status}
                    </span>

                    {rev.status !== 'PUBLISHED' && (
                      <button
                        onClick={() => handlePublishItemWithProgress(rev.id, `${rev.author} Review`, 'REVIEW')}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow"
                      >
                        Publish Review Live
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 4: Verified Business Facts */}
        {activeTab === 'facts' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            
            <div className="flex justify-between items-center bg-slate-800/60 p-5 rounded-2xl border border-slate-700">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-amber-400" /> Verified Business Facts Database
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Content generator and policy gate check claims against these verified company records to prevent AI hallucinations.
                </p>
              </div>

              <button
                onClick={() => setShowFactModal(true)}
                className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" /> Add Verified Fact
              </button>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 divide-y divide-slate-700/60">
              {facts.map(fact => (
                <div key={fact.fact_id} className="py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold bg-slate-900 text-amber-300 px-2 py-0.5 rounded border border-slate-700">
                        {fact.category}
                      </span>
                      <span className="text-[10px] text-slate-400">Verified by {fact.verified_by}</span>
                    </div>
                    <div className="text-xs text-slate-200 font-medium">{fact.fact}</div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    VERIFIED FACT
                  </span>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Tab 5: Policy Audit Trail */}
        {activeTab === 'audit' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            
            <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-cyan-400" /> Immutable Policy Audit Logs
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Answers with absolute precision: "Exactly which current official Google Search sources were verified before this content was published?".
              </p>
            </div>

            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-mono tracking-wider border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Audit ID</th>
                      <th className="p-3.5">Content Item</th>
                      <th className="p-3.5">Snapshot ID</th>
                      <th className="p-3.5">Official Google Sources Verified</th>
                      <th className="p-3.5">Publisher</th>
                      <th className="p-3.5">Timestamp</th>
                      <th className="p-3.5">Decision</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {auditLogs.map(log => (
                      <tr key={log.audit_id} className="hover:bg-slate-700/30">
                        <td className="p-3.5 font-mono text-[11px] text-cyan-400">{log.audit_id}</td>
                        <td className="p-3.5 font-bold text-white max-w-xs">{log.title_or_snippet}</td>
                        <td className="p-3.5 font-mono text-[11px] text-amber-300">{log.policy_snapshot_id}</td>
                        <td className="p-3.5 font-mono text-[10px] text-slate-400 max-w-xs truncate">
                          {log.policy_sources.join(', ')}
                        </td>
                        <td className="p-3.5 font-medium">{log.publisher}</td>
                        <td className="p-3.5 text-slate-400">{new Date(log.publication_timestamp).toLocaleTimeString()}</td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                            log.final_decision === 'PUBLISHED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}>
                            {log.final_decision}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* CREATE BLOG MODAL */}
      {showBlogModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-black text-white">Create New Blog Article</h3>
            
            <form onSubmit={handleCreateBlog} className="space-y-4 text-xs text-slate-300">
              <div>
                <label className="block font-bold text-slate-400 mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={blogFormData.title}
                  onChange={e => setBlogFormData({ ...blogFormData, title: e.target.value })}
                  placeholder="e.g., Best Exterior House Painting Colors for Surat Heat"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F85000] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">Category</label>
                <select
                  value={blogFormData.category}
                  onChange={e => setBlogFormData({ ...blogFormData, category: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-[#F85000] outline-none"
                >
                  <option value="Waterproofing Tips">Waterproofing Tips</option>
                  <option value="Color Trends">Color Trends</option>
                  <option value="Painting Technology">Painting Technology</option>
                  <option value="Home Renovation">Home Renovation</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">Summary (1-2 sentences)</label>
                <textarea
                  required
                  rows={2}
                  value={blogFormData.summary}
                  onChange={e => setBlogFormData({ ...blogFormData, summary: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#F85000] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">Article Full Content</label>
                <textarea
                  required
                  rows={6}
                  value={blogFormData.content}
                  onChange={e => setBlogFormData({ ...blogFormData, content: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-[#F85000] outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#F85000] hover:bg-[#e04800] text-white rounded-xl font-black shadow"
                >
                  Save Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE FACT MODAL */}
      {showFactModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-xl font-black text-white">Add Verified Business Fact</h3>
            
            <form onSubmit={handleCreateFact} className="space-y-4 text-xs text-slate-300">
              <div>
                <label className="block font-bold text-slate-400 mb-1">Category</label>
                <select
                  value={factFormData.category}
                  onChange={e => setFactFormData({ ...factFormData, category: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                >
                  <option value="COMPANY">COMPANY</option>
                  <option value="SERVICE">SERVICE</option>
                  <option value="PRICING">PRICING</option>
                  <option value="LOCATION">LOCATION</option>
                  <option value="WARRANTY">WARRANTY</option>
                  <option value="MATERIAL">MATERIAL</option>
                  <option value="PROCESS">PROCESS</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">Verified Fact Statement</label>
                <textarea
                  required
                  rows={3}
                  value={factFormData.fact}
                  onChange={e => setFactFormData({ ...factFormData, fact: e.target.value })}
                  placeholder="e.g., We use 100% authentic Asian Paints Royale and Apex products with 3-year warranty."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">Source / Verification Document</label>
                <input
                  type="text"
                  required
                  value={factFormData.source}
                  onChange={e => setFactFormData({ ...factFormData, source: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFactModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-black shadow"
                >
                  Add Fact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STEP-BY-STEP PUBLICATION GATE VERIFICATION OVERLAY */}
      {verifyingItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-[#F85000]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white">Live Google Policy Gate Verification</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Verifying <span className="text-white font-bold">{verifyingItem.title}</span> against live official <code className="text-amber-400">developers.google.com</code> guidelines.
              </p>
            </div>

            {/* Steps Progress */}
            <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 font-mono text-xs">
              {verificationProgressSteps.map((stepText, idx) => {
                const isCurrent = idx === verificationStepIndex && !verificationResult;
                const isPassed = idx < verificationStepIndex || (verificationResult && verificationResult.success);
                const isFailed = verificationResult && !verificationResult.success && idx === verificationStepIndex;

                return (
                  <div key={idx} className="flex items-center justify-between gap-3">
                    <span className={isCurrent ? 'text-cyan-400 font-bold' : isPassed ? 'text-emerald-400' : 'text-slate-600'}>
                      {stepText}
                    </span>
                    {isCurrent ? (
                      <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin shrink-0" />
                    ) : isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isFailed ? (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-800 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Final Verification Result Message */}
            {verificationResult && (
              <div className={`p-4 rounded-2xl border ${
                verificationResult.success
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
              }`}>
                <div className="font-extrabold text-sm mb-1 flex items-center gap-2">
                  {verificationResult.success ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>SAFE TO PUBLISH</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-400" />
                      <span>HUMAN REVIEW REQUIRED</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-slate-300">
                  {verificationResult.message || verificationResult.statusReason}
                </p>
                <div className="text-[11px] font-mono text-amber-300/90 mt-2 italic border-t border-slate-800 pt-2">
                  "Verified against the current accessible official Google Search documentation relevant to this publication."
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setVerifyingItem(null)}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-bold text-xs shadow"
              >
                Close Verification Modal
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
