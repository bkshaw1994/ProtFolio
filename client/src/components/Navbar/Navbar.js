import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { useGetProfileSummaryQuery } from '../../features/api/apiSlice';
import { getFileUrl } from '../../utils/apiUrl';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { data: profile } = useGetProfileSummaryQuery();

  // Extract profile data
  const profileData = profile?.data || profile;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-shadow duration-200 ${
        scrolled ? 'shadow-xs' : ''
      }`}
    >
      <div className="container-custom h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-slate-900 text-white overflow-hidden flex items-center justify-center font-bold text-sm tracking-tight border border-slate-300 transition-transform duration-200 group-hover:scale-105">
                {profileData?.profileImage ? (
                  <img
                    src={getFileUrl(profileData.profileImage)}
                    alt={profileData.name || 'Profile'}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                    decoding="async"
                    width="36"
                    height="36"
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
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 tracking-tight group-hover:text-slate-700 transition-colors leading-tight">
                {profileData?.name || 'Portfolio'}
              </div>
              <div className="text-xs text-slate-500 font-mono leading-none mt-0.5">
                {profileData?.title || 'Full Stack Developer'}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/90 p-1 rounded-lg border border-slate-200/80">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 rounded-md text-xs font-medium tracking-wide transition-colors duration-150 z-10 select-none ${
                    active
                      ? 'text-slate-950 font-semibold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNavbarPill"
                      className="absolute inset-0 bg-white rounded-md shadow-2xs border border-slate-200/60 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Contact Info & Social Links */}
          <div className="flex items-center space-x-2">
            {isHome && profileData?.email && (
              <a
                href={`mailto:${profileData.email}`}
                className="hidden sm:flex p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors duration-150"
                title="Email"
              >
                <Mail size={16} />
              </a>
            )}

            {isHome && profileData?.socialLinks?.github && (
              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors duration-150"
                title="GitHub"
              >
                <Github size={16} />
              </a>
            )}

            {isHome && profileData?.socialLinks?.linkedin && (
              <a
                href={profileData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors duration-150"
                title="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            )}

            {!isHome && profileData?.resume && (
              <a
                href={getFileUrl(profileData.resume)}
                download
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors duration-150 font-mono text-xs font-medium"
                title="Download Resume"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Resume</span>
              </a>
            )}

            <Link
              to="/contact"
              className="btn-primary !px-4 !py-2 !text-xs tracking-wider uppercase ml-1 font-mono"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
