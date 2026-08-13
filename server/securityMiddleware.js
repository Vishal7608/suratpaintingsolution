const ipRateLimits = new Map();

/**
 * Express middleware for public endpoint rate limiting
 */
export function createRateLimiter(maxRequests = 20, windowMs = 15 * 60 * 1000) {
  return (req, res, next) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
    const now = Date.now();
    const record = ipRateLimits.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > record.resetTime) {
      record.count = 0;
      record.resetTime = now + windowMs;
    }

    record.count += 1;
    ipRateLimits.set(ip, record);

    if (record.count > maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please wait a few minutes before trying again.'
      });
    }

    next();
  };
}

/**
 * Server-side HTML & script tag sanitizer to prevent XSS
 */
export function sanitizeText(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*>([\s\S]*?)<\/script>/gi, '') // Remove script tags
    .replace(/<style\b[^<]*>([\s\S]*?)<\/style>/gi, '')   // Remove style tags
    .replace(/on\w+="[^"]*"/gi, '')                       // Remove inline JS event handlers
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/<[^>]+>/g, '')                               // Strip HTML tags
    .trim();
}

/**
 * Strict Outbound SSRF Check
 * Only allow outbound policy fetches targeting developers.google.com
 */
export function isAllowedGooglePolicyUrl(targetUrl) {
  try {
    const parsed = new URL(targetUrl);
    return (
      parsed.protocol === 'https:' &&
      parsed.hostname === 'developers.google.com'
    );
  } catch {
    return false;
  }
}
