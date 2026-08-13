import mongoose from 'mongoose';

/**
 * Global variable for caching connection in serverless environments (Vercel / AWS Lambda)
 * Prevents multiple connections during cold starts & hot module reloads
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    if (process.env.VERCEL === '1' || process.env.NODE_ENV === 'production') {
      console.error('🚨 [CRITICAL PRODUCTION MISCONFIGURATION]: MONGODB_URI environment variable is missing! Leads submitted will be stored in temporary memory and WILL NOT persist across serverless function invocations. Please configure MONGODB_URI in your Vercel Dashboard.');
    } else {
      console.warn('MONGODB_URI is missing. Using local in-memory fallback store.');
    }
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      console.log('Successfully connected to MongoDB Atlas (Cached Connection)');
      return mongooseInstance;
    }).catch((err) => {
      console.warn('MongoDB connection failed (falling back to memory store):', err.message || err);
      cached.promise = null;
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Define Lead Schema and Model
export const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  area: { type: String, default: 'Surat' },
  serviceNeeded: { type: String, required: true },
  propertyType: { type: String, default: 'Home / Flat' },
  message: { type: String, default: '' },
  status: { type: String, default: 'Pending' },
  lastAlertSentAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

export const LeadModel = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
