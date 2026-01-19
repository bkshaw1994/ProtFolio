import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Github,
  Linkedin,
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

  // Track visitor on mount
  useEffect(() => {
    if (!hasTracked) {
      const trackVisit = async () => {
        try {
          // Check if this is a unique visitor (simple approach using localStorage)
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

  const socialLinks = [
    {
      name: 'GitHub',
      url: profile?.socialLinks?.github,
      icon: Github
    },
    {
      name: 'LinkedIn',
      url: profile?.socialLinks?.linkedin,
      icon: Linkedin
    },
    {
      name: 'Email',
      url: `mailto:${profile?.email}`,
      icon: Mail
    }
  ].filter((link) => link.url);

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                {profile?.name ? profile.name.charAt(0).toUpperCase() : 'P'}
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {profile?.name || 'Full Stack Developer'}
                </h3>
                <p className="text-secondary-400 text-sm">
                  {profile?.title || 'MERN Stack Developer'}
                </p>
              </div>
            </div>

            <p className="text-secondary-300 mb-6 max-w-md leading-relaxed">
              {profile?.summary ||
                'Passionate full-stack developer with 9 years of experience in building scalable web applications using modern technologies.'}
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              {profile?.email && (
                <div className="flex items-center space-x-3 text-secondary-300">
                  <Mail size={16} />
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
              )}

              {profile?.phone && (
                <div className="flex items-center space-x-3 text-secondary-300">
                  <Phone size={16} />
                  <a
                    href={`tel:${profile.phone}`}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {profile.phone}
                  </a>
                </div>
              )}

              {profile?.location && (
                <div className="flex items-center space-x-3 text-secondary-300">
                  <MapPin size={16} />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-secondary-300 hover:text-primary-400 transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="space-y-3">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target={link.name !== 'Email' ? '_blank' : undefined}
                    rel={
                      link.name !== 'Email' ? 'noopener noreferrer' : undefined
                    }
                    className="flex items-center space-x-3 text-secondary-300 hover:text-primary-400 transition-colors group"
                  >
                    <IconComponent
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Call to Action */}
            <div className="mt-6">
              <Link to="/contact" className="btn-primary w-full justify-center">
                Start a Project
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-secondary-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-secondary-400 text-sm">
              <span>
                © {currentYear} {profile?.name || 'Portfolio'}. All rights
                reserved.
              </span>

              {/* Visitor Counter */}
              {visitorData?.data && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-secondary-800 rounded-full">
                  <Eye size={14} className="text-primary-400" />
                  <span className="text-secondary-300">
                    {visitorData.data.totalVisits.toLocaleString()}{' '}
                    {visitorData.data.totalVisits === 1 ? 'visit' : 'visits'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 text-secondary-400 text-sm">
              <span>Made with</span>
              <Heart size={16} className="text-red-500 animate-pulse" />
              <span>using MERN Stack</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
