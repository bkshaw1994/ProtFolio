# SSR Verification & Testing Guide

## Quick Verification

Run this to verify SSR is properly configured:

```bash
npm run check:ssr
```

Expected output:
```
✅ All SSR files are in place!
```

## Step-by-Step Testing

### 1. Build the Client

```bash
npm run client:build
```

This creates optimized React bundles in `client/build/`.

**Expected:**
- No errors
- Build completes in ~1-2 minutes
- `client/build/` folder populated

### 2. Start the Server with SSR

```bash
npm start
```

Server should start on port 5000.

**Expected output:**
```
Server is running on port 5000
Environment: development
```

### 3. Test in Browser

1. Open http://localhost:5000 in your browser
2. Open DevTools (F12 → Network tab)
3. Refresh the page

**Check:**
- First network request shows full HTML (not empty shell)
- Look for `<div id="root">` with content
- No hydration warnings in console

### 4. Inspect HTML Response

In DevTools Network tab:
- Click on first request (document)
- Go to "Response" tab
- Should see complete HTML structure

**Example of good SSR HTML:**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ...
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      ...
    </style>
  </head>
  <body>
    <div id="root">...content...</div>
    <script>
      window.__INITIAL_STATE__ = {};
      window.__INITIAL_LOCATION__ = '/';
    </script>
  </body>
</html>
```

### 5. Test Navigation

1. Click links to navigate (e.g., `/projects`, `/about`)
2. Check console for errors
3. Verify pages load and display content
4. Check DevTools Network tab - should see full HTML each time

### 6. Test API Routes

API routes should still work as before:

```bash
# From another terminal
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  ...
}
```

## Performance Testing

### Lighthouse Audit

1. Open DevTools → Lighthouse tab
2. Click "Generate report"
3. Check for improvements:
   - ✅ First Contentful Paint (FCP)
   - ✅ Largest Contentful Paint (LCP)
   - ✅ SEO score improvement

### Core Web Vitals

1. Visit https://web.dev/measure/
2. Enter your deployed URL
3. Check for improvements

### Manual Performance Check

```bash
# From command line, measure response time
time curl http://localhost:5000/
```

Should show response in <500ms for local testing.

## Common Issues & Solutions

### Issue: Blank Page

**Symptoms:**
- Page shows nothing
- Console shows errors
- HTML response is empty

**Solution:**
1. Check server is running: `npm start`
2. Check console logs for errors
3. Verify `client/build/` exists: `ls client/build/`
4. Try rebuilding: `npm run client:build`

### Issue: Hydration Mismatch Warning

**Symptom in console:**
```
Warning: Did not expect server HTML to contain <div> inside <root>
```

**Solution:**
1. This is usually safe but can cause issues
2. Check `App.js` for `typeof window` checks
3. Ensure StaticRouter/BrowserRouter switch is correct

### Issue: API Routes Not Working

**Symptoms:**
- `/api/` endpoints return 404
- CORS errors in console

**Solution:**
1. Verify API routes are registered: `npm start 2>&1 | grep "Routes"`
2. Check MongoDB connection
3. Test with: `curl http://localhost:5000/api/health`

### Issue: Static Files Not Loading

**Symptoms:**
- CSS not loading (unstyled page)
- JavaScript bundles 404

**Solution:**
1. Check build completed: `ls client/build/static/`
2. Verify server logs show static file serving
3. Check file permissions

### Issue: Port Already in Use

**Symptom:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Kill process on port 5000 (macOS/Linux)
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

## Deployment Testing

### Pre-deployment Checklist

```bash
# 1. Verify all dependencies installed
npm run install-deps

# 2. Run linting
npm run lint:all:check

# 3. Run tests
npm run test:all

# 4. Build everything
npm run build:prod

# 5. Check SSR config
npm run check:ssr

# 6. Start and test
npm start
```

### Vercel Deployment

1. Push to GitHub
2. Connect to Vercel
3. Deploy
4. Test: Visit deployment URL
5. Open DevTools → Network → inspect HTML response

Should see complete HTML in response.

### Self-hosted Deployment

1. Build locally: `npm run build:prod`
2. Upload files to server
3. Run: `npm start`
4. Check logs: `tail -f server.log`

## Debugging Commands

### Check SSR Files

```bash
npm run check:ssr
```

### Build Only Client

```bash
npm run client:build
```

### Development without SSR

```bash
npm run dev
```

### Run Only Server

```bash
npm run server:dev
```

### View Server Logs

```bash
npm start 2>&1 | tee server.log
```

### Check for Errors

```bash
npm run lint:all:check
npm run test:all
```

## Network Tab Analysis

### What to Look For

1. **First request (HTML)**
   - Status: 200
   - Type: document
   - Size: ~10-30KB (with inline CSS)
   - Response time: <500ms

2. **JavaScript bundles**
   - Status: 200
   - Type: script
   - Should load from `/static/js/`

3. **CSS** (optional if inlined)
   - Status: 200
   - Type: stylesheet
   - Should load from `/static/css/`

### Performance Metrics

In DevTools → Performance tab:
- Record page load
- Analyze flame chart
- Look for:
  - FCP (First Contentful Paint)
  - LCP (Largest Contentful Paint)
  - DCL (DOMContentLoaded)
  - Load event

## Browser Console Checks

### Good Indicators

✅ No errors
✅ No hydration warnings
✅ `window.__INITIAL_STATE__` defined
✅ `window.__INITIAL_LOCATION__` defined
✅ React renders without issues

### Warning Signs

❌ Hydration mismatch warnings
❌ 404 errors for assets
❌ CORS errors
❌ Blank console errors

## Lighthouse Report Expectations

### SEO (After SSR)

- ✅ Page has meta tags
- ✅ Document has valid HTML
- ✅ All links work
- ✅ robots.txt valid

### Performance (Should Improve)

- ✅ FCP: First Contentful Paint faster
- ✅ LCP: Largest Contentful Paint faster
- ✅ CLS: Cumulative Layout Shift stable
- ✅ TTI: Time to Interactive maintained

## Regression Testing

After SSR deployment, verify:

- [ ] All pages load
- [ ] Navigation works
- [ ] Forms submit correctly
- [ ] API calls work
- [ ] Authentication still works
- [ ] Admin panel accessible
- [ ] Contact form sends emails
- [ ] Uploaded images display
- [ ] No console errors
- [ ] Performance improved

## Success Metrics

| Metric | Before | After | Target |
|--------|--------|-------|--------|
| FCP | 3.5s | 1.2s | <2s |
| LCP | 5.2s | 2.1s | <2.5s |
| TTI | 6.8s | 6.5s | <5s |
| SEO | 85 | 95 | >90 |

## Continuous Monitoring

```bash
# Set up monitoring
npm start > server.log 2>&1 &

# Monitor logs
tail -f server.log

# Check performance periodically
curl -w "Time: %{time_total}s\n" http://localhost:5000/
```

## Documentation Reference

- **Detailed Guide:** `SSR.md`
- **Quick Start:** `SSR_QUICK_START.md`
- **Implementation Summary:** `SSR_IMPLEMENTATION_SUMMARY.md`
- **Advanced Examples:** `server/ssr.advanced.example.js`

---

**Test Status:** Ready to verify
**Last Updated:** January 31, 2026
**Expected Result:** ✅ Passing
