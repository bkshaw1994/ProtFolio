const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const app = express();

// Import routes
const profileRoutes = require('./routes/profile');
const projectRoutes = require('./routes/projects');
const skillRoutes = require('./routes/skills');
const experienceRoutes = require('./routes/experience');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const githubRoutes = require('./routes/github');
const visitorRoutes = require('./routes/visitor');

// Import SSR utilities
const { generateHtmlShell } = require('./ssr');

// Security middleware
app.set('trust proxy', 1);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ['\'self\''],
        scriptSrc: ['\'self\'', '\'unsafe-inline\''],
        styleSrc: ['\'self\'', '\'unsafe-inline\''],
        imgSrc: ['\'self\'', 'data:', 'https:'],
        fontSrc: ['\'self\'', 'data:']
      }
    }
  })
);

// Enable compression for all responses
app.use(compression());

// Performance headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      // Allow localhost for development
      if (origin.includes('localhost')) {
        return callback(null, true);
      }

      // Allow any Vercel deployment
      if (origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }

      // Allow specific client URL from env
      if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) {
        return callback(null, true);
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
const uploadsDir = process.env.VERCEL
  ? '/tmp/uploads'
  : path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Serve static assets (JS, CSS, images) from React build
// But NOT index.html - that will be handled by SSR
const clientBuildPath = path.join(__dirname, '../client/build');
app.use('/static', express.static(path.join(clientBuildPath, 'static'), { maxAge: '1y', immutable: true }));

// Serve other static files (manifest, favicon, etc) but NOT index.html
app.use(express.static(clientBuildPath, {
  maxAge: '1h',
  index: false  // Disable serving index.html - SSR will handle it
}));

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
app.get('/api', (req, res) => {
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
      error: error.message,
      hasMongoUri: !!process.env.MONGODB_URI,
      readyState: mongoose.connection.readyState
    });
  }
});

// Middleware to ensure DB connection for API routes only
app.use('/api', async (req, res, next) => {
  // Skip DB check for health and test-db endpoints
  if (req.path === '/health' || req.path === '/test-db') {
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
app.use('/api/experience', experienceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/visitor', visitorRoutes);

// Explicit routes for SEO files with proper headers
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(clientBuildPath, 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.sendFile(path.join(clientBuildPath, 'sitemap.xml'));
});

// SSR Catch-all route - serve React app for all non-API routes
app.get('*', (req, res) => {
  // Skip SSR for API routes and static files
  if (req.url.startsWith('/api/') || req.url.startsWith('/uploads/')) {
    return res.status(404).json({
      success: false,
      message: 'Route not found'
    });
  }

  try {
    // Serve HTML shell with hydration setup
    // The app will hydrate on the client with dynamic content
    const html = generateHtmlShell('', req.url);
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (error) {
    console.error('SSR Error:', error);
    res.status(500).send('Internal Server Error');
  }
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
