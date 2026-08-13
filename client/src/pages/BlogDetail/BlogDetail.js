import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Calendar, ExternalLink, Tag, BookOpen } from 'lucide-react';
import { useGetMediumPostsQuery } from '../../features/api/apiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

// Medium Icon Component
const MediumIcon = ({ size = 18, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const FALLBACK_POSTS = [
  {
    id: 'post-1',
    title: 'The Ultimate Guide to Web Rendering: CSR, SSR, SSG, and ISR Explained',
    link: 'https://medium.com/@bkshaw1994',
    pubDate: '2026-08-07',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*MHnO6XS8XABfIdZF6Ha7vg.png',
    description: 'Choosing the right rendering strategy is crucial for your app’s success. Deep dive into modern JavaScript frameworks and server side rendering.',
    categories: ['Web Architecture', 'SSR', 'React'],
    readTime: '6 min read',
    content: `<p>Choosing the right rendering strategy is crucial for your application’s performance, SEO success, and user experience. In modern web development, rendering modes have evolved far beyond basic Client-Side Rendering.</p><h3>Client-Side Rendering (CSR)</h3><p>With CSR, the browser downloads a minimal HTML wrapper and JavaScript bundle, executing React/Vue scripts dynamically in the client browser. Great for rich interactive dashboards, but carries initial loading overhead.</p><h3>Server-Side Rendering (SSR)</h3><p>SSR generates HTML dynamically per request on a Node.js server. Pages load instantly with pre-rendered content, improving SEO and initial render speeds significantly.</p><h3>Static Site Generation (SSG) & Incremental Static Regeneration (ISR)</h3><p>SSG pre-builds HTML at build time. ISR takes this further by regenerating static pages asynchronously in the background as new requests arrive, offering static speed with dynamic updates.</p>`
  },
  {
    id: 'post-2',
    title: 'What is CI/CD? Understanding CI vs CD and Modern Workflows',
    link: 'https://medium.com/@bkshaw1994',
    pubDate: '2026-07-22',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*k_aRRDA15zXc1IG-_2To_w.png',
    description: 'Understanding CI vs CD, benefits, popular deployment tools, and how to implement zero-downtime CI/CD pipelines in any project.',
    categories: ['DevOps', 'CI/CD', 'Docker'],
    readTime: '7 min read',
    content: `<p>Continuous Integration (CI) and Continuous Deployment (CD) form the bedrock of modern software engineering and DevOps automation.</p><h3>Continuous Integration (CI)</h3><p>Developers frequently commit code to a shared repository where automated unit tests, linters, and integration checks validate changes immediately, preventing integration hell.</p><h3>Continuous Delivery vs Continuous Deployment (CD)</h3><p>Continuous Delivery ensures code is always buildable and staging-ready. Continuous Deployment automatically pushes verified builds to production environments without manual intervention.</p>`
  },
  {
    id: 'post-3',
    title: 'React.memo vs useMemo — The Difference Every React Developer Should Know',
    link: 'https://medium.com/@bkshaw1994',
    pubDate: '2026-05-21',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*Z4_jp7tu64AhnNuHzoLNiA.png',
    description: 'If you have worked with React performance optimization, learn when to use React.memo vs useMemo and prevent common pitfalls.',
    categories: ['React', 'JavaScript', 'Frontend'],
    readTime: '4 min read',
    content: `<p>React developers often confuse <strong>React.memo</strong> and <strong>useMemo</strong> when optimizing render cycles.</p><h3>React.memo</h3><p>React.memo is a Higher-Order Component (HOC) that memoizes component re-renders by shallowly comparing incoming props.</p><h3>useMemo</h3><p>useMemo is a React Hook that memoizes the computed result of an expensive calculation inside a component during render cycles.</p>`
  }
];

/**
 * Strips all duplicate top images, figures, and topic headings embedded inside Medium RSS HTML content
 */
const getCleanedContent = (htmlContent, thumbnail, title) => {
  if (!htmlContent) return '';
  let cleaned = htmlContent;

  // 1. Remove all figures/images that appear before the first paragraph (<p>)
  const firstPIndex = cleaned.search(/<p[\s>]/i);
  if (firstPIndex !== -1) {
    const topPart = cleaned.slice(0, firstPIndex);
    const bodyPart = cleaned.slice(firstPIndex);

    const cleanedTop = topPart
      .replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '')
      .replace(/<img[^>]*>/gi, '')
      .replace(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/gi, '');

    cleaned = cleanedTop + bodyPart;
  } else {
    // If no <p> tag, strip leading figures, images, and h1-h4 title headings
    cleaned = cleaned
      .replace(/^\s*(<figure[^>]*>[\s\S]*?<\/figure>|<img[^>]*>)+/gi, '')
      .replace(/^\s*<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/gi, '');
  }

  // 2. Remove any img matching thumbnail URL anywhere in content
  if (thumbnail && typeof thumbnail === 'string') {
    const thumbFilename = thumbnail.split('/').pop().split('?')[0];
    if (thumbFilename && thumbFilename.length > 4) {
      const figureRegex = new RegExp(`<figure[^>]*>[\\s\\S]*?<img[^>]*${thumbFilename}[^>]*>[\\s\\S]*?<\\/figure>`, 'gi');
      cleaned = cleaned.replace(figureRegex, '');
      const imgRegex = new RegExp(`<img[^>]*${thumbFilename}[^>]*>`, 'gi');
      cleaned = cleaned.replace(imgRegex, '');
    }
  }

  return cleaned.trim();
};

const BlogDetail = () => {
  const { id } = useParams();
  const { data: response, isLoading } = useGetMediumPostsQuery();

  const posts = response?.data && response.data.length > 0 ? response.data : FALLBACK_POSTS;
  const decodedId = decodeURIComponent(id);

  // Find target post consistently across string IDs, GUIDs, and URL slugs
  const post = posts.find(
    (p) =>
      p.id === id ||
      p.id === decodedId ||
      String(p.id).includes(id) ||
      (p.link && p.link.includes(id)) ||
      (p.guid && p.guid.includes(id))
  ) || posts[0];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const cleanedContent = getCleanedContent(post.content, post.thumbnail, post.title);

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Bishal Kumar Shaw`}</title>
        <meta name="description" content={post.description} />
      </Helmet>

      <article className="min-h-screen bg-slate-50/50 pt-24 sm:pt-28 pb-20">
        <div className="container-custom max-w-4xl mx-auto">
          
          {/* Top Navigation */}
          <div className="mb-8">
            <Link
              to="/blogs"
              className="inline-flex items-center space-x-2 text-slate-600 hover:text-primary-600 font-semibold text-sm transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to all articles</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="space-y-6 mb-10">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-3">
              {post.categories && post.categories.map((cat, i) => (
                <span
                  key={i}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-bold uppercase tracking-wider border border-primary-100"
                >
                  <Tag size={12} className="mr-1" />
                  {cat}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Author & Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200 text-sm text-slate-600 font-medium">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1.5">
                  <Calendar size={15} className="text-slate-400" />
                  <span>{post.pubDate}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1.5">
                  <Clock size={15} className="text-primary-600" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Read on Medium Button */}
              {post.link && (
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-2 text-xs font-bold uppercase py-2 px-4 rounded-xl bg-white text-slate-700 border border-slate-300 hover:bg-primary-600 hover:text-white hover:border-primary-600 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <MediumIcon size={16} className="text-slate-700 group-hover:text-white transition-colors" />
                  <span className="group-hover:text-white transition-colors">Read on Medium</span>
                  <ExternalLink size={14} className="text-slate-500 group-hover:text-white transition-colors" />
                </a>
              )}
            </div>
          </header>

          {/* Single Featured Banner Image */}
          {post.thumbnail && (
            <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg mb-10 bg-slate-100 border border-slate-200">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>
          )}

          {/* Article Main Body Content */}
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
            
            {/* Clean Content without duplicate top image or duplicate title */}
            {cleanedContent ? (
              <div
                className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-primary-600 prose-img:rounded-xl space-y-4"
                dangerouslySetInnerHTML={{ __html: cleanedContent }}
              />
            ) : (
              <p className="text-slate-700">{post.description}</p>
            )}

            {/* Read on Medium Callout Banner */}
            {post.link && (
              <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-primary-300">
                    <BookOpen size={15} />
                    <span>Original Publication</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white">Enjoying this article?</h3>
                  <p className="text-slate-300 text-sm max-w-md">
                    Read, clap, and bookmark this article directly on Medium for the original formatting and community responses.
                  </p>
                </div>

                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary group flex-shrink-0 inline-flex items-center space-x-2 py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white shadow-lg shadow-primary-500/20 hover:scale-105 transition-transform"
                >
                  <MediumIcon size={18} className="text-white" />
                  <span className="text-white">Read on Medium</span>
                  <ExternalLink size={16} className="text-white group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            )}
          </div>

          {/* Bottom Back Button */}
          <div className="mt-10 text-center">
            <Link
              to="/blogs"
              className="btn-outline inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-bold py-3 px-6 rounded-xl"
            >
              <ArrowLeft size={16} />
              <span>Back to all articles</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogDetail;
