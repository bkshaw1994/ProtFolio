import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Heart,
  Eye,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import {
  useGetProfileQuery,
  useGetVisitorCountQuery,
  useIncrementVisitorCountMutation
} from '../../features/api/apiSlice';

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

const Footer = () => {
  const { data: profile } = useGetProfileQuery();
  const { data: visitorData } = useGetVisitorCountQuery();
  const [incrementVisitorCount] = useIncrementVisitorCountMutation();
  const [hasTracked, setHasTracked] = useState(false);
  const currentYear = new Date().getFullYear();

  // Extract profile data
  const profileData = profile?.data || profile;

  // Social URLs
  const githubUrl = profileData?.socialLinks?.github || profileData?.github || 'https://github.com/bkshaw1994';
  const linkedinUrl = profileData?.socialLinks?.linkedin || profileData?.linkedin || 'https://www.linkedin.com/in/bkshaw1994';
  const mediumUrl = profileData?.medium || profileData?.socialLinks?.medium || profileData?.mediumUrl || 'https://medium.com/@bkshaw1994';
  const twitterUrl = profileData?.socialLinks?.twitter || profileData?.twitter;
  const instagramUrl = profileData?.socialLinks?.instagram || profileData?.instagram;
  const websiteUrl = profileData?.socialLinks?.portfolio || profileData?.website || profileData?.portfolio;

  // Track visitor on mount
  useEffect(() => {
    if (!hasTracked) {
      const trackVisit = async () => {
        try {
          const hasVisitedBefore = localStorage.getItem('hasVisited');
          const isUnique = !hasVisitedBefore;

          await incrementVisitorCount({ isUnique });

          if (!hasVisitedBefore) {
            localStorage.setItem('hasVisited', 'true');
          }
          setHasTracked(true);
        } catch (error) {
          console.error('Failed to track visit:', error);
        }
      };

      trackVisit();
    }
  }, [incrementVisitorCount, hasTracked]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/skills', label: 'Skills' },
    { path: '/experience', label: 'Experience' },
    { path: '/certifications', label: 'Certifications' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/contact', label: 'Contact' }
  ];

  const socialHandles = [
    { name: 'GitHub', url: githubUrl, icon: Github },
    { name: 'LinkedIn', url: linkedinUrl, icon: Linkedin },
    { name: 'Medium', url: mediumUrl, icon: MediumIcon },
    ...(twitterUrl ? [{ name: 'Twitter / X', url: twitterUrl, icon: Twitter }] : []),
    ...(instagramUrl ? [{ name: 'Instagram', url: instagramUrl, icon: Instagram }] : []),
    ...(websiteUrl ? [{ name: 'Website', url: websiteUrl, icon: Globe }] : [])
  ].filter((item) => Boolean(item.url));

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/60 pb-20 md:pb-0">
      <div className="container-custom">
        {/* Main Footer Row */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Brand & Headline Column (Spans 5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-md">
                {profileData?.name ? profileData.name.charAt(0).toUpperCase() : 'B'}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 tracking-tight">
                  {profileData?.name || 'Bishal Kumar Shaw'}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {profileData?.title || 'Senior Associate at Cognizant'}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Full-stack software developer with 9+ years of expertise in building scalable MERN web platforms, microservices, and cloud solutions.
            </p>

            {/* Quick Contact Line */}
            <div className="pt-1 flex flex-wrap gap-4 text-xs font-medium text-slate-400">
              {profileData?.email && (
                <a
                  href={`mailto:${profileData.email}`}
                  className="flex items-center space-x-1.5 hover:text-white transition-colors"
                >
                  <Mail size={14} className="text-slate-500" />
                  <span>{profileData.email}</span>
                </a>
              )}
              {profileData?.location && (
                <div className="flex items-center space-x-1.5">
                  <MapPin size={14} className="text-slate-500" />
                  <span>{profileData.location}</span>
                </div>
              )}
            </div>

            {/* Start a Project Button under About section */}
            <div className="pt-2">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center space-x-2 text-xs tracking-wider uppercase py-2.5 px-5 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Quick Navigation Column (Spans 3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="relative text-slate-400 hover:text-white transition-colors duration-200 group inline-block py-0.5"
                  >
                    <span>{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300 ease-out" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Handles Column (Spans 4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Social Media Handles
            </h4>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {socialHandles.map((handle) => {
                const IconComp = handle.icon;
                return (
                  <a
                    key={handle.name}
                    href={handle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 rounded-lg text-slate-300 hover:text-white transition-all text-xs font-medium group"
                  >
                    <div className="flex items-center space-x-2">
                      <IconComp size={15} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                      <span>{handle.name}</span>
                    </div>
                    <ArrowUpRight size={13} className="text-slate-500 group-hover:text-white transition-colors opacity-60 group-hover:opacity-100" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="py-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          <div>
            © {currentYear} {profileData?.name || 'Bishal Kumar Shaw'}. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            {visitorData?.data && (
              <div className="flex items-center space-x-1.5 text-slate-400">
                <Eye size={13} className="text-slate-400" />
                <span>
                  {visitorData.data.totalVisits.toLocaleString()} visits
                </span>
              </div>
            )}

            <div className="flex items-center space-x-1.5 text-slate-400">
              <span>Crafted with</span>
              <Heart size={14} className="text-rose-500 fill-rose-500/20 animate-pulse" />
              <span>using MERN</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
