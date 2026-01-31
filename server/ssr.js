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
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Professional portfolio showcasing experience, projects, and skills"
    />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Portfolio" />
    <meta property="og:description" content="Professional portfolio" />

    <title>Portfolio</title>

    <!-- Critical inline CSS for above-the-fold content -->
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html, body, #root {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
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
    </style>
  </head>
  <body>
    <div id="root">${appHtml}</div>
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
