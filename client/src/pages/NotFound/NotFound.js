import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Portfolio</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-white bg-dot-pattern pt-24 pb-16">
        <div className="container-custom text-center">
          <div className="max-w-md mx-auto bg-white p-8 sm:p-12 rounded-xl border border-slate-200 shadow-2xs">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="text-8xl sm:text-9xl font-mono font-bold text-slate-200 mb-2">404</div>
              <div className="text-2xl font-bold text-slate-950 mb-2">
                Page Not Found
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            {/* Navigation Options */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="btn-primary group"
              >
                <Home size={18} className="mr-2" />
                Go Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="btn-outline group"
              >
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </button>
            </div>

            {/* Quick Links */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider mb-4">
                Or explore these sections:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link
                  to="/about"
                  className="text-xs font-mono font-medium text-slate-700 hover:text-emerald-600 px-2 py-1 rounded bg-slate-50 border border-slate-200/60 transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/projects"
                  className="text-xs font-mono font-medium text-slate-700 hover:text-emerald-600 px-2 py-1 rounded bg-slate-50 border border-slate-200/60 transition-colors"
                >
                  Projects
                </Link>
                <Link
                  to="/skills"
                  className="text-xs font-mono font-medium text-slate-700 hover:text-emerald-600 px-2 py-1 rounded bg-slate-50 border border-slate-200/60 transition-colors"
                >
                  Skills
                </Link>
                <Link
                  to="/experience"
                  className="text-xs font-mono font-medium text-slate-700 hover:text-emerald-600 px-2 py-1 rounded bg-slate-50 border border-slate-200/60 transition-colors"
                >
                  Experience
                </Link>
                <Link
                  to="/contact"
                  className="text-xs font-mono font-medium text-slate-700 hover:text-emerald-600 px-2 py-1 rounded bg-slate-50 border border-slate-200/60 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
