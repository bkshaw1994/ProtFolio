/**
 * Advanced SSR Configuration Examples
 *
 * This file shows optional enhancements to the basic SSR setup.
 * These are NOT required for the current implementation.
 * Copy patterns from here if you want to implement advanced features.
 */

// ============================================================================
// EXAMPLE 1: Dynamic SSR with Data Fetching
// ============================================================================

/**
 * Fetch initial data on server before rendering
 * Place this in server/ssr.js and import in server/index.js
 *
 * Usage:
 *   const html = await renderAppWithData(req.url, req);
 */

const renderAppWithData = async (location, req) => {
  try {
    // Example: Fetch profile data for /about page
    const initialState = {};

    if (location === '/about') {
      try {
        const profileResponse = await fetch('http://localhost:5000/api/profile');
        const profile = await profileResponse.json();
        initialState.profile = profile;
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    // Inject state into HTML for hydration
    return generateHtmlShellWithState('', location, initialState);
  } catch (error) {
    console.error('Error in renderAppWithData:', error);
    throw error;
  }
};

// ============================================================================
// EXAMPLE 2: HTML Shell with Injected State
// ============================================================================

/**
 * Enhanced generateHtmlShell that includes initial state
 * This prevents duplicate API calls on mount
 */

const generateHtmlShellWithState = (appHtml, location, initialState = {}) => {
  const stateJson = JSON.stringify(initialState).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Professional portfolio showcasing experience, projects, and skills"
    />
    <link rel="canonical" href="https://example.com${location}" />

    <title>Portfolio</title>

    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body, #root { width: 100%; height: 100%; overflow-x: hidden; }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: #0f172a;
        color: #e2e8f0;
      }
    </style>
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script>
      window.__INITIAL_STATE__ = ${stateJson};
      window.__INITIAL_LOCATION__ = '${location}';
    </script>
  </body>
</html>`;
};

// ============================================================================
// EXAMPLE 3: Streaming SSR for Better TTFB
// ============================================================================

/**
 * Use renderToPipeableStream for streaming HTML
 * Faster Time To First Byte (TTFB)
 * Better perceived performance
 *
 * Requires React 18+
 * Import: const { renderToPipeableStream } = require('react-dom/server');
 */

const setupStreamingSSR = (app) => {
  app.get('*', (req, res) => {
    if (req.url.startsWith('/api/') || req.url.startsWith('/uploads/')) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    // Start sending HTML immediately
    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write('<head>');
    res.write('<meta charset="utf-8" />');
    res.write('<title>Portfolio</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<div id="root">');

    // Stream content here (advanced)
    // Then send script tags

    res.write('</div>');
    res.write('<script src="/static/js/main.js"></script>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  });
};

// ============================================================================
// EXAMPLE 4: Cache Strategies
// ============================================================================

/**
 * Different caching strategies for different file types
 */

const setupCaching = (app, path) => {
  const express = require('express');
  const clientBuildPath = path.join(__dirname, '../client/build');

  // Cache static assets for 1 year (they have hash in filename)
  app.use(
    '/static',
    express.static(path.join(clientBuildPath, 'static'), {
      maxAge: '365d',
      immutable: true
    })
  );

  // Cache index.html for short time (may have updates)
  app.get('/index.html', express.static(clientBuildPath, { maxAge: '0' }));

  // Cache manifest and robots for 1 day
  app.use(
    express.static(clientBuildPath, {
      maxAge: '1d'
    })
  );
};

// ============================================================================
// EXAMPLE 5: Error Boundary with SSR
// ============================================================================

/**
 * Handle SSR errors gracefully
 * Send fallback content on SSR failure
 */

const ssrErrorHandler = (app) => {
  app.get('*', async (req, res) => {
    try {
      // Try SSR rendering
      const html = await generateAppHTML(req.url);
      res.send(html);
    } catch (error) {
      console.error('SSR Error:', error);

      // Send client-only version as fallback
      const fallbackHtml = generateClientOnlyFallback();
      res.status(200).send(fallbackHtml);
    }
  });
};

const generateClientOnlyFallback = () => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Portfolio</title>
    <style>
      body {
        background: #0f172a;
        color: #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: system-ui;
      }
      #root { width: 100%; height: 100%; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <!-- Client will render everything -->
    <script src="/static/js/main.js"></script>
  </body>
</html>
`;

// ============================================================================
// EXAMPLE 6: Helmet Integration for Security Headers
// ============================================================================

/**
 * Enhanced security headers with Helmet
 * Already used in server/index.js, but here's detailed config
 */

const setupSecurityHeaders = (app, helmet) => {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ['\'self\''],
          scriptSrc: ['\'self\'', '\'unsafe-inline\''],
          styleSrc: ['\'self\'', '\'unsafe-inline\''],
          imgSrc: ['\'self\'', 'data:', 'https:'],
          fontSrc: ['\'self\'', 'data:'],
          connectSrc: ['\'self\'', 'https://api.github.com']
        }
      },
      hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true
      },
      crossOriginResourcePolicy: { policy: 'cross-origin' }
    })
  );
};

// ============================================================================
// EXAMPLE 7: Compression for Better Performance
// ============================================================================

/**
 * Enable gzip compression for responses
 */

const setupCompression = (app) => {
  const compression = require('compression');

  // Compress responses larger than 1KB
  app.use(
    compression({
      threshold: 1024,
      level: 6 // Balance between speed and compression ratio
    })
  );
};

// ============================================================================
// EXAMPLE 8: Analytics and Monitoring
// ============================================================================

/**
 * Track SSR performance metrics
 */

const setupMetrics = (app) => {
  app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;

      // Log metrics
      if (req.url.startsWith('/api/')) {
        console.log(`[API] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
      } else if (!req.url.startsWith('/static') && !req.url.startsWith('/uploads')) {
        console.log(`[SSR] ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);

        // Send to monitoring service
        if (duration > 1000) {
          console.warn(`⚠️  Slow SSR response: ${duration}ms for ${req.url}`);
        }
      }
    });

    next();
  });
};

// ============================================================================
// EXAMPLE 9: Progressive Enhancement
// ============================================================================

/**
 * Serve degraded version without JavaScript for older browsers
 * This is rarely needed nowadays but shows the pattern
 */

const setupProgressiveEnhancement = (app) => {
  // Detect browser capabilities
  app.use((req, res, next) => {
    const userAgent = req.get('user-agent') || '';
    const isModernBrowser =
      !userAgent.includes('MSIE') && !userAgent.includes('Trident/');

    res.locals.isModernBrowser = isModernBrowser;
    next();
  });
};

// ============================================================================
// EXAMPLE 10: Development SSR Setup
// ============================================================================

/**
 * Dev-friendly SSR with hot reloading
 * Use this during development for faster iteration
 */

const setupDevSSR = (app, isDev) => {
  if (isDev) {
    // In development, rebuild on changes
    // Consider using webpack dev middleware or similar

    app.get('*', (req, res) => {
      // Serve from development server instead of build
      // Redirect to client dev server or serve dynamically
      res.redirect('http://localhost:3000' + req.url);
    });
  }
};

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/**
 * To use these advanced patterns, update server/index.js:
 *
 * const setupCaching = require('./ssr.advanced');
 * const setupMetrics = require('./ssr.advanced');
 *
 * // In your middleware section:
 * setupCaching(app, path);
 * setupMetrics(app);
 */

module.exports = {
  renderAppWithData,
  generateHtmlShellWithState,
  setupStreamingSSR,
  setupCaching,
  setupSecurityHeaders,
  setupCompression,
  setupMetrics,
  setupProgressiveEnhancement
};
