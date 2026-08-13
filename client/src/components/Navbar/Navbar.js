import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  FolderGit2,
  Cpu,
  Briefcase,
  BookOpen,
  Award,
  User,
  Github,
  Linkedin,
  Download
} from 'lucide-react';
import { useGetProfileSummaryQuery } from '../../features/api/apiSlice';
import { getFileUrl } from '../../utils/apiUrl';

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

// Dynamic Favicon SVGs per Route
const ROUTE_FAVICONS = {
  '/': `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="30" fill="%233b82f6"/><path d="M30 50L45 65L70 35" stroke="white" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  '/projects': `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="30" fill="%236366f1"/><path d="M25 35h50v40H25zM25 35l15-10h20l15 10" stroke="white" stroke-width="8" fill="none"/></svg>`,
  '/skills': `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="30" fill="%2306b6d4"/><rect x="30" y="30" width="40" height="40" rx="8" fill="white"/><path d="M50 15v15M50 70v15M15 50h15M70 50h15" stroke="white" stroke-width="8" stroke-linecap="round"/></svg>`,
  '/experience': `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="30" fill="%238b5cf6"/><rect x="25" y="40" width="50" height="35" rx="6" fill="white"/><path d="M38 40V30a12 12 0 0124 0v10" stroke="white" stroke-width="8" fill="none"/></svg>`,
  '/blogs': `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="30" fill="%23ec4899"/><path d="M25 30h50M25 48h50M25 66h35" stroke="white" stroke-width="8" stroke-linecap="round"/></svg>`,
  '/certifications': `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="30" fill="%23f59e0b"/><polygon points="50,20 60,40 82,42 65,58 71,80 50,67 29,80 35,58 18,42 40,40" fill="white"/></svg>`,
  '/about': `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="30" fill="%2310b981"/><circle cx="50" cy="40" r="16" fill="white"/><path d="M25 75c0-14 11-22 25-22s25 8 25 22" stroke="white" stroke-width="8" fill="none"/></svg>`,
  '/contact': `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="30" fill="%233b82f6"/><rect x="20" y="30" width="60" height="40" rx="6" fill="white"/><path d="M20 35l30 22 30-22" stroke="%233b82f6" stroke-width="6" fill="none"/></svg>`
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { data: profile } = useGetProfileSummaryQuery();

  // Extract profile data
  const profileData = profile?.data || profile;
  const mediumUrl = profileData?.medium || profileData?.socialLinks?.medium || profileData?.mediumUrl;

  // Dynamically update browser tab favicon on route change
  useEffect(() => {
    let svgIcon = ROUTE_FAVICONS[location.pathname];
    if (!svgIcon && location.pathname.startsWith('/blogs')) svgIcon = ROUTE_FAVICONS['/blogs'];
    if (!svgIcon && location.pathname.startsWith('/projects')) svgIcon = ROUTE_FAVICONS['/projects'];
    if (!svgIcon) svgIcon = ROUTE_FAVICONS['/'];

    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.type = 'image/svg+xml';
    link.href = svgIcon;
  }, [location.pathname]);

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
    { path: '/', label: 'Home', Icon: Home },
    { path: '/projects', label: 'Projects', Icon: FolderGit2 },
    { path: '/skills', label: 'Skills', Icon: Cpu },
    { path: '/experience', label: 'Experience', Icon: Briefcase },
    { path: '/blogs', label: 'Blogs', Icon: BookOpen },
    { path: '/certifications', label: 'Certifications', Icon: Award },
    { path: '/about', label: 'About', Icon: User }
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

          {/* Desktop Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 backdrop-blur-md relative">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 z-10 select-none ${
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
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Contact Info & Social Links */}
          <div className="flex items-center space-x-3">
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

            {isHome && mediumUrl && (
              <a
                href={mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex p-2.5 text-slate-600 hover:text-primary-600 hover:bg-primary-50/80 rounded-xl transition-all duration-200"
                title="Medium"
              >
                <MediumIcon size={18} />
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
