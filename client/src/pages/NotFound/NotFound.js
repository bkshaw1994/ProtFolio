import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Home, Compass } from 'lucide-react';

const NotFound = () => {
  const quickLinks = [
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/services', label: 'Services & Sprints' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
    { path: '/experience', label: 'Experience' },
    { path: '/contact', label: 'Contact' }
  ];

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found · Bishal Shaw</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-white text-slate-900 pt-24 sm:pt-28 pb-16 px-4">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-mono text-xs mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>404_PAGE_NOT_FOUND</span>
          </div>

          <div className="font-mono text-7xl sm:text-8xl font-black text-slate-950 tracking-tight mb-2">
            404
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            Page Not Found
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-8 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved to a new route.
          </p>

          {/* Navigation Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              to="/"
              className="btn-primary text-xs font-mono py-2.5 inline-flex items-center justify-center gap-1.5"
            >
              <Home size={14} />
              <span>Go Home</span>
            </Link>

            <button
              onClick={handleGoBack}
              className="btn-secondary text-xs font-mono py-2.5 inline-flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={14} />
              <span>Go Back</span>
            </button>
          </div>

          {/* Direct Route Links */}
          <div className="pt-6 border-t border-slate-200">
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-center gap-1.5">
              <Compass size={13} />
              <span>Direct Routing Options:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 hover:text-slate-950 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
