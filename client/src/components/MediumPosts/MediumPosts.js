import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Clock, Calendar, BookOpen, ChevronDown } from 'lucide-react';
import { useGetMediumPostsQuery } from '../../features/api/apiSlice';

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
    readTime: '6 min read'
  },
  {
    id: 'post-2',
    title: 'What is CI/CD? Understanding CI vs CD and Modern Workflows',
    link: 'https://medium.com/@bkshaw1994',
    pubDate: '2026-07-22',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*k_aRRDA15zXc1IG-_2To_w.png',
    description: 'Understanding CI vs CD, benefits, popular deployment tools, and how to implement zero-downtime CI/CD pipelines in any project.',
    categories: ['DevOps', 'CI/CD', 'Docker'],
    readTime: '7 min read'
  },
  {
    id: 'post-3',
    title: 'React.memo vs useMemo — The Difference Every React Developer Should Know',
    link: 'https://medium.com/@bkshaw1994',
    pubDate: '2026-05-21',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*Z4_jp7tu64AhnNuHzoLNiA.png',
    description: 'If you have worked with React performance optimization, learn when to use React.memo vs useMemo and prevent common pitfalls.',
    categories: ['React', 'JavaScript', 'Frontend'],
    readTime: '4 min read'
  }
];

const MediumPosts = ({ limit = null, isHomePage = false }) => {
  const { data: response, isLoading } = useGetMediumPostsQuery();
  const [showAll, setShowAll] = useState(false);

  const posts = response?.data && response.data.length > 0 ? response.data : FALLBACK_POSTS;
  const profileUrl = response?.profileUrl || 'https://medium.com/@bkshaw1994';

  const effectiveLimit = limit || 3;
  const visiblePosts = isHomePage
    ? posts.slice(0, effectiveLimit)
    : (showAll ? posts : posts.slice(0, effectiveLimit));

  return (
    <section className={`section-padding ${isHomePage ? 'bg-indigo-50/40' : 'bg-slate-50/50'} relative overflow-hidden`} id="blogs">
      <div className="container-custom relative z-10">

        {/* Section Header */}
        {isHomePage ? (
          /* Clean Native Home Section Header - No Medium Profile Link */
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Latest Articles
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-normal">
              Technical insights, system architecture deep dives, and software engineering articles.
            </p>
          </div>
        ) : (
          /* Full Standalone Blogs Page Header - Includes Medium Profile Button */
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-600 border border-primary-100 mb-3">
                <BookOpen size={14} />
                <span>Medium Technical Publications</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                Blogs & Articles
              </h1>
              <p className="text-slate-600 text-base max-w-2xl mt-2 font-normal">
                Deep dives into software engineering, system architecture, MERN stack development, and DevOps practices published on Medium.
              </p>
            </div>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-2.5 self-start md:self-auto text-xs uppercase tracking-wider font-bold py-3 px-5 rounded-xl bg-white text-slate-700 border border-slate-300 hover:bg-primary-600 hover:text-white hover:border-primary-600 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <MediumIcon size={18} className="text-primary-600 group-hover:text-white transition-colors" />
              <span className="group-hover:text-white transition-colors">Medium Profile</span>
              <ArrowUpRight size={15} className="text-slate-500 group-hover:text-white transition-colors" />
            </a>
          </div>
        )}

        {/* Minimal Cards Grid */}
        {visiblePosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visiblePosts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-card hover:shadow-xl hover:border-primary-500/40 hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Clean Image Banner */}
                <Link to={`/blogs/${post.id}`} className="relative h-44 w-full overflow-hidden bg-slate-100 border-b border-slate-100 block">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />

                  {/* Read Time Crisp Badge */}
                  <div className="absolute top-3 left-3 inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-white text-slate-800 text-[11px] font-bold rounded-lg border border-slate-200 shadow-sm">
                    <Clock size={12} className="text-primary-600" />
                    <span>{post.readTime}</span>
                  </div>
                </Link>

                {/* Minimal Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    {/* Category Tag */}
                    {post.categories && post.categories.length > 0 && (
                      <span className="inline-block px-2.5 py-0.5 bg-primary-50 text-primary-700 rounded-md text-[11px] font-bold uppercase tracking-wider border border-primary-100">
                        {post.categories[0]}
                      </span>
                    )}

                    {/* Article Title */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-600 transition-colors leading-snug line-clamp-2">
                      <Link to={`/blogs/${post.id}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Article Snippet */}
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <div className="flex items-center space-x-1 text-slate-500">
                      <Calendar size={13} className="text-slate-400" />
                      <span>{post.pubDate}</span>
                    </div>

                    <Link
                      to={`/blogs/${post.id}`}
                      className="inline-flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-bold group/link"
                    >
                      <span>Read Article</span>
                      <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom Actions */}
        {posts.length > 0 && (
          <div className="mt-10 text-center">
            {isHomePage ? (
              <Link
                to="/blogs"
                className="btn-primary group inline-flex items-center space-x-2 text-xs tracking-wider uppercase py-3 px-8 rounded-xl shadow-md shadow-primary-500/20 font-bold"
              >
                <span>View All Blogs</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              posts.length > 3 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="btn-primary inline-flex items-center space-x-2 text-xs tracking-wider uppercase py-3 px-7 rounded-xl font-bold"
                >
                  <span>{showAll ? 'Show Featured Only' : `View All Articles (${posts.length})`}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}
                  />
                </button>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MediumPosts;
