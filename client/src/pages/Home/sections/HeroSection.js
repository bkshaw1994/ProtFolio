import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Download,
  Code,
  Database,
  Zap,
  Mail,
  MapPin
} from 'lucide-react';

const HeroSection = ({ profileData, featuredProjectsCount }) => {
  const resumeUrl = profileData?.resume
    ? `${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${profileData.resume}`
    : null;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {profileData?.name
                    ? profileData.name.charAt(0).toUpperCase()
                    : 'H'}
                </div>
                <div className="badge badge-primary">Available for work</div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 leading-tight">
                Hi, I'm{' '}
                <span className="text-gradient">{profileData?.name}</span>
              </h1>

              <h2 className="text-xl sm:text-2xl text-secondary-600 font-medium">
                {profileData?.title}
              </h2>
            </div>

            <p className="text-lg text-secondary-700 leading-relaxed max-w-2xl">
              {profileData?.summary}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600">
                  {profileData?.yearsOfExperience}+
                </div>
                <div className="text-sm text-secondary-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600">
                  {featuredProjectsCount}+
                </div>
                <div className="text-sm text-secondary-600">Projects Done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600">
                  100%
                </div>
                <div className="text-sm text-secondary-600">
                  Client Satisfaction
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link to="/projects" className="btn-primary group">
                View My Work
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link to="/contact" className="btn-outline">
                Get In Touch
              </Link>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary group"
                >
                  <Download
                    size={20}
                    className="mr-2 group-hover:-translate-y-1 transition-transform"
                  />
                  Download CV
                </a>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-6 text-sm text-secondary-600">
              {profileData?.location && (
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>{profileData.location}</span>
                </div>
              )}
              {profileData?.email && (
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <a
                    href={`mailto:${profileData.email}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {profileData.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="relative animate-slide-up">
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary-200 via-primary-100 to-secondary-100 rounded-full overflow-hidden shadow-custom-xl">
                {profileData?.profileImage ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${profileData.profileImage}`}
                    alt={profileData.name || 'Profile'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-primary-600">
                    {profileData?.name
                      ? profileData.name.charAt(0).toUpperCase()
                      : 'P'}
                  </div>
                )}
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white shadow-lg animate-pulse-slow">
                <Code size={24} />
              </div>

              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-lg flex items-center justify-center text-white shadow-lg animate-pulse-slow">
                <Database size={20} />
              </div>

              <div className="absolute top-1/2 -left-8 w-14 h-14 bg-gradient-to-br from-success-500 to-success-700 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse-slow">
                <Zap size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
