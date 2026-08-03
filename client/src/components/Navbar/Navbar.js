import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Download } from 'lucide-react';
import { useGetProfileSummaryQuery } from '../../features/api/apiSlice';
import { getFileUrl } from '../../utils/apiUrl';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { data: profile } = useGetProfileSummaryQuery();

  // Extract profile data
  const profileData = profile?.data || profile;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/skills', label: 'Skills' },
    { path: '/experience', label: 'Experience' },
    { path: '/certifications', label: 'Certifications' },
    { path: '/about', label: 'About' }
  ];

  const isActive = (path) => location.pathname === path;
  const isHome = location.pathname === '/';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-md border-b border-slate-200/50 py-1'
          : 'bg-white/60 backdrop-blur-sm border-b border-transparent py-2'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary-600 via-primary-500 to-indigo-600 rounded-xl overflow-hidden flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary-500/20 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300">
                {profileData?.profileImage ? (
                  <img
                    src={getFileUrl(profileData.profileImage)}
                    alt={profileData.name || 'Profile'}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                    decoding="async"
                    width="40"
                    height="40"
                    onError={(e) => {
                      console.error('Image load error:', {
                        src: e.target.src,
                        profileImage: profileData.profileImage,
                        constructedUrl: getFileUrl(profileData.profileImage)
                      });
                    }}
                  />
                ) : profileData?.name ? (
                  profileData.name.charAt(0).toUpperCase()
                ) : (
                  'P'
                )}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-base text-slate-900 tracking-tight group-hover:text-primary-600 transition-colors">
                {profileData?.name || 'Portfolio'}
              </div>
              <div className="text-xs text-slate-500 font-medium -mt-0.5">
                {profileData?.title || 'Full Stack Developer'}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 backdrop-blur-md relative">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors duration-200 z-10 select-none ${
                    active
                      ? 'text-primary-600 font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNavbarPill"
                      className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-200/40 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Contact Info & Social Links */}
          <div className="hidden lg:flex items-center space-x-3">
            {isHome && profileData?.email && (
              <a
                href={`mailto:${profileData.email}`}
                className="p-2.5 text-slate-600 hover:text-primary-600 hover:bg-primary-50/80 rounded-xl transition-all duration-200"
                title="Email"
              >
                <Mail size={18} />
              </a>
            )}

            {isHome && profileData?.socialLinks?.github && (
              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-600 hover:text-primary-600 hover:bg-primary-50/80 rounded-xl transition-all duration-200"
                title="GitHub"
              >
                <Github size={18} />
              </a>
            )}

            {isHome && profileData?.socialLinks?.linkedin && (
              <a
                href={profileData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-slate-600 hover:text-primary-600 hover:bg-primary-50/80 rounded-xl transition-all duration-200"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            )}

            {!isHome && profileData?.resume && (
              <a
                href={getFileUrl(profileData.resume)}
                download
                className="flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition-all duration-200 font-medium text-xs tracking-wide"
                title="Download Resume"
              >
                <Download size={15} />
                <span>Resume</span>
              </a>
            )}

            <Link to="/contact" className="btn-primary !px-5 !py-2.5 !text-xs tracking-wider uppercase ml-1">
              Contact Me
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-primary-600 hover:bg-slate-100 rounded-xl transition-all duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 px-2 border-t border-slate-200/60 bg-white/95 backdrop-blur-lg rounded-b-2xl shadow-xl mt-2 animate-fade-in">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 z-10 ${
                      active
                        ? 'text-primary-600 font-bold'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="activeMobileNavbarPill"
                        className="absolute inset-0 bg-primary-50 border border-primary-200/50 rounded-xl -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}

              {/* Mobile Contact */}
              <div className="pt-4 border-t border-slate-100 mt-2 space-y-3">
                <Link
                  to="/contact"
                  className="btn-primary w-full justify-center text-xs tracking-wider uppercase py-3"
                >
                  Contact Me
                </Link>

                {!isHome && profileData?.resume && (
                  <a
                    href={getFileUrl(profileData.resume)}
                    download
                    className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition-all duration-200 font-medium text-xs tracking-wide w-full"
                  >
                    <Download size={16} />
                    <span>Download Resume</span>
                  </a>
                )}

                <div className="flex items-center justify-center space-x-6 pt-2">
                  {profileData?.email && (
                    <a
                      href={`mailto:${profileData.email}`}
                      className="p-2 text-slate-600 hover:text-primary-600 rounded-xl transition-colors"
                    >
                      <Mail size={20} />
                    </a>
                  )}

                  {isHome && profileData?.socialLinks?.github && (
                    <a
                      href={profileData.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-600 hover:text-primary-600 rounded-xl transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  )}

                  {isHome && profileData?.socialLinks?.linkedin && (
                    <a
                      href={profileData.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-600 hover:text-primary-600 rounded-xl transition-colors"
                    >
                      <Linkedin size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
