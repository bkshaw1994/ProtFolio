# Client-Side Performance Optimization Guide

Complete guide for optimizing React components, images, and layouts in the portfolio.

## Image Optimization Patterns

### 1. Responsive Images with WebP Fallback

**File: `client/src/utils/imageOptimizer.js`**

```javascript
/**
 * Generate optimized image component with WebP support and responsive sizes
 */
export const OptimizedImage = ({
  src,
  alt,
  width = 1200,
  height = 630,
  className = '',
  loading = 'lazy'
}) => {
  // Extract extension and base path
  const basePath = src.replace(/\.[^.]+$/, '');

  return (
    <picture>
      {/* WebP format (25-35% smaller) */}
      <source
        srcSet={`${basePath}.webp`}
        type="image/webp"
      />

      {/* Fallback to JPEG */}
      <img
        src={`${basePath}.jpg`}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        decoding="async"
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'block'
        }}
      />
    </picture>
  );
};

/**
 * Generate srcset for responsive images at multiple breakpoints
 */
export const generateSrcSet = (basePath) => {
  return `
    ${basePath}-480w.jpg 480w,
    ${basePath}-800w.jpg 800w,
    ${basePath}-1200w.jpg 1200w,
    ${basePath}-1600w.jpg 1600w
  `.trim();
};

/**
 * Generate sizes attribute for responsive images
 */
export const generateSizes = () => {
  return '(max-width: 480px) 100vw, (max-width: 1024px) 80vw, 70vw';
};

/**
 * Full responsive image component
 */
export const ResponsiveImage = ({
  src,
  alt,
  priority = false,
  className = ''
}) => {
  const basePath = src.replace(/\.[^.]+$/, '');
  const loading = priority ? 'eager' : 'lazy';
  const decoding = priority ? 'auto' : 'async';

  return (
    <picture>
      <source
        srcSet={`${basePath}.webp`}
        type="image/webp"
      />
      <source
        srcSet={`${basePath}-480w.jpg 480w, ${basePath}-1200w.jpg 1200w`}
        type="image/jpeg"
      />
      <img
        src={`${basePath}-800w.jpg`}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={className}
        style={{
          maxWidth: '100%',
          height: 'auto'
        }}
      />
    </picture>
  );
};
```

### 2. Image Preprocessing Commands

```bash
# Install ImageMagick or use Squoosh web app
brew install imagemagick

# Create responsive image sizes
convert input.jpg -resize 480x480 -quality 80 input-480w.jpg
convert input.jpg -resize 1200x1200 -quality 80 input-1200w.jpg

# Convert to WebP (25% smaller typically)
cwebp -q 80 input.jpg -o input.webp
cwebp -q 80 input-480w.jpg -o input-480w.webp
cwebp -q 80 input-1200w.jpg -o input-1200w.webp

# Or use batch processing
for img in *.jpg; do
  convert "$img" -resize 480x480 -quality 80 "${img%-*}-480w.jpg"
  convert "$img" -resize 1200x1200 -quality 80 "${img%-*}-1200w.jpg"
  cwebp -q 80 "$img" -o "${img%-*}.webp"
done
```

---

## Code Splitting & Lazy Loading

### 1. Route-Based Code Splitting

**File: `client/src/App.js` (already implemented)**

```javascript
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load route components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

const App = () => (
  <Router>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  </Router>
);
```

### 2. Component Lazy Loading

```javascript
// Defer below-fold sections
const ProjectGallery = lazy(() => import('./components/ProjectGallery'));
const TestimonialCarousel = lazy(() => import('./components/TestimonialCarousel'));
const Newsletter = lazy(() => import('./components/Newsletter'));

export const ProjectsPage = () => {
  return (
    <div>
      {/* Immediate render */}
      <ProjectHeader />

      {/* Lazy load after initial render */}
      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectGallery />
      </Suspense>

      {/* More lazy sections */}
      <Suspense fallback={<div>Loading testimonials...</div>}>
        <TestimonialCarousel />
      </Suspense>
    </div>
  );
};
```

---

## Optimizing Bundle Size

### 1. Analyze Bundle

```bash
# Install bundle analyzer
npm install --save-dev source-map-explorer

# Analyze production build
npm run build
npx source-map-explorer 'client/build/static/js/*.js'
```

### 2. Remove Unused Dependencies

```bash
# Check for unused packages
npx depcheck client/

# Remove if not used
npm uninstall unused-package
```

### 3. Replace Heavy Dependencies

| Heavy | Alternative | Savings |
|-------|-------------|---------|
| `moment.js` (67KB) | `date-fns` (13KB) | 80% |
| `lodash` (70KB) | ES6 + `lodash-es` | 70% |
| `axios` (12KB) | `fetch` API | 12KB |
| `react-bootstrap` | `tailwindcss` | 30KB |

---

## Font Optimization

### 1. Self-Hosted Web Fonts

**Benefits:**
- Control over delivery
- No DNS lookup to Google
- Privacy (no GA tracking)

**Implementation:**

```css
/* client/src/index.css */

@font-face {
  font-family: 'Inter';
  src: url('/static/fonts/inter-var.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;  /* Show fallback while loading */
  font-stretch: 75% 125%;
}

@font-face {
  font-family: 'Poppins';
  src: url('/static/fonts/poppins-semibold.woff2') format('woff2');
  font-weight: 600;
  font-display: swap;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

h1, h2, h3 {
  font-family: 'Poppins', system-ui, sans-serif;
}
```

### 2. Font Subsetting (for languages)

```bash
# Subset to Latin only (reduce file size by 30%)
pyftsubset inter-var.ttf --unicodes="U+0000-U+00FF, U+0100-U+017F"

# Convert to WOFF2 for 50% smaller file size
ttf2woff2 inter-var.ttf
```

### 3. Font Preload (Already in ssr.js)

```html
<!-- server/ssr.js generates this -->
<link rel="preload" href="/static/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/static/fonts/poppins.woff2" as="font" type="font/woff2" crossorigin />
```

---

## CSS Optimization

### 1. Critical CSS Extraction

**Already implemented in SSR shell:**

```css
/* server/ssr.js - Critical inline styles */
#root {
  width: 100%;
  min-height: 100%;
}

body {
  font-family: system-ui;
  background: #0f172a;
  color: #e2e8f0;
}

.app-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
```

### 2. CSS-in-JS Optimization (if using styled-components)

```javascript
// client/src/styles/GlobalStyles.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    font-family: system-ui;
    background: #0f172a;
    color: #e2e8f0;
  }
`;

export default GlobalStyles;
```

---

## JavaScript Optimization

### 1. Reduce Main Thread Work

```javascript
// Bad: Blocks main thread
function processData(items) {
  return items.map(item => ({
    ...item,
    processed: heavyComputation(item)
  }));
}

// Good: Use web worker for heavy computation
const worker = new Worker('/workers/dataProcessor.js');

function processData(items) {
  return new Promise(resolve => {
    worker.onmessage = (e) => resolve(e.data);
    worker.postMessage(items);
  });
}
```

### 2. Defer Non-Critical JavaScript

```javascript
// Good: Only load what's needed
<script src="analytics.js" async defer></script>
<script src="chat-widget.js" async defer></script>

// Better: Load on interaction
document.addEventListener('mouseover', () => {
  import('./chat-widget.js');
});
```

### 3. Memoize Expensive Computations

```javascript
import { useMemo, useCallback } from 'react';

const PortfolioStats = ({ projects }) => {
  // Only recalculate if projects change
  const stats = useMemo(() => ({
    total: projects.length,
    completed: projects.filter(p => p.complete).length,
    inProgress: projects.filter(p => !p.complete).length
  }), [projects]);

  // Only recreate if stats change
  const handleUpdate = useCallback(() => {
    console.log(stats);
  }, [stats]);

  return <StatsDisplay stats={stats} onUpdate={handleUpdate} />;
};
```

---

## Layout Shift Prevention (CLS)

### 1. Reserve Space for Dynamic Content

```javascript
// Bad: Image causes layout shift
<img src="photo.jpg" alt="Profile" />

// Good: Reserve space with dimensions
<img
  src="photo.jpg"
  alt="Profile"
  width={200}
  height={200}
  style={{ maxWidth: '100%', height: 'auto' }}
/>

// Or use aspect-ratio (modern CSS)
<img
  src="photo.jpg"
  alt="Profile"
  style={{ aspectRatio: '1', objectFit: 'cover' }}
/>
```

### 2. Fixed Heights for Dynamic Content

```javascript
// Bad: Modal appears without space
<div>
  {showModal && <Modal />}
</div>

// Good: Reserve space
<div style={{ minHeight: '400px' }}>
  {showModal && <Modal />}
</div>
```

### 3. Font Loading Strategy

```css
/* Use font-display: swap to prevent FOUT */
@font-face {
  font-family: 'CustomFont';
  src: url('/font.woff2');
  font-display: swap;  /* Show system font while loading */
}

/* Prevents invisible text (FOIT) */
/* - 'auto' (default): 0-3s invisible, then fallback
/* - 'swap': Show fallback immediately, swap when ready
/* - 'block': 0-3s invisible, then fallback
/* - 'fallback': 0.1s invisible, 3s swap window, then fallback
/* - 'optional': 0.1s invisible, no swap window
```

---

## Performance Monitoring

### 1. Web Vitals Integration

```javascript
// client/src/utils/vitals.js

export const reportWebVitals = (metric) => {
  console.log(metric);

  // Send to analytics service
  if (metric.label === 'web-vital') {
    fetch('/api/metrics', {
      method: 'POST',
      body: JSON.stringify(metric)
    });
  }
};

// client/src/index.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
import { reportWebVitals } from './utils/vitals';

getCLS(reportWebVitals);
getFID(reportWebVitals);
getFCP(reportWebVitals);
getLCP(reportWebVitals);
getTTFB(reportWebVitals);
```

### 2. User Timing API

```javascript
// Measure component render time
const PortfolioHero = () => {
  useEffect(() => {
    performance.mark('hero-start');

    return () => {
      performance.mark('hero-end');
      performance.measure('hero-render', 'hero-start', 'hero-end');

      const measure = performance.getEntriesByName('hero-render')[0];
      console.log(`Hero rendered in ${measure.duration}ms`);
    };
  }, []);

  return <section>{/* content */}</section>;
};
```

---

## Testing Performance

### 1. Lighthouse CI

```bash
# Install
npm install -g @lhci/cli@latest lhci

# Configure: .lighthouserc.json
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
      "preset": "lighthouse:recommended"
    }
  }
}

# Run
lhci autorun
```

### 2. Continuous Performance Monitoring

```bash
# Install web-vitals
npm install web-vitals

# Track metrics in production
import { getCLS, getFID, getFCP, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
```

---

## Checklist: Client-Side Performance

- [ ] Images optimized (WebP + responsive sizes)
- [ ] Lazy loading for images (`loading="lazy"`)
- [ ] Code splitting implemented (route-based)
- [ ] CSS is minimal (Tailwind purged)
- [ ] Fonts preloaded (non-blocking)
- [ ] Bundle size <300KB (gzipped)
- [ ] No render-blocking third parties
- [ ] CLS < 0.1 (no layout shifts)
- [ ] FCP < 1.8s
- [ ] LCP < 2.5s
- [ ] TTI < 3.8s
- [ ] Performance metrics monitored

---

## Performance Targets

| Metric | Target | Method |
|--------|--------|--------|
| FCP | <1.8s | SSR + loading state |
| LCP | <2.5s | Image optimization + preload |
| CLS | <0.1 | Reserve space + font strategy |
| FID | <100ms | Code splitting + hydration |
| TTI | <3.8s | Bundle size optimization |

---

## Quick Wins (Easy Implementations)

1. ✅ Add `loading="lazy"` to all below-fold images (5 min)
2. ✅ Add `width`/`height` to all images (10 min)
3. ✅ Preload fonts in ssr.js (done - see ssr.js)
4. ✅ Enable compression middleware (done - see server/index.js)
5. ✅ Configure cache headers (done - see server/index.js)
6. Convert images to WebP (30 min)
7. Subset fonts to Latin (15 min)
8. Add web-vitals monitoring (20 min)

---

## Resources

- [Web.dev Performance Guide](https://web.dev/performance/)
- [Lighthouse Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)
- [Image Optimization](https://web.dev/use-images-correctly/)
- [Font Optimization](https://web.dev/defer-non-critical-css/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Core Web Vitals](https://web.dev/vitals/)
