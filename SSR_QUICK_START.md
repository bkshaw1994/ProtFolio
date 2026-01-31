# SSR Quick Start Guide

## What is SSR?

**Server-Side Rendering (SSR)** means your Express server renders the initial HTML and sends it to the browser, rather than sending an empty shell that React fills in. This improves:
- ⚡ Initial page load speed
- 🔍 SEO (search engines see complete HTML)
- 📊 Core Web Vitals scores

## Architecture Overview

```
Browser Request
     ↓
Express Server
     ↓
Generate HTML (via server/ssr.js)
     ↓
Send to Browser
     ↓
Browser displays immediately
     ↓
JavaScript loads & React takes over (hydration)
```

## Files Created/Modified

### New Files
- **`server/ssr.js`** - Renders React app to HTML string
- **`client/src/index.server.js`** - Hydration entry point
- **`SSR.md`** - Detailed documentation
- **`scripts/checkSsr.js`** - Configuration checker

### Modified Files
- **`server/index.js`** - Added SSR routes and static file serving
- **`client/src/App.js`** - Added StaticRouter support
- **`package.json`** - Added SSR build scripts

## How to Use

### Development (No SSR)
```bash
npm run dev
```
Starts React dev server normally (client-side rendering).

### Build for Production with SSR
```bash
# Build client only
npm run client:build

# OR full pipeline with validation
npm run build:prod

# Then run server (serves SSR HTML)
npm start
```

### Quick SSR Test
```bash
npm run build:ssr && npm start
```

## How It Works

### 1. Server renders HTML shell
When you request `/projects`, the server:
- Receives request in Express
- Calls `generateHtmlShell(location)`
- Returns complete HTML with `<div id="root">` pre-rendered

### 2. Browser displays HTML immediately
- HTML includes critical CSS
- Page is visible right away
- JavaScript bundles start loading

### 3. React hydrates the app
- JavaScript loads and executes
- `hydrateRoot()` called in `index.server.js`
- React attaches event listeners to server HTML
- App becomes fully interactive

### 4. Client takes over
- React Router handles navigation
- API calls fetch dynamic data
- Everything works as normal SPA

## Key Concepts

### StaticRouter vs BrowserRouter
- **BrowserRouter** (Client): Manages routing in browser, reads URL from address bar
- **StaticRouter** (Server): Takes URL as prop, doesn't interact with browser

In `App.js`:
```javascript
const RouterComponent = typeof window === 'undefined' ? StaticRouter : Router;
const routerProps = typeof window === 'undefined' ? { location } : {};
```

### Hydration
- Server renders components → HTML
- Browser loads HTML
- React loads JavaScript
- `hydrateRoot()` matches server HTML with React state
- App is interactive again

### No Props on Server
Currently, we render a basic HTML shell without component props. The app fetches data client-side. For advanced SSR with data, you'd:
1. Fetch data on server before rendering
2. Inject into HTML for hydration
3. Skip API calls on mount if data already loaded

## Environment Variables

No new environment variables needed. Existing setup works with SSR.

## Static File Serving

The server now serves:
- React build files from `client/build/`
- Uploaded files from `/uploads/`
- API routes at `/api/*`
- Everything else triggers SSR (renders as React app)

## Deployment

### Vercel
- Already compatible
- Automatic build and deployment
- Serverless functions handle SSR

### Self-hosted
```bash
npm install-deps    # Install all dependencies
npm run build:prod  # Build everything
npm start          # Run server
```

Server listens on `process.env.PORT` or `5000`.

## Troubleshooting

### Page shows blank after deployment
- Check that `client/build/` exists
- Verify static file paths are correct
- Check browser console for errors

### Hydration mismatch warnings
- Ensure same code runs on server and client
- Check `typeof window` guards
- Verify StaticRouter/BrowserRouter switch works

### Styles not loading
- CSS is included inline in HTML
- Tailwind classes should work
- Check that build completed successfully

### API calls failing
- API routes still work as before
- CORS configured for `/api/` routes
- Check server logs for errors

## Performance Tips

### For Better Performance

1. **Cache headers**
   ```javascript
   app.use(express.static(clientBuildPath, { maxAge: "1h" }));
   ```

2. **Gzip compression** (already in helmet)

3. **Optimize images** in React components

4. **Code splitting** with React.lazy()

5. **Monitoring** with performance tools

## Testing SSR

Check files are ready:
```bash
npm run check:ssr
```

Build and run:
```bash
npm run build:ssr && npm start
```

Visit: http://localhost:5000

## Next Steps

1. ✅ Build client: `npm run client:build`
2. ✅ Verify server: `npm run check:ssr`
3. ✅ Run with SSR: `npm run start:ssr`
4. 📊 Monitor performance improvements
5. 🚀 Deploy to production

## Resources

- [React SSR Documentation](https://react.dev/reference/react-dom/server)
- [Express.js Guide](https://expressjs.com/)
- [React Router SSR](https://reactrouter.com/en/main/guides/ssr)
- [Core Web Vitals](https://web.dev/vitals/)
- [SEO Best Practices](https://developers.google.com/search)

---

**Questions?** Check `SSR.md` for detailed documentation.
