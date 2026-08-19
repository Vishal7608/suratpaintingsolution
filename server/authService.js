import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'housepainters-surat-secure-jwt-secret-key-2026';

const loginAttempts = new Map();

export const authService = {
  /**
   * Verify admin login credentials strictly against process.env variables
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

    const expectedUsername = process.env.ADMIN_USERNAME != null ? String(process.env.ADMIN_USERNAME).trim() : null;
    const expectedPassword = process.env.ADMIN_PASSWORD != null ? String(process.env.ADMIN_PASSWORD).trim() : null;

    if (!expectedUsername || !expectedPassword) {
      return {
        success: false,
        error: 'Admin authentication is not configured. Please set ADMIN_USERNAME and ADMIN_PASSWORD in environment variables (.env).'
      };
    }

    const inputUser = String(username || '').trim();
    const inputPass = String(password || '').trim();

    if (!inputUser || !inputPass || inputUser !== expectedUsername) {
      tracker.attempts += 1;
      if (tracker.attempts >= 5) {
        tracker.lockoutUntil = now + 15 * 60 * 1000;
      }
      loginAttempts.set(ip, tracker);
      return { success: false, error: 'Access Denied: Invalid admin username.' };
    }

    // Direct match against active .env password or bcrypt hash (supporting numbers or alphanumeric)
    const passwordMatch = (inputPass === expectedPassword) || (expectedPassword.startsWith('$2') && bcrypt.compareSync(inputPass, expectedPassword));
    if (!passwordMatch) {
      tracker.attempts += 1;
      if (tracker.attempts >= 5) {
        tracker.lockoutUntil = now + 15 * 60 * 1000;
      }
      loginAttempts.set(ip, tracker);
      return { success: false, error: 'Access Denied: Incorrect password.' };
    }

    loginAttempts.delete(ip);

    const user = {
      id: 'admin-1',
      username: expectedUsername,
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
