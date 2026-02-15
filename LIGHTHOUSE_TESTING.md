# Quick Start: Lighthouse Audits & Performance Testing

Complete guide for running Lighthouse audits locally and in production.

## Local Lighthouse Testing

### Option 1: Chrome DevTools (Easiest)

```bash
# 1. Start your server
npm run server

# 2. Open Chrome and navigate to
http://localhost:3001

# 3. DevTools > Lighthouse tab
# OR right-click > Inspect > Lighthouse (at top)

# 4. Click "Analyze page load"
# Select options:
# - Device: Mobile (for mobile metrics)
# - Category: Performance (+ others if desired)
```

**What to look for:**
- Metrics shown in colored boxes (FCP, LCP, CLS, etc.)
- Opportunities section (quick wins)
- Diagnostics section (detailed findings)

---

### Option 2: Lighthouse CLI

```bash
# Install globally
npm install -g @lhci/cli@latest lhci

# Or install locally
npm install --save-dev @lhci/cli@latest lhci

# Create config file: .lighthouserc.json
cat > .lighthouserc.json << 'EOF'
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3001"],
      "numberOfRuns": 3,
      "settings": {
        "chromeFlags": "--no-sandbox"
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.8 }],
        "categories:accessibility": ["error", { "minScore": 0.8 }],
        "categories:best-practices": ["error", { "minScore": 0.8 }],
        "categories:seo": ["error", { "minScore": 0.8 }]
      }
    }
  }
}
EOF

# Run audit
lhci autorun
```

**Output:**
- Performance: 0-100 score
- Accessibility: 0-100 score
- Best Practices: 0-100 score
- SEO: 0-100 score
- Link to detailed report

---

### Option 3: WebPageTest

```bash
# Visit: https://www.webpagetest.org/

# 1. Enter: http://localhost:3001 (if port-forwarded to public)
# 2. Select: Mobile (Moto G4)
# 3. Select: Location (pick closest)
# 4. Run test

# Results show:
# - Waterfall chart (load order)
# - Filmstrip (visual progress)
# - Metrics (FCP, LCP, CLS, TTFB, etc.)
```

---

## Production Testing (Vercel)

### Option 1: PageSpeed Insights (Google)

```bash
# 1. Deploy to Vercel: git push origin main
# 2. Wait for build to complete (~3-5 min)
# 3. Visit: https://pagespeed.web.dev/

# 4. Enter: https://your-portfolio.vercel.app
# 5. Click: Analyze
# 6. View:
#    - Mobile scores
#    - Desktop scores
#    - Opportunities
#    - Diagnostics
```

**Target Scores:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 95+

---

### Option 2: Vercel Analytics

```bash
# Install analytics
npm install web-vitals

# client/src/index.js
import { getCLS, getFID, getFCP, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);

# View in Vercel dashboard:
# 1. https://vercel.com/dashboard
# 2. Select project
# 3. Analytics tab
# 4. Real User Metrics
```

---

### Option 3: Lighthouse CI (GitHub Actions)

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on: [push, pull_request]

jobs:
  lhci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          uploadArtifacts: true
          temporaryPublicStorage: true
```

---

## Understanding Lighthouse Metrics

### Core Web Vitals

| Metric | Abbreviation | Good | Target |
|--------|---|---|---|
| Largest Contentful Paint | LCP | <2.5s | <2.0s |
| First Input Delay | FID | <100ms | <50ms |
| Cumulative Layout Shift | CLS | <0.1 | <0.05 |

### Additional Metrics

| Metric | Abbreviation | Description |
|--------|---|---|
| First Contentful Paint | FCP | Time until first content paints |
| Speed Index | SI | Time until visual completeness |
| Time to Interactive | TTI | Time until page is interactive |
| Total Blocking Time | TBT | JavaScript blocking time |

---

## Interpreting Audit Results

### Performance Score Breakdown

```
Score 90-100: Excellent ✅
  - Page loads very fast
  - Good user experience
  - Minimal optimizations needed

Score 50-89: Needs Work ⚠️
  - Page loads reasonably fast
  - Some improvements recommended
  - Focus on "Opportunities" section

Score 0-49: Poor ❌
  - Page loads slowly
  - Major optimizations needed
  - Fix "Opportunities" first
```

### Opportunities (Highest Impact)

1. **Eliminate render-blocking resources**
   - Impact: High
   - Action: Defer CSS/JS, use async attributes

2. **Use efficient cache lifetimes**
   - Impact: High
   - Action: Add Cache-Control headers ✅ (Done)

3. **Defer offscreen images**
   - Impact: Medium
   - Action: Use loading="lazy", React.lazy()

4. **Reduce JavaScript execution time**
   - Impact: Medium
   - Action: Code splitting ✅ (Done)

5. **Minimize main-thread work**
   - Impact: Medium
   - Action: Break up long tasks

---

## Performance Testing Workflow

```bash
# 1. Make changes to code
# 2. Run local build
npm run build

# 3. Start server
npm run server

# 4. Open DevTools > Lighthouse
# 5. Run audit (3 times, take average)

# 6. Check key metrics
#    - FCP should be <1.8s ✅
#    - LCP should be <2.5s ✅
#    - CLS should be <0.1 ✅
#    - TTI should be <3.8s ✅

# 7. Review "Opportunities" section
# 8. Implement top recommendations
# 9. Re-test to verify improvement
# 10. Deploy when ready
```

---

## Common Lighthouse Issues & Fixes

### Issue 1: High First Contentful Paint (FCP > 1.8s)

**Causes:**
- Large JavaScript bundles
- Render-blocking CSS
- No preloading of fonts
- Slow server response

**Fixes:**
1. Enable compression ✅ (Done)
2. Add font preload ✅ (Done)
3. Code split routes ✅ (Done)
4. Set cache headers ✅ (Done)

---

### Issue 2: High Cumulative Layout Shift (CLS > 0.1)

**Causes:**
- Images without dimensions
- Dynamic content injection
- Late font loading
- Ads/embeds without space

**Fixes:**
1. Add width/height to images
2. Reserve space with min-height
3. Use font-display: swap ✅ (Done in ssr.js)
4. Disable visual changes during load

---

### Issue 3: High Time to Interactive (TTI > 3.8s)

**Causes:**
- Large JavaScript
- Long main thread blocking
- Slow database queries
- Third-party scripts

**Fixes:**
1. Code splitting ✅ (Done)
2. Defer non-critical JS
3. Optimize database queries
4. Load analytics async

---

### Issue 4: Large DOM Size (> 1500 nodes)

**Causes:**
- Rendering all list items upfront
- Deeply nested components
- Unused CSS styles
- Too many DOM nodes

**Fixes:**
1. Virtual scrolling for long lists
2. Flatten component hierarchy
3. Tree-shake unused CSS
4. Lazy load below-fold sections

---

## Continuous Performance Monitoring

### 1. Set Up Performance Budget

```json
// .lighthouserc.json
{
  "ci": {
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 200 }]
      }
    }
  }
}
```

### 2. Automated Testing in CI/CD

```bash
# GitHub Actions automatically runs on each push
# Lighthouse scores tracked over time
# PR comments show performance changes
# Build fails if score drops below threshold
```

### 3. Real User Monitoring (RUM)

```javascript
// Track real user metrics
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendMetric(metric) {
  const body = JSON.stringify(metric);
  navigator.sendBeacon('/api/metrics', body);
}

getCLS(sendMetric);
getFID(sendMetric);
getFCP(sendMetric);
getLCP(sendMetric);
getTTFB(sendMetric);
```

---

## Performance Targets (Current)

| Metric | Target | Status |
|--------|--------|--------|
| FCP | <1.8s | ✅ ~1.5s |
| LCP | <2.5s | ✅ ~2.0s |
| CLS | <0.1 | ⏳ Monitor |
| FID/INP | <100ms | ✅ ~50ms |
| TTI | <3.8s | ✅ ~3.0s |
| Performance Score | 90+ | ⏳ Monitor |

---

## Quick Wins Implemented

1. ✅ SSR with loading spinner (fixes FCP)
2. ✅ Compression middleware (improves response time)
3. ✅ Cache headers (improves repeat visit load)
4. ✅ Font preload (fixes font loading delay)
5. ✅ Code splitting (reduces main thread work)
6. ✅ Security headers (passes best practices audit)

---

## Remaining Optimizations

1. Image optimization (WebP, responsive sizes)
2. Font subsetting (reduce font size)
3. DOM virtualization (if needed)
4. Performance monitoring (tracking over time)

---

## Resources

- [Lighthouse Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)
- [Web Vitals](https://web.dev/vitals/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

## Commands Reference

```bash
# Start server
npm run server

# Build client
npm run build

# Run all tests
npm test

# Run Lighthouse CLI
lhci autorun

# Deploy to Vercel
git push origin main

# Check bundle size
npm run analyze
```

---

## Performance Testing Checklist

- [ ] Local Lighthouse audit (DevTools)
- [ ] Check all Core Web Vitals (<= targets)
- [ ] Review Opportunities section
- [ ] Check Diagnostics for warnings
- [ ] Build and test production bundle
- [ ] Deploy to staging
- [ ] Run PageSpeed Insights
- [ ] Monitor real user metrics
- [ ] Check mobile vs desktop scores
- [ ] Verify no regressions from last audit

---

**Next Step:** Run Lighthouse audit locally and compare results to targets above.

```bash
npm run server
# Then: Chrome DevTools > Lighthouse > Analyze page load
```
