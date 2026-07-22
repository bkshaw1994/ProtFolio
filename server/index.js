const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();

// Import routes
const profileRoutes = require('./routes/profile');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const certificationRoutes = require('./routes/certifications');
const experienceRoutes = require('./routes/experience');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const githubRoutes = require('./routes/github');
const visitorRoutes = require('./routes/visitor');

// Trust proxy for rate limiting and IP detection
app.set('trust proxy', 1);

// CORS configuration - MUST be mounted first before helmet or rate limiting
const allowedClientOrigins = (process.env.CLIENT_URLS || '')
  .split(',')
  .concat(process.env.CLIENT_URL || [])
  .map((value) => value.trim())
  .filter(Boolean);

const isWildcardAllowed =
  process.env.CLIENT_URL === '*' ||
  allowedClientOrigins.includes('*');

const trustedClientOrigins = allowedClientOrigins.filter((v) => v !== '*');

// Only permit permissive localhost origins outside of production.
const isDevelopment = process.env.NODE_ENV !== 'production';
const localDevHostnames = new Set(['localhost', '127.0.0.1', '0.0.0.0']);

// Optional exact-match suffix allowlist explicitly specified via env var (e.g. "my-org.com").
const allowedOriginSuffixes = (process.env.ALLOWED_ORIGIN_SUFFIXES || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const isTrustedOrigin = (origin) => {
  if (!origin) return false;

  let hostname;
  try {
    hostname = new URL(origin).hostname;
  } catch {
    return false;
  }

  if (isDevelopment && localDevHostnames.has(hostname)) {
    return true;
  }

  const cleanOrigin = origin.replace(/\/$/, '').toLowerCase();

  const isMatch = trustedClientOrigins.some((allowed) => {
    let cleanAllowed = allowed.replace(/\/$/, '').toLowerCase();
    if (!cleanAllowed.startsWith('http://') && !cleanAllowed.startsWith('https://')) {
      cleanAllowed = `https://${cleanAllowed}`;
    }
    return cleanAllowed === cleanOrigin;
  });

  if (isMatch) return true;

  return (
    allowedOriginSuffixes.length > 0 &&
    allowedOriginSuffixes.some(
      (suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`)
    )
  );
};

const corsOptionsDelegate = (req, callback) => {
  const origin = req.headers.origin;

  // Requests with no origin (e.g. mobile apps, cURL, server-to-server)
  if (!origin) {
    return callback(null, { origin: true });
  }

  // Explicitly trusted origin -> allow origin and enable credentials
  if (isTrustedOrigin(origin)) {
    return callback(null, {
      origin: origin,
      credentials: true,
      optionsSuccessStatus: 200
    });
  }

  // Wildcard mode -> allow wildcard origin but strictly DISABLE credentials
  if (isWildcardAllowed) {
    return callback(null, {
      origin: '*',
      credentials: false,
      optionsSuccessStatus: 200
    });
  }

  // Reject unallowed origins
  return callback(null, {
    origin: false,
    credentials: false,
    optionsSuccessStatus: 200
  });
};

// Mount CORS middleware as the very first handler
app.use(cors(corsOptionsDelegate));
app.options('*', cors(corsOptionsDelegate));

// Security middleware (Helmet)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically with long-term caching
const uploadsDir = process.env.VERCEL
  ? '/tmp/uploads'
  : path.join(__dirname, 'uploads');
app.use(
  '/uploads',
  express.static(uploadsDir, {
    maxAge: '365d',
    immutable: true
  })
);

// MongoDB connection with caching for serverless
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI environment variable is not set!');
      throw new Error('MONGODB_URI is required');
    }

    console.log('Attempting to connect to MongoDB...');
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });
    console.log('MongoDB connected successfully');
    cachedDb = connection;
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
  }
};

// Connect to database (non-blocking for serverless)
if (!process.env.VERCEL) {
  connectDB();
}

// Health check endpoint (no DB required)
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio API Server',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    mongodb:
      mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    mongodbReadyState: mongoose.connection.readyState,
    hasMongoUri: !!process.env.MONGODB_URI,
    timestamp: new Date().toISOString()
  });
});

// Diagnostic endpoint to test DB connection
app.get('/api/test-db', async (req, res) => {
  try {
    await connectDB();
    res.json({
      success: true,
      message: 'MongoDB connection successful',
      readyState: mongoose.connection.readyState
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'MongoDB connection failed',
      ...(process.env.NODE_ENV === 'development' && { error: error.message }),
      readyState: mongoose.connection.readyState
    });
  }
});

// Diagnostic endpoint to verify CORS settings in production
app.get('/api/cors-info', (req, res) => {
  const reqOrigin = req.headers.origin || null;
  res.json({
    success: true,
    clientUrl: process.env.CLIENT_URL || null,
    clientUrls: process.env.CLIENT_URLS || null,
    allowedOriginSuffixes: process.env.ALLOWED_ORIGIN_SUFFIXES || null,
    trustedOrigins: trustedClientOrigins,
    requestOrigin: reqOrigin,
    isTrusted: isTrustedOrigin(reqOrigin),
    isWildcard: isWildcardAllowed
  });
});

// Vercel Speed Insights route
// This endpoint handles Speed Insights analytics data collection
app.post('/_vercel/speed-insights/event', (req, res) => {
  // Vercel's infrastructure handles Speed Insights automatically
  // This route ensures compatibility if called directly
  res.status(204).send();
});

// Middleware to ensure DB connection for API routes only
app.use('/api', async (req, res, next) => {
  // Skip DB check for health, test-db, and cors-info endpoints
  if (
    req.path === '/health' ||
    req.path === '/test-db' ||
    req.path === '/cors-info'
  ) {
    return next();
  }

  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed:', error.message);
    res.status(503).json({
      success: false,
      message:
        'Database connection unavailable. Please check MongoDB connection.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/visitor', visitorRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((error, req, res, _next) => {
  console.error('Error:', error);
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// For Vercel serverless
if (process.env.VERCEL) {
  module.exports = app;
} else {
  // For local development
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}
