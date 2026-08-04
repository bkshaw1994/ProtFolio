import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Code,
  Database,
  Zap,
  Mail,
  MapPin
} from 'lucide-react';
import ParticleNetwork from '../../../components/ParticleNetwork';

const HeroSection = ({ profileData, featuredProjectsCount }) => {
  const resumeUrl = profileData?.resume
    ? `${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${profileData.resume}`
    : null;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-50/50 bg-grid-pattern pt-24 pb-16 overflow-hidden">
      {/* Interactive Spider-Web / Constellation Canvas Background */}
      <ParticleNetwork />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/80 shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">Available for Opportunities</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-snug">
                <span className="block text-slate-700 font-medium text-xl sm:text-2xl mb-1">Hi, I'm</span>
                <span className="text-primary-700 block break-words">{profileData?.name}</span>
              </h1>

              <h2 className="text-lg sm:text-xl text-slate-600 font-semibold tracking-wide">
                {profileData?.title}
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {profileData?.summary}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5 pt-2">
              <div className="glass-card p-3.5 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {profileData?.yearsOfExperience}+
                </div>
                <div className="text-xs font-medium text-slate-500 mt-1">Years Exp.</div>
              </div>
              <div className="glass-card p-3.5 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {featuredProjectsCount}+
                </div>
                <div className="text-xs font-medium text-slate-500 mt-1">Projects Built</div>
              </div>
              <div className="glass-card p-3.5 sm:p-4 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  100%
                </div>
                <div className="text-xs font-medium text-slate-500 mt-1">Satisfaction</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/projects" className="btn-primary group">
                View Projects
                <ArrowRight
                  size={16}
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
                    size={16}
                    className="mr-2 group-hover:-translate-y-0.5 transition-transform"
                  />
                  Download CV
                </a>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-6 text-sm text-slate-500 pt-2 font-medium">
              {profileData?.location && (
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-primary-600" />
                  <span>{profileData.location}</span>
                </div>
              )}
              {profileData?.email && (
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-primary-600" />
                  <a
                    href={`mailto:${profileData.email}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {profileData.email}
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Outer Glowing Halo Ring */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary-600 via-indigo-500 to-sky-400 rounded-full opacity-30 blur-2xl animate-pulse-slow"></div>

              <div className="relative w-72 h-72 sm:w-88 sm:h-88 bg-gradient-to-tr from-slate-100 to-white rounded-full p-2.5 shadow-2xl ring-1 ring-slate-200/80">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                  {profileData?.profileImage ? (
                    <img
                      src={`${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${profileData.profileImage}`}
                      alt={profileData.name || 'Profile'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-7xl font-bold bg-gradient-to-br from-primary-500 to-indigo-700 text-white">
                      {profileData?.name
                        ? profileData.name.charAt(0).toUpperCase()
                        : 'P'}
                    </div>
                  )}
                </div>
              </div>

              {/* Floating Tech Badges */}
              <div className="absolute -top-2 -right-2 w-14 h-14 bg-gradient-to-tr from-primary-600 to-sky-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary-500/30 animate-float">
                <Code size={26} />
              </div>

              <div className="absolute -bottom-2 -left-2 w-14 h-14 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-900/30 animate-float [animation-delay:1.5s]">
                <Database size={24} />
              </div>

              <div className="absolute top-1/2 -left-6 w-12 h-12 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 animate-float [animation-delay:2.5s]">
                <Zap size={22} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
