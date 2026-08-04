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
    <footer className="relative bg-slate-950 text-white overflow-hidden border-t border-slate-800/80">
      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary-500/20">
                {profileData?.name ? profileData.name.charAt(0).toUpperCase() : 'P'}
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {profileData?.name || 'Full Stack Developer'}
                </h3>
                <p className="text-slate-400 text-xs font-medium">
                  {profileData?.title || 'MERN Stack Developer'}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm max-w-md leading-relaxed font-normal">
              {profileData?.summary ||
                'Passionate full-stack developer with 9 years of experience in building scalable web applications using modern technologies.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Quick Links</h3>
            <nav className="space-y-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-slate-400 hover:text-white hover:translate-x-1 transition-all text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect Section - Contact Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Connect</h3>
            <div className="space-y-3 text-sm text-slate-300 font-medium">
              {profileData?.email && (
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-primary-400 flex-shrink-0" />
                  <a
                    href={`mailto:${profileData.email}`}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {profileData.email}
                  </a>
                </div>
              )}

              {profileData?.phone && (
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-primary-400 flex-shrink-0" />
                  <a
                    href={`tel:${profileData.phone}`}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {profileData.phone}
                  </a>
                </div>
              )}

              {profileData?.location && (
                <div className="flex items-center space-x-3">
                  <MapPin size={16} className="text-primary-400 flex-shrink-0" />
                  <span>{profileData.location}</span>
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="mt-6">
              <Link to="/contact" className="btn-primary w-full justify-center text-xs tracking-wider uppercase py-3">
                Start a Project
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-slate-400 text-xs font-medium">
              <span>
                © {currentYear} {profileData?.name || 'Portfolio'}. All rights
                reserved.
              </span>

              {/* Visitor Counter */}
              {visitorData?.data && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full">
                  <Eye size={13} className="text-primary-400" />
                  <span className="text-slate-300">
                    {visitorData.data.totalVisits.toLocaleString()}{' '}
                    {visitorData.data.totalVisits === 1 ? 'visit' : 'visits'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 text-slate-400 text-xs font-medium">
              <span>Crafted with</span>
              <Heart size={15} className="text-rose-500 animate-pulse" />
              <span>using MERN Stack</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
