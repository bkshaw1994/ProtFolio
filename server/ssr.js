const React = require('react');
const { renderToString } = require('react-dom/server');
const path = require('path');

/**
 * Render React App to static HTML string for SSR
 * @param {string} location - The current URL location
 * @returns {Promise<string>} - HTML string
 */
async function renderApp(location) {
  try {
    // Dynamically import the App component (CommonJS compatible)
    // This will be used with the built app

    // Create a basic shell that will be hydrated on client
    const htmlShell = generateHtmlShell('', location);
    return htmlShell;
  } catch (error) {
    console.error('SSR rendering error:', error);
    throw error;
  }
}

/**
 * Generate HTML shell with critical styles and meta tags
 * @param {string} appHtml - Rendered app HTML
 * @param {string} location - Current URL location
 * @returns {string} - Complete HTML document
 */
function generateHtmlShell(appHtml, location) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#3b82f6" />

    <!-- Primary Meta Tags -->
    <title>Bishal Kumar Shaw - Freelance MERN Stack Developer | React | Node.js | MongoDB Expert | Available for Hire</title>
    <meta name="title" content="Bishal Kumar Shaw - Freelance MERN Stack Developer | React | Node.js | MongoDB Expert | Available for Hire" />
    <meta
      name="description"
      content="Expert freelance full-stack developer with 9+ years of MERN stack experience. Available for hire - React.js, Node.js, MongoDB, Express.js, AWS. Bangalore, India. Fast delivery, clean code, 24/7 support. Get free consultation!"
    />
    <meta name="keywords" content="freelance developer, freelancer, hire developer, MERN stack developer, React developer, Node.js developer, MongoDB expert, Express.js developer, full stack developer for hire, web developer Bangalore, freelance programmer, hire MERN developer, Bishal Kumar Shaw, remote developer, contract developer, JavaScript developer, TypeScript developer, frontend developer, backend developer, API development, web application development" />
    <meta name="author" content="Bishal Kumar Shaw" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow" />
    <meta name="bingbot" content="index, follow" />
    <link rel="canonical" href="https://bishal-portfolio-chi.vercel.app${location}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://bishal-portfolio-chi.vercel.app${location}" />
    <meta property="og:title" content="Hire Expert Freelance MERN Stack Developer | React, Node.js, MongoDB Specialist" />
    <meta property="og:description" content="Professional freelance developer with 9+ years experience. MERN Stack, React.js, Node.js, MongoDB. Available for your next project. Fast delivery, clean code. Get free quote!" />
    <meta property="og:image" content="https://bishal-portfolio-chi.vercel.app/og-image.jpg" />
    <meta property="og:site_name" content="Bishal Kumar Shaw - Freelance Developer Portfolio" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://bishal-portfolio-chi.vercel.app${location}" />
    <meta property="twitter:title" content="Hire Expert Freelance MERN Stack Developer | Bishal Kumar Shaw" />
    <meta property="twitter:description" content="Professional freelance developer with 9+ years experience. Available for hire. React.js | Node.js | MongoDB | Express.js. Get free consultation!" />
    <meta property="twitter:image" content="https://bishal-portfolio-chi.vercel.app/og-image.jpg" />

    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": "https://bishal-portfolio-chi.vercel.app/#person",
          "name": "Bishal Kumar Shaw",
          "jobTitle": "Senior MERN Stack Developer",
          "description": "Expert freelance full-stack developer specializing in MERN stack with 9+ years of professional experience. Available for hire for React, Node.js, MongoDB, and Express.js projects.",
          "url": "https://bishal-portfolio-chi.vercel.app",
          "image": "https://bishal-portfolio-chi.vercel.app/profile-image.jpg",
          "email": "b.kumarshaw94@gmail.com",
          "sameAs": [
            "https://github.com/bkshaw1994",
            "https://www.linkedin.com/in/bkshaw1994"
          ],
          "knowsAbout": [
            "MERN Stack Development",
            "React.js",
            "Node.js",
            "MongoDB",
            "Express.js",
            "JavaScript",
            "TypeScript",
            "AWS"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://bishal-portfolio-chi.vercel.app/#website",
          "url": "https://bishal-portfolio-chi.vercel.app",
          "name": "Bishal Kumar Shaw - Freelance MERN Stack Developer",
          "description": "Professional freelance full-stack developer portfolio showcasing 9+ years of MERN stack development experience",
          "publisher": {
            "@id": "https://bishal-portfolio-chi.vercel.app/#person"
          },
          "inLanguage": "en-US"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://bishal-portfolio-chi.vercel.app/#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://bishal-portfolio-chi.vercel.app"
            }
          ]
        }
      ]
    }
    </script>

    <!-- Preload critical fonts to prevent layout shift (FOUT) -->
    <link rel="preload" href="/static/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/static/fonts/poppins.woff2" as="font" type="font/woff2" crossorigin />

    <!-- DNS prefetch for external resources -->
    <link rel="dns-prefetch" href="//api.github.com" />

    <!-- Manifest and Icons -->
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/logo192.png" />

    <!-- Critical inline CSS for above-the-fold content - ensures FCP -->
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html, body {
        width: 100%;
        height: 100%;
      }

      #root {
        width: 100%;
        min-height: 100%;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: #0f172a;
        color: #e2e8f0;
      }

      /* Loading state for immediate FCP */
      .app-loading {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      }

      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #334155;
        border-top-color: #60a5fa;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="app-loading">
        <div class="loading-spinner"></div>
      </div>
    </div>
    <script>
      window.__INITIAL_STATE__ = {};
      window.__INITIAL_LOCATION__ = '${location}';
    </script>
  </body>
</html>`;
}

module.exports = {
  renderApp,
  generateHtmlShell
};
