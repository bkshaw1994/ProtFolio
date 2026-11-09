import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useGetProfileSummaryQuery } from '../../features/api/apiSlice';
import { getFileUrl } from '../../utils/apiUrl';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { data: profile } = useGetProfileSummaryQuery();

  const profileData = profile?.data || profile;

  // Handle scroll border / backdrop effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/experience', label: 'Experience' },
    { path: '/about', label: 'About' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-200 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-white/70 backdrop-blur-sm border-b border-slate-100'
      }`}
    >
      <div className="container-custom h-full">
        <div className="flex items-center justify-between h-full">
          {/* Minimalist Logo / Identity */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs tracking-tight transition-transform duration-200 group-hover:scale-105">
              {profileData?.profileImage ? (
                <img
                  src={getFileUrl(profileData.profileImage)}
                  alt={profileData.name || 'Profile'}
                  className="w-full h-full object-cover rounded-lg"
                  crossOrigin="anonymous"
                  width="32"
                  height="32"
                />
              ) : (
                profileData?.name ? profileData.name.charAt(0).toUpperCase() : 'B'
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-slate-900 tracking-tight leading-tight group-hover:text-slate-700 transition-colors">
                {profileData?.name || 'Bishal Kumar Shaw'}
              </span>
              <span className="text-[11px] text-slate-500 font-mono leading-none">
                Frontend Architect
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Linear-style clean text) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-colors duration-150 ${
                    active
                      ? 'text-slate-950 font-semibold bg-slate-100'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action - Single Focused CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              to="/contact?service=audit"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs group"
            >
              <span>Book Audit</span>
              <ArrowUpRight size={13} className="ml-1 text-slate-400 group-hover:text-white transition-colors" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      active
                        ? 'bg-slate-100 text-slate-950 font-semibold'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Link
                to="/contact?service=audit"
                className="w-full flex items-center justify-center py-2.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
              >
                <span>Book a 15-Min Audit</span>
                <ArrowUpRight size={14} className="ml-1" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
