import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  FileText,
  ArrowUpRight
} from 'lucide-react';
import {
  useGetProfileQuery,
  useIncrementVisitorCountMutation
} from '../../features/api/apiSlice';
import { getFileUrl } from '../../utils/apiUrl';

const Footer = () => {
  const { data: profile } = useGetProfileQuery();
  const [incrementVisitorCount] = useIncrementVisitorCountMutation();
  const [hasTracked, setHasTracked] = useState(false);
  const currentYear = new Date().getFullYear();

  const profileData = profile?.data || profile;

  // Track visitor quietly in the background without displaying a retro hit counter
  useEffect(() => {
    if (!hasTracked) {
      const trackVisit = async () => {
        try {
          const hasVisitedBefore = localStorage.getItem('hasVisited');
          const isUnique = !hasVisitedBefore;

          await incrementVisitorCount({ isUnique });

          if (isUnique) {
            localStorage.setItem('hasVisited', 'true');
          }

          setHasTracked(true);
        } catch (error) {
          console.error('Failed to track visitor:', error);
        }
      };

      trackVisit();
    }
  }, [hasTracked, incrementVisitorCount]);

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/case-studies', label: 'Case Studies' },
    { path: '/services', label: 'Services & Sprints' },
    { path: '/projects', label: 'All Projects' },
    { path: '/experience', label: 'Experience' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Value Statement (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white font-bold text-xs tracking-tight">
                {profileData?.name ? profileData.name.charAt(0).toUpperCase() : 'B'}
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight text-white">
                  {profileData?.name || 'Bishal Kumar Shaw'}
                </h3>
                <p className="text-slate-400 text-xs font-mono">
                  Senior Frontend & Full-Stack Architect
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed font-normal">
              Specialized in sub-second Core Web Vitals, Next.js architecture, and high-velocity MVP sprints for Seed-to-Series-A startups and high-growth brands.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Select Q1/Q2 Contracts</span>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Navigation
            </div>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-slate-400 hover:text-white transition-colors text-xs font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect & Social (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Direct Channels
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              {profileData?.email && (
                <div className="flex items-center space-x-2.5">
                  <Mail size={14} className="text-slate-400 flex-shrink-0" />
                  <a
                    href={`mailto:${profileData.email}`}
                    className="hover:text-white transition-colors font-mono"
                  >
                    {profileData.email}
                  </a>
                </div>
              )}

              {profileData?.location && (
                <div className="flex items-center space-x-2.5 text-slate-400">
                  <MapPin size={14} className="text-slate-400 flex-shrink-0" />
                  <span>{profileData.location} (Remote Worldwide)</span>
                </div>
              )}
            </div>

            {/* Social / External Links */}
            <div className="flex items-center gap-2.5 pt-2">
              {profileData?.socialLinks?.github && (
                <a
                  href={profileData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  <Github size={13} />
                  <span>GitHub</span>
                </a>
              )}

              {profileData?.socialLinks?.linkedin && (
                <a
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  <Linkedin size={13} />
                  <span>LinkedIn</span>
                </a>
              )}

              {profileData?.resume && (
                <a
                  href={getFileUrl(profileData.resume)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  <FileText size={13} />
                  <span>CV</span>
                </a>
              )}
            </div>

            <div className="pt-2">
              <Link
                to="/contact?service=audit"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-colors shadow-2xs"
              >
                <span>Book 15-Min Audit</span>
                <ArrowUpRight size={13} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500 font-mono">
          <div>
            © {currentYear} {profileData?.name || 'Bishal Kumar Shaw'}. All rights reserved.
          </div>

          <div>
            Built with Next.js architecture standards & zero runtime waste.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
