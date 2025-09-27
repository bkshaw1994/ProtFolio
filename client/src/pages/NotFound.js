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

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 pt-20">
        <div className="container-custom text-center">
          <div className="max-w-md mx-auto">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="text-9xl font-bold text-primary-200">404</div>
              <div className="text-2xl font-semibold text-secondary-900 mb-2">
                Page Not Found
              </div>
              <p className="text-secondary-600">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            {/* Navigation Options */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="btn-primary group"
              >
                <Home size={20} className="mr-2" />
                Go Home
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="btn-outline group"
              >
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </button>
            </div>

            {/* Quick Links */}
            <div className="mt-8 pt-8 border-t border-secondary-200">
              <p className="text-sm text-secondary-600 mb-4">
                Or explore these sections:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link 
                  to="/about" 
                  className="text-primary-600 hover:text-primary-700 text-sm underline"
                >
                  About
                </Link>
                <Link 
                  to="/projects" 
                  className="text-primary-600 hover:text-primary-700 text-sm underline"
                >
                  Projects
                </Link>
                <Link 
                  to="/skills" 
                  className="text-primary-600 hover:text-primary-700 text-sm underline"
                >
                  Skills
                </Link>
                <Link 
                  to="/experience" 
                  className="text-primary-600 hover:text-primary-700 text-sm underline"
                >
                  Experience
                </Link>
                <Link 
                  to="/contact" 
                  className="text-primary-600 hover:text-primary-700 text-sm underline"
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
