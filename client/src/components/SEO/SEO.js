import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_SEO = {
  title: 'Bishal Kumar Shaw - Freelance MERN Stack Developer | Available for Hire',
  description:
    'Expert freelance full-stack developer with 9+ years of MERN stack experience. Available for hire for React.js, Node.js, MongoDB, Express.js, and custom web solutions. Bangalore, India.',
  keywords:
    'freelance developer, freelancer, hire developer, MERN stack developer, React developer, Node.js developer, MongoDB expert, Express.js developer, full stack developer for hire, web developer Bangalore, freelance programmer, hire MERN developer, Bishal Kumar Shaw, remote developer, contract developer, JavaScript developer',
  siteUrl: 'https://bishal-portfolio-chi.vercel.app',
  ogImage: 'https://bishal-portfolio-chi.vercel.app/og-image.jpg',
  author: 'Bishal Kumar Shaw',
  twitterHandle: '@bishalshaw'
};

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  schemaData
}) => {
  const seoTitle = title
    ? `${title} | Bishal Kumar Shaw`
    : DEFAULT_SEO.title;
  const seoDescription = description || DEFAULT_SEO.description;
  const seoKeywords = keywords || DEFAULT_SEO.keywords;
  const canonicalUrl = canonical
    ? `${DEFAULT_SEO.siteUrl}${canonical}`
    : DEFAULT_SEO.siteUrl;
  const imageUrl = ogImage || DEFAULT_SEO.ogImage;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={DEFAULT_SEO.author} />

      {/* Canonical Link */}
      <link rel="canonical" href={canonicalUrl} />

      {/* OpenGraph Meta Tags */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Bishal Kumar Shaw - Portfolio" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={DEFAULT_SEO.twitterHandle} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Schema.org Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
