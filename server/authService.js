import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'housepainters-surat-secure-jwt-secret-key-2026';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Surat@Painters2026';

let adminPasswordHash = bcrypt.hashSync(DEFAULT_ADMIN_PASSWORD, 10);
const loginAttempts = new Map();

export const authService = {
  /**
   * Verify admin login credentials with lockout protection
   */
  async login(username, password, ip) {
    const now = Date.now();
    const tracker = loginAttempts.get(ip) || { attempts: 0, lockoutUntil: 0 };

    if (tracker.lockoutUntil > now) {
      const minutesLeft = Math.ceil((tracker.lockoutUntil - now) / 60000);
      return {
        success: false,
        error: `Too many failed login attempts. Account locked for ${minutesLeft} more minute(s).`
      };
    }

    if (username !== ADMIN_USERNAME) {
      tracker.attempts += 1;
      if (tracker.attempts >= 5) {
        tracker.lockoutUntil = now + 15 * 60 * 1000;
      }
      loginAttempts.set(ip, tracker);
      return { success: false, error: 'Invalid admin credentials.' };
    }

    const passwordMatch = await bcrypt.compare(password, adminPasswordHash);
    if (!passwordMatch) {
      tracker.attempts += 1;
      if (tracker.attempts >= 5) {
        tracker.lockoutUntil = now + 15 * 60 * 1000;
      }
      loginAttempts.set(ip, tracker);
      return { success: false, error: 'Invalid admin credentials.' };
    }

    loginAttempts.delete(ip);

    const user = {
      id: 'admin-1',
      username: ADMIN_USERNAME,
      role: 'admin'
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '12h' });

    return {
      success: true,
      token,
      user
    };
  },

  /**
   * Verify JWT token
   */
  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch {
      return null;
    }
  },

  /**
   * Express Middleware to require Admin authentication
   */
  requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Admin authentication token required.'
      });
    }

    const token = authHeader.split(' ')[1];
    const user = authService.verifyToken(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Invalid or expired admin token.'
      });
    }

    req.user = user;
    next();
  }
};
