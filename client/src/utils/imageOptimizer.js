/**
 * Image Optimization Utilities
 * Provides components and helpers for optimized image delivery
 */

import React from 'react';

/**
 * Generate responsive image component with WebP support
 * @param {Object} props
 * @param {string} props.src - Base image path (without extension)
 * @param {string} props.alt - Alt text for accessibility
 * @param {number} props.width - Intrinsic width (prevents CLS)
 * @param {number} props.height - Intrinsic height (prevents CLS)
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.priority - If true, uses eager loading
 * @returns {JSX.Element}
 */
export const OptimizedImage = ({
  src,
  alt,
  width = 1200,
  height = 630,
  className = '',
  priority = false
}) => {
  const loading = priority ? 'eager' : 'lazy';
  const decoding = priority ? 'auto' : 'async';

  return (
    <picture>
      {/* WebP format for modern browsers (25-35% smaller) */}
      <source srcSet={`${src}.webp`} type="image/webp" />

      {/* JPEG fallback for older browsers */}
      <img
        src={`${src}.jpg`}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        decoding={decoding}
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
 * Responsive image with srcset for multiple breakpoints
 * @param {Object} props
 * @param {string} props.src - Base image path (without extension)
 * @param {string} props.alt - Alt text
 * @param {number} props.width - Intrinsic width
 * @param {number} props.height - Intrinsic height
 * @param {boolean} props.priority - Priority loading
 * @param {string} props.className - CSS classes
 * @returns {JSX.Element}
 */
export const ResponsiveImage = ({
  src,
  alt,
  width = 1200,
  height = 630,
  priority = false,
  className = ''
}) => {
  const loading = priority ? 'eager' : 'lazy';
  const decoding = priority ? 'auto' : 'async';

  return (
    <picture>
      {/* WebP with responsive sizes */}
      <source
        srcSet={`
          ${src}-480w.webp 480w,
          ${src}-1200w.webp 1200w
        `}
        type="image/webp"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
      />

      {/* JPEG with responsive sizes */}
      <source
        srcSet={`
          ${src}-480w.jpg 480w,
          ${src}-1200w.jpg 1200w
        `}
        type="image/jpeg"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
      />

      {/* Fallback image */}
      <img
        src={`${src}-800w.jpg`}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        decoding={decoding}
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
 * Generate srcset string for responsive images
 * @param {string} basePath - Base image path without extension
 * @param {Array} sizes - Array of widths (e.g., [480, 800, 1200])
 * @returns {string} - srcset attribute value
 */
export const generateSrcSet = (basePath, sizes = [480, 800, 1200]) => {
  return sizes
    .map(size => `${basePath}-${size}w.jpg ${size}w`)
    .join(', ');
};

/**
 * Generate srcset with WebP support
 * @param {string} basePath - Base image path
 * @param {Array} sizes - Array of widths
 * @returns {Object} - Object with jpg and webp srcsets
 */
export const generateResponsiveSrcSet = (basePath, sizes = [480, 800, 1200]) => {
  return {
    jpg: sizes.map(size => `${basePath}-${size}w.jpg ${size}w`).join(', '),
    webp: sizes.map(size => `${basePath}-${size}w.webp ${size}w`).join(', ')
  };
};

/**
 * Generate sizes attribute for responsive images
 * @param {Object} breakpoints - Breakpoint configuration
 * @returns {string} - sizes attribute value
 */
export const generateSizes = (breakpoints = {}) => {
  const defaults = {
    mobile: '100vw',      // Full width on mobile
    tablet: '80vw',       // 80% on tablet
    desktop: '70vw'       // 70% on desktop
  };

  const bp = { ...defaults, ...breakpoints };

  return `
    (max-width: 768px) ${bp.mobile},
    (max-width: 1024px) ${bp.tablet},
    ${bp.desktop}
  `.trim();
};

/**
 * Hero image component (priority loading)
 * Optimized for above-the-fold large images
 */
export const HeroImage = ({
  src,
  alt,
  className = ''
}) => {
  return (
    <picture>
      <source
        srcSet={`
          ${src}-480w.webp 480w,
          ${src}-1200w.webp 1200w,
          ${src}-2000w.webp 2000w
        `}
        type="image/webp"
        sizes="100vw"
      />
      <source
        srcSet={`
          ${src}-480w.jpg 480w,
          ${src}-1200w.jpg 1200w,
          ${src}-2000w.jpg 2000w
        `}
        type="image/jpeg"
        sizes="100vw"
      />
      <img
        src={`${src}-1200w.jpg`}
        alt={alt}
        loading="eager"
        decoding="auto"
        className={className}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block'
        }}
      />
    </picture>
  );
};

/**
 * Thumbnail image component (lazy loading)
 * For smaller images, cards, etc.
 */
export const ThumbnailImage = ({
  src,
  alt,
  className = ''
}) => {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img
        src={`${src}.jpg`}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
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
 * Avatar component (small circular image)
 */
export const AvatarImage = ({
  src,
  alt,
  size = 48,
  className = ''
}) => {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img
        src={`${src}.jpg`}
        alt={alt}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className={className}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          objectFit: 'cover',
          display: 'block'
        }}
      />
    </picture>
  );
};

/**
 * Background image component
 * For CSS background-image with responsive sizes
 */
export const BackgroundImage = ({
  src,
  alt = 'Background',
  children,
  className = ''
}) => {
  return (
    <div
      className={className}
      style={{
        backgroundImage: `url('${src}.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      {/* Fallback image for no-css browsers */}
      <noscript>
        <img
          src={`${src}.jpg`}
          alt={alt}
          style={{ width: '100%', height: 'auto' }}
        />
      </noscript>
      {children}
    </div>
  );
};

/**
 * Fallback image placeholder
 * Shows while image is loading
 */
export const ImageWithFallback = ({
  src,
  alt,
  fallback,
  width,
  height,
  className = ''
}) => {
  const [imageSrc, setImageSrc] = React.useState(src);

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setImageSrc(fallback)}
      style={{
        maxWidth: '100%',
        height: 'auto'
      }}
    />
  );
};

/**
 * Lazy load image with IntersectionObserver
 * Useful for images that might not be visible
 */
export const LazyImage = ({ src, alt, className = '', placeholder }) => {
  const [imageSrc, setImageSrc] = React.useState(placeholder || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E');
  const imageRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.unobserve(entry.target);
        }
      });
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      style={{
        maxWidth: '100%',
        height: 'auto'
      }}
    />
  );
};

export default {
  OptimizedImage,
  ResponsiveImage,
  HeroImage,
  ThumbnailImage,
  AvatarImage,
  BackgroundImage,
  ImageWithFallback,
  LazyImage,
  generateSrcSet,
  generateResponsiveSrcSet,
  generateSizes
};
