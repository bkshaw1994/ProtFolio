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
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
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
            <div>
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
          <div className="flex items-center space-x-3">
            {isHome && profileData?.email && (
              <a
                href={`mailto:${profileData.email}`}
                className="hidden sm:flex p-2.5 text-slate-600 hover:text-primary-600 hover:bg-primary-50/80 rounded-xl transition-all duration-200"
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
                className="hidden sm:flex p-2.5 text-slate-600 hover:text-primary-600 hover:bg-primary-50/80 rounded-xl transition-all duration-200"
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
                className="hidden sm:flex p-2.5 text-slate-600 hover:text-primary-600 hover:bg-primary-50/80 rounded-xl transition-all duration-200"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            )}

            {!isHome && profileData?.resume && (
              <a
                href={getFileUrl(profileData.resume)}
                download
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition-all duration-200 font-medium text-xs tracking-wide"
                title="Download Resume"
              >
                <Download size={15} />
                <span className="hidden sm:inline">Resume</span>
              </a>
            )}

            <Link to="/contact" className="btn-primary !px-4 sm:!px-5 !py-2 sm:!py-2.5 !text-xs tracking-wider uppercase ml-1">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
