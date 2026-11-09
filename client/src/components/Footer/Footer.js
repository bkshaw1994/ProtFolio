import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  Eye
} from 'lucide-react';
import {
  useGetProfileQuery,
  useGetVisitorCountQuery,
  useIncrementVisitorCountMutation
} from '../../features/api/apiSlice';

const Footer = () => {
  const { data: profile } = useGetProfileQuery();
  const { data: visitorData } = useGetVisitorCountQuery();
  const [incrementVisitorCount] = useIncrementVisitorCountMutation();
  const [hasTracked, setHasTracked] = useState(false);
  const currentYear = new Date().getFullYear();

  // Extract profile data - handle nested API data structure
  const profileData = profile?.data || profile;

  // Track visitor on mount
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
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/skills', label: 'Skills' },
    { path: '/experience', label: 'Experience' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden border-t border-slate-800 pb-20 md:pb-0">
      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white font-bold text-sm tracking-tight">
                {profileData?.name ? profileData.name.charAt(0).toUpperCase() : 'P'}
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight text-white leading-tight">
                  {profileData?.name || 'Full Stack Developer'}
                </h3>
                <p className="text-slate-400 text-xs font-mono mt-0.5">
                  {profileData?.title || 'MERN Stack Developer'}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed font-normal">
              {profileData?.summary ||
                'Passionate full-stack developer with 9 years of experience in building scalable web applications using modern technologies.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-3">
              Quick Links
            </h3>
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

          {/* Connect Section - Contact Details */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-3">
              Connect
            </h3>
            <div className="space-y-2.5 text-xs text-slate-300">
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

              {profileData?.phone && (
                <div className="flex items-center space-x-2.5">
                  <Phone size={14} className="text-slate-400 flex-shrink-0" />
                  <a
                    href={`tel:${profileData.phone}`}
                    className="hover:text-white transition-colors font-mono"
                  >
                    {profileData.phone}
                  </a>
                </div>
              )}

              {profileData?.location && (
                <div className="flex items-center space-x-2.5 text-slate-400">
                  <MapPin size={14} className="text-slate-400 flex-shrink-0" />
                  <span>{profileData.location}</span>
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="mt-5">
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-colors uppercase tracking-wider font-mono"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400 font-mono">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <span>
                © {currentYear} {profileData?.name || 'Portfolio'}. All rights reserved.
              </span>

              {/* Visitor Counter */}
              {visitorData?.data && (
                <div className="flex items-center space-x-1.5 px-2.5 py-0.5 bg-slate-900 border border-slate-800 rounded-md text-slate-300 text-[11px]">
                  <Eye size={12} className="text-emerald-400" />
                  <span>
                    {visitorData.data.totalVisits.toLocaleString()}{' '}
                    {visitorData.data.totalVisits === 1 ? 'visit' : 'visits'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 text-slate-400 text-xs">
              <span>Crafted with</span>
              <Heart size={13} className="text-rose-500 animate-pulse" />
              <span>using MERN Stack</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
