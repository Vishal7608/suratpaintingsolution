import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";

import { authService } from "./server/authService.js";
import { createRateLimiter, sanitizeText } from "./server/securityMiddleware.js";
import { policyService } from "./server/policyService.js";
import { businessFactsService } from "./server/businessFactsService.js";
import { auditLogService } from "./server/auditLogService.js";
import { contentService } from "./server/contentService.js";
import { publishingScheduler } from "./server/scheduler.js";
import { leadAlertService } from "./server/leadAlertService.js";
import { sendLeadNotificationEmail } from "./server/emailService.js";
import { resolvePageMeta } from "./server/seo/metaResolver.js";
import { connectToDatabase, LeadModel } from "./server/db/mongodb.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Static Asset Serving (Dist & Public folders)
const distDir = path.join(process.cwd(), "dist");
const publicDir = path.join(process.cwd(), "public");
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
}
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}

// Helper functions for background scheduler
async function getLeadsForScheduler() {
  if (mongoose.connection.readyState === 1 && LeadModel) {
    return await LeadModel.find().sort({ createdAt: -1 }).lean();
  }
  return memoryLeads;
}

async function updateLeadAlertTimeForScheduler(id, alertTime) {
  if (mongoose.connection.readyState === 1 && LeadModel) {
    await LeadModel.findByIdAndUpdate(id, { lastAlertSentAt: alertTime });
  } else {
    const idx = memoryLeads.findIndex(l => l.id === id);
    if (idx !== -1) {
      memoryLeads[idx].lastAlertSentAt = alertTime;
    }
  }
}

// Register background handlers for scheduler
publishingScheduler.registerLeadAlertHandlers(getLeadsForScheduler, updateLeadAlertTimeForScheduler);

// Initialize MongoDB connection using cached connection helper
const initDB = async () => {
  if (process.env.MONGODB_URI) {
    try {
      await connectToDatabase();
    } catch (err) {
      console.warn("MongoDB connection warning (falling back to memory store):", err);
    }
  } else {
    if (process.env.VERCEL === '1' || process.env.NODE_ENV === 'production') {
      console.error("🚨 [CRITICAL PRODUCTION MISCONFIGURATION]: MONGODB_URI environment variable is missing in production environment! Leads will be held in temporary memory only and risk being lost on serverless cold starts. Please set MONGODB_URI in your dashboard.");
    } else {
      console.log("MONGODB_URI not provided. Using high-availability in-memory lead store.");
    }
  }
};

initDB();

// Calculate helper dates for seed data
const now = Date.now();
const DAY_MS = 24 * 60 * 60 * 1000;

// High-availability in-memory fallback lead store with seed data
const memoryLeads = [
  {
    id: "lead-101",
    name: "Manishbhai Kanani",
    phone: "+91 98980 11223",
    area: "Vesu",
    serviceNeeded: "Interior House Painting & Royale Silk",
    propertyType: "Home / Flat",
    message: "Need 3BHK flat repainting and Italian Stucco feature wall before Diwali.",
    status: "Pending",
    lastAlertSentAt: null,
    createdAt: new Date(now - 4 * DAY_MS).toISOString() // 4 days ago -> OVERDUE 3+ DAYS
  },
  {
    id: "lead-102",
    name: "Shri Ram Textile Mills",
    phone: "+91 97129 44556",
    area: "Udhna GIDC",
    serviceNeeded: "Industrial Factory / Warehouse Epoxy & Roof Coating",
    propertyType: "Industrial Factory",
    message: "25,000 sq.ft metal roof shed heat-reflective painting & glossy epoxy floor.",
    status: "Pending",
    lastAlertSentAt: null,
    createdAt: new Date(now - 3 * DAY_MS).toISOString() // 3 days ago -> OVERDUE 3+ DAYS
  },
  {
    id: "lead-103",
    name: "Dr. Chirag Jariwala",
    phone: "+91 94281 88776",
    area: "Pal",
    serviceNeeded: "Terrace Waterproofing & Monsoon Sealing",
    propertyType: "Bungalow / Villa",
    message: "Terrace dampness issue during heavy monsoon rains. Dr. Fixit treatment needed.",
    status: "Site Inspection Scheduled",
    lastAlertSentAt: null,
    createdAt: new Date(now - 1 * DAY_MS).toISOString() // 1 day ago
  },
  {
    id: "lead-104",
    name: "Vallabhbhai Gajera",
    phone: "+91 98252 33445",
    area: "Varachha",
    serviceNeeded: "Commercial Society Building Painting",
    propertyType: "Society Building",
    message: "4-building residential society repainting with weather-proof exterior paint.",
    status: "Quote Sent",
    lastAlertSentAt: null,
    createdAt: new Date(now - 2 * DAY_MS).toISOString() // 2 days ago
  }
];

// Public Rate Limiters
const publicSubmissionLimiter = createRateLimiter(15, 15 * 60 * 1000); // 15 requests per 15 min
const adminLoginLimiter = createRateLimiter(10, 15 * 60 * 1000);       // 10 login attempts per 15 min

// API Routes

// Health & System Overview
app.get("/api/health", (req, res) => {
  const isProd = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
  const mongoConfigured = !!process.env.MONGODB_URI;
  const mongoConnected = mongoose.connection.readyState === 1;

  if (isProd && !mongoConfigured) {
    console.error("🚨 [HEALTH CHECK FAILED]: MONGODB_URI is missing in production!");
    return res.status(500).json({
      status: "error",
      error: "CRITICAL_MISCONFIGURATION",
      message: "MONGODB_URI environment variable is missing in production environment. Persistent database is required.",
      company: "SuratPaintingSolution",
      database: {
        configured: false,
        connected: false,
        status: "MISSING_PRODUCTION_MONGODB_URI"
      }
    });
  }

  res.json({
    status: "ok",
    company: "SuratPaintingSolution",
    phone: "+91 94081 97990",
    email: "suratpenters01@gmail.com",
    city: "Surat, Gujarat, India",
    database: {
      configured: mongoConfigured,
      connected: mongoConnected,
      status: mongoConfigured ? (mongoConnected ? "connected" : "connecting") : "in-memory-fallback"
    }
  });
});

// Vercel Cron Job Endpoint (Automated 3-Day Overdue Lead Alerts & Scheduled Blog Publishing)
app.get(["/api/cron/check-overdue-leads", "/api/cron"], async (req, res) => {
  try {
    console.log("[Vercel Cron Triggered] Running automated publication and 3-day overdue lead scan...");
    await publishingScheduler.processScheduledItems();
    res.json({
      status: "ok",
      executedAt: new Date().toISOString(),
      message: "Automated 3-day overdue lead scan & scheduled blog publishing processed successfully."
    });
  } catch (err) {
    console.error("[Vercel Cron Error]:", err);
    res.status(500).json({
      status: "error",
      message: err.message || "Failed to process cron tasks"
    });
  }
});

// ----------------------------------------------------
// AUTHENTICATION ENDPOINTS
// ----------------------------------------------------

app.post("/api/admin/login", adminLoginLimiter, async (req, res) => {
  const { username, password } = req.body;
  const ip = req.ip || req.socket.remoteAddress || 'unknown';

  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Please enter both admin username and password.' });
  }

  const result = await authService.login(String(username).trim(), String(password), ip);
  if (!result.success) {
    return res.status(401).json(result);
  }

  return res.json(result);
});

app.get("/api/admin/me", authService.requireAuth, (req, res) => {
  return res.json({
    success: true,
    user: req.user
  });
});

// ----------------------------------------------------
// GOOGLE POLICY PUBLISHING SYSTEM ENDPOINTS
// ----------------------------------------------------

// GET /api/policy/status - Google Policy Verification Status Overview
app.get("/api/policy/status", (req, res) => {
  const registry = policyService.getRegistry();
  const pauseInfo = policyService.isAutomationPaused();
  const reqReviewCount = registry.filter(r => r.status === 'SOURCE_REQUIRES_REVIEW').length;

  let overallHealth = 'HEALTHY';
  if (pauseInfo.paused || reqReviewCount > 2) {
    overallHealth = 'FAILED';
  } else if (reqReviewCount > 0) {
    overallHealth = 'WARNING';
  }

  const latestVerified = registry.reduce((latest, curr) => {
    return (new Date(curr.last_verified_at) > new Date(latest)) ? curr.last_verified_at : latest;
  }, registry[0]?.last_verified_at || new Date().toISOString());

  return res.json({
    success: true,
    overallHealth,
    automationPaused: pauseInfo.paused,
    pauseReason: pauseInfo.reason,
    lastSuccessfulVerification: latestVerified,
    activeOfficialSourcesCount: registry.filter(r => r.status === 'ACTIVE' || r.status === 'SOURCE_MOVED').length,
    sourcesRequiringReviewCount: reqReviewCount,
    weeklyPublishedBlogCount: contentService.getWeeklyPublishedBlogCount(),
    maxWeeklyBlogQuota: 3,
    publishedBlogsCount: contentService.getBlogs(false).length,
    publishedReviewsCount: contentService.getReviews(false).length
  });
});

// GET /api/policy/registry - Get Official Google Source Registry
app.get("/api/policy/registry", (req, res) => {
  return res.json({
    success: true,
    count: policyService.getRegistry().length,
    registry: policyService.getRegistry()
  });
});

// POST /api/policy/registry/sync - Force Fresh Live Verification Sync of Official Google Docs
app.post("/api/policy/registry/sync", authService.requireAuth, async (req, res) => {
  try {
    const syncRes = await policyService.syncOfficialGoogleSources();
    return res.json({
      success: true,
      message: `Fresh verification sync completed across ${syncRes.verifiedCount} official Google Search sources.`,
      syncRes
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || "Failed sync" });
  }
});

// GET /api/policy/snapshots - Policy Snapshots History
app.get("/api/policy/snapshots", (req, res) => {
  return res.json({
    success: true,
    snapshots: policyService.getSnapshots(30)
  });
});

// GET /api/policy/audit-logs - Immutable Publishing Audit Logs
app.get("/api/policy/audit-logs", (req, res) => {
  return res.json({
    success: true,
    auditLogs: auditLogService.getAuditLogs(50)
  });
});

// POST /api/policy/pause - Toggle Automatic Publishing Pause
app.post("/api/policy/pause", authService.requireAuth, (req, res) => {
  const { paused, reason } = req.body;
  policyService.setPauseState(Boolean(paused), reason || 'Admin toggle');
  return res.json({
    success: true,
    automationPaused: Boolean(paused),
    reason: reason || 'Admin toggle'
  });
});

// ----------------------------------------------------
// VERIFIED BUSINESS FACTS ENDPOINTS
// ----------------------------------------------------

app.get("/api/business-facts", (req, res) => {
  return res.json({
    success: true,
    facts: businessFactsService.getAllFacts()
  });
});

app.post("/api/business-facts", authService.requireAuth, (req, res) => {
  const { category, fact, source } = req.body;
  const user = req.user;
  if (!fact || !category) {
    return res.status(400).json({ success: false, error: "Fact content and category are required." });
  }
  const added = businessFactsService.addFact({
    category: sanitizeText(String(category)) || 'SERVICE',
    fact: sanitizeText(String(fact)),
    source: sanitizeText(String(source || 'Admin Direct Input')),
    verified_by: user ? user.username : 'Admin'
  });
  return res.status(201).json({ success: true, fact: added });
});

// ----------------------------------------------------
// BLOG MANAGEMENT ENDPOINTS
// ----------------------------------------------------

app.get("/api/blogs", (req, res) => {
  const includeDrafts = req.query.includeDrafts === "true";
  const blogs = contentService.getBlogs(includeDrafts);
  return res.json({ success: true, count: blogs.length, blogs });
});

app.get("/api/blogs/:id", (req, res) => {
  const blog = contentService.getBlogById(req.params.id);
  if (!blog) {
    return res.status(404).json({ success: false, error: "Blog post not found" });
  }
  return res.json({ success: true, blog });
});

app.post("/api/blogs", authService.requireAuth, (req, res) => {
  try {
    const sanitizedBody = {
      ...req.body,
      title: sanitizeText(req.body.title || ''),
      summary: sanitizeText(req.body.summary || ''),
      seoTitle: sanitizeText(req.body.seoTitle || ''),
      seoDescription: sanitizeText(req.body.seoDescription || '')
    };
    const saved = contentService.saveBlog(sanitizedBody);
    return res.status(200).json({
      success: true,
      message: "Blog post saved as DRAFT. Live Google policy verification required before publishing.",
      blog: saved
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

app.post("/api/blogs/:id/publish", authService.requireAuth, async (req, res) => {
  try {
    const user = req.user;
    const publisher = user ? user.username : 'Admin User';
    const result = await contentService.publishBlog(req.params.id, publisher);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({
      success: false,
      status: 'REVIEW_REQUIRED',
      error: err.message || "Publication gate error"
    });
  }
});

// ----------------------------------------------------
// CUSTOMER REVIEWS ENDPOINTS
// ----------------------------------------------------

app.get("/api/reviews", (req, res) => {
  const includePending = req.query.includePending === "true";
  const reviews = contentService.getReviews(includePending);
  return res.json({ success: true, count: reviews.length, reviews });
});

// PUBLIC REVIEW SUBMISSION (Rate limited + Sanitized)
app.post("/api/reviews", publicSubmissionLimiter, (req, res) => {
  try {
    const sanitizedReview = {
      author: sanitizeText(req.body.author || ''),
      role: sanitizeText(req.body.role || 'Homeowner'),
      area: sanitizeText(req.body.area || 'Surat'),
      service: sanitizeText(req.body.service || 'Painting Service'),
      comment: sanitizeText(req.body.comment || ''),
      rating: Number(req.body.rating) || 5,
      isAuthenticCustomer: true,
      isIncentivized: false
    };

    if (!sanitizedReview.author || !sanitizedReview.comment) {
      return res.status(400).json({ success: false, error: "Name and Review comment are required." });
    }

    const submitted = contentService.submitReview(sanitizedReview);
    return res.status(201).json({
      success: true,
      message: "Thank you for your review! It is submitted for Google Policy verification before publication.",
      review: submitted
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

app.post("/api/reviews/:id/publish", authService.requireAuth, async (req, res) => {
  try {
    const user = req.user;
    const publisher = user ? user.username : 'Admin User';
    const result = await contentService.publishReview(req.params.id, publisher);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({
      success: false,
      status: 'REVIEW_REQUIRED',
      error: err.message || "Review publication error"
    });
  }
});

// ----------------------------------------------------
// LEADS ENDPOINTS (PUBLIC RATE LIMITED + SANITIZED)
// ----------------------------------------------------

app.post("/api/leads", publicSubmissionLimiter, async (req, res) => {
  try {
    const name = sanitizeText(req.body.name || '');
    const phone = sanitizeText(req.body.phone || '');
    const area = sanitizeText(req.body.area || 'Surat');
    const serviceNeeded = sanitizeText(req.body.serviceNeeded || '');
    const message = sanitizeText(req.body.message || '');

    if (!name || !phone || !serviceNeeded) {
      return res.status(400).json({
        success: false,
        error: "Please provide your Name, Phone Number, and Service Needed."
      });
    }

    const newLeadData = {
      name,
      phone,
      area: area || "Surat",
      serviceNeeded,
      message,
      createdAt: new Date()
    };

    let savedLead = null;

    if (mongoose.connection.readyState === 1 && LeadModel) {
      const leadDoc = new LeadModel(newLeadData);
      savedLead = await leadDoc.save();
    } else {
      const memLead = {
        id: `lead-${Date.now()}`,
        propertyType: "Home / Flat",
        status: "Pending",
        lastAlertSentAt: null,
        ...newLeadData,
        createdAt: newLeadData.createdAt.toISOString()
      };
      memoryLeads.unshift(memLead);
      savedLead = memLead;
    }

    console.log(`[LEAD RECEIVED] ${newLeadData.name} (${newLeadData.phone}) - ${newLeadData.serviceNeeded} in ${newLeadData.area}`);

    // Trigger instant Resend Email Alert
    try {
      await sendLeadNotificationEmail({
        name,
        phone,
        area,
        serviceNeeded,
        message,
        propertyType: "Home / Flat"
      });
    } catch (emailErr) {
      console.error("[POST /api/leads] Resend Email trigger error:", emailErr);
    }

    return res.status(201).json({
      success: true,
      message: "Thank you! Your quote request has been received. Our Surat team will call you back within 30 minutes.",
      lead: savedLead
    });
  } catch (err) {
    console.error("Error saving lead:", err);
    return res.status(500).json({
      success: false,
      error: "An error occurred while submitting your quote request. Please try again or call us at +91 94081 97990."
    });
  }
});

// Test Endpoint for Resend Email
app.get("/api/test-email", async (req, res) => {
  try {
    const emailResult = await sendLeadNotificationEmail({
      name: "Test Customer (Surat)",
      phone: "+91 9408197990",
      area: "Vesu, Surat",
      serviceNeeded: "Full Home Interior & Exterior Painting",
      message: "This is a test notification from Surat Painting Solution using Resend API.",
      propertyType: "3 BHK Apartment"
    });

    return res.json({
      message: "Test email triggered via Resend API",
      result: emailResult
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || err });
  }
});

app.get("/api/leads", authService.requireAuth, async (req, res) => {
  try {
    let rawLeads = [];
    if (mongoose.connection.readyState === 1 && LeadModel) {
      rawLeads = await LeadModel.find().sort({ createdAt: -1 }).lean();
    } else {
      rawLeads = memoryLeads;
    }

    const currentTime = Date.now();
    const enrichedLeads = rawLeads.map((l) => {
      const createdMs = new Date(l.createdAt || Date.now()).getTime();
      const daysOld = Math.floor((currentTime - createdMs) / (1000 * 60 * 60 * 24));
      const status = l.status || "Pending";
      const isPending = status === "Pending" || status === "Site Inspection Scheduled";
      const isOverdue3Days = isPending && daysOld >= 3;
      return {
        ...l,
        id: l.id || l._id?.toString(),
        status,
        propertyType: l.propertyType || "Home / Flat",
        daysOld,
        isOverdue3Days,
        alertTargetWhatsapp: "+91 9408197990",
        alertTargetEmail: "vishalnishad0809@gmail.com"
      };
    });

    const overdueCount = enrichedLeads.filter(l => l.isOverdue3Days).length;

    return res.json({
      success: true,
      count: enrichedLeads.length,
      overdueCount,
      alertRecipients: {
        whatsapp: "+91 9408197990",
        email: "vishalnishad0809@gmail.com"
      },
      leads: enrichedLeads
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Failed to fetch leads" });
  }
});

// PUT /api/leads/:id/status - Update lead status
app.put("/api/leads/:id/status", authService.requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowedStatuses = ["Pending", "Site Inspection Scheduled", "Quote Sent", "Work Order Confirmed", "Closed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status value" });
    }

    if (mongoose.connection.readyState === 1 && LeadModel) {
      await LeadModel.findByIdAndUpdate(id, { status });
    } else {
      const idx = memoryLeads.findIndex(l => l.id === id);
      if (idx !== -1) {
        memoryLeads[idx].status = status;
      }
    }

    auditLogService.logPublicationAttempt({
      content_type: 'REVIEW',
      content_id: id,
      title_or_snippet: `Lead Status Update: ${status}`,
      publisher: req.user?.username || 'Admin',
      policy_snapshot_id: 'LEAD_STATUS_UPDATE',
      policy_sources: ['internal-lead-management'],
      policy_versions: ['v1.0'],
      source_last_updated_dates: [new Date().toISOString()],
      verification_timestamp: new Date().toISOString(),
      policy_change_status: 'NO_CHANGE',
      risk_results: { passed: true, issues: [] },
      technical_results: { passed: true },
      structured_data_results: { passed: true },
      final_decision: 'PUBLISHED'
    });

    return res.json({ success: true, message: `Lead status updated to ${status}` });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || "Failed to update lead status" });
  }
});

// POST /api/leads/:id/alert - Record automatic alert dispatched
app.post("/api/leads/:id/alert", authService.requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { channel } = req.body; // 'WHATSAPP' or 'EMAIL'
    const alertTime = new Date().toISOString();

    if (mongoose.connection.readyState === 1 && LeadModel) {
      await LeadModel.findByIdAndUpdate(id, { lastAlertSentAt: alertTime });
    } else {
      const idx = memoryLeads.findIndex(l => l.id === id);
      if (idx !== -1) {
        memoryLeads[idx].lastAlertSentAt = alertTime;
      }
    }

    auditLogService.logPublicationAttempt({
      content_type: 'REVIEW',
      content_id: id,
      title_or_snippet: `3-Day Lead Alert Dispatched via ${channel || 'WhatsApp/Email'}`,
      publisher: req.user?.username || 'Admin System',
      policy_snapshot_id: 'LEAD_3DAY_ALERT_DISPATCH',
      policy_sources: ['internal-lead-management'],
      policy_versions: ['v1.0'],
      source_last_updated_dates: [new Date().toISOString()],
      verification_timestamp: new Date().toISOString(),
      policy_change_status: 'NO_CHANGE',
      risk_results: { passed: true, issues: [] },
      technical_results: { passed: true },
      structured_data_results: { passed: true },
      final_decision: 'PUBLISHED'
    });

    return res.json({
      success: true,
      message: `3-Day Lead Alert logged to WhatsApp (+91 9408197990) and Email (vishalnishad0809@gmail.com)`,
      lastAlertSentAt: alertTime
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || "Failed to record alert" });
  }
});

// GET /api/leads/auto-alert-logs - Get real-time background dispatch logs
app.get("/api/leads/auto-alert-logs", authService.requireAuth, (req, res) => {
  return res.json({
    success: true,
    lastRunAt: leadAlertService.getLastRunAt(),
    autoAlertLogs: leadAlertService.getAutoAlertLogs()
  });
});

// POST /api/leads/trigger-auto-alerts - Force immediate background check
app.post("/api/leads/trigger-auto-alerts", authService.requireAuth, async (req, res) => {
  try {
    const result = await leadAlertService.processAutomatedLeadAlerts(
      getLeadsForScheduler,
      updateLeadAlertTimeForScheduler
    );
    return res.json({
      success: true,
      message: `Automated Lead Alert Engine executed. ${result.newlyDispatched} new 3-day overdue alerts dispatched.`,
      result
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || "Failed to process auto alerts" });
  }
});

// Dynamic Robots.txt
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *
Allow: /
Sitemap: https://suratpaintingsolution.onrender.com/sitemap.xml
`);
});

// Dynamic Sitemap.xml (strictly including public, canonical, indexable URLs and published blogs)
app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml");
  const baseUrl = "https://suratpaintingsolution.onrender.com";
  const services = [
    "interior-painting", "exterior-painting", "waterproofing", "texture-wall-painting",
    "wood-polishing-varnishing", "metal-grill-gate-painting", "pop-and-putty-work", "commercial-society-painting"
  ];
  const areas = [
    "adajan", "vesu", "piplod", "city-light", "athwa", "ghod-dod-road",
    "varachha", "katargam", "pal", "althan", "dumas-road", "rander"
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  const staticRoutes = ["", "/about", "/services", "/areas", "/gallery", "/testimonials", "/blog", "/contact"];
  staticRoutes.forEach(r => {
    xml += `  <url><loc>${baseUrl}${r}</loc><changefreq>weekly</changefreq><priority>${r === "" ? "1.0" : "0.8"}</priority></url>\n`;
  });

  services.forEach(s => {
    xml += `  <url><loc>${baseUrl}/services/${s}</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>\n`;
  });

  areas.forEach(a => {
    xml += `  <url><loc>${baseUrl}/areas/${a}</loc><changefreq>monthly</changefreq><priority>0.85</priority></url>\n`;
  });

  // Dynamically include only published blogs
  const publishedBlogs = contentService.getBlogs(false);
  publishedBlogs.forEach(b => {
    xml += `  <url><loc>${baseUrl}/blog/${b.id}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
  });

  xml += `</urlset>`;
  res.send(xml);
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));

    let templateHtml = "";
    try {
      templateHtml = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
    } catch (e) {
      templateHtml = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf-8");
    }

    app.get("*", (req, res) => {
      try {
        const meta = resolvePageMeta(req.path);
        let html = templateHtml;
        if (html.includes("</head>")) {
          html = html.replace("</head>", `${meta.metaHtml}\n</head>`);
        }
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.send(html);
      } catch (err) {
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    publishingScheduler.startScheduler(30000);
    console.log(`SuratPaintingSolution server running on http://0.0.0.0:${PORT}`);
  });
}

if (process.env.VERCEL !== '1') {
  startServer();
}

export { app };
export default app;
