import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { useGetProfileQuery } from '../../features/api/apiSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { data: profile } = useGetProfileQuery();
  
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
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg overflow-hidden flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
              {profileData?.profileImage ? (
                <img 
                  src={`${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${profileData.profileImage}`}
                  alt={profileData.name || 'Profile'}
                  className="w-full h-full object-cover"
                />
              ) : (
                profileData?.name ? profileData.name.charAt(0).toUpperCase() : 'P'
              )}
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-secondary-900">
                {profileData?.name || 'Portfolio'}
              </div>
              <div className="text-sm text-secondary-600 -mt-1">
                {profileData?.title || 'Full Stack Developer'}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact Info & Social Links */}
          <div className="hidden lg:flex items-center space-x-4">
            {profileData?.email && (
              <a
                href={`mailto:${profileData.email}`}
                className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                title="Email"
              >
                <Mail size={18} />
              </a>
            )}
            
            {profileData?.socialLinks?.github && (
              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                title="GitHub"
              >
                <Github size={18} />
              </a>
            )}
            
            {profileData?.socialLinks?.linkedin && (
              <a
                href={profileData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            )}

            <Link to="/contact" className="btn-primary ml-4">
              Hire Me
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-secondary-700 hover:text-primary-600 hover:bg-secondary-50 rounded-lg transition-all duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-secondary-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Contact */}
              <div className="pt-4 border-t border-secondary-200 mt-4">
                <Link 
                  to="/contact" 
                  className="btn-primary w-full justify-center mb-3"
                >
                  Get In Touch
                </Link>
                
                <div className="flex items-center justify-center space-x-4">
                  {profile?.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      className="p-2 text-secondary-600 hover:text-primary-600 rounded-lg transition-colors"
                    >
                      <Mail size={20} />
                    </a>
                  )}
                  
                  {profile?.socialLinks?.github && (
                    <a
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-secondary-600 hover:text-primary-600 rounded-lg transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  
                  {profile?.socialLinks?.linkedin && (
                    <a
                      href={profile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-secondary-600 hover:text-primary-600 rounded-lg transition-colors"
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
