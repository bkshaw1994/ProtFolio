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
import { getFileUrl } from '../../../utils/apiUrl';

const HeroSection = ({ profileData, featuredProjectsCount }) => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-white border-b border-slate-100 overflow-hidden">
      {/* Subtle Dot Matrix Background (Removed square grid lines) */}
      <div className="absolute inset-0 bg-dot-pattern [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container-custom relative z-10 py-12 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Live Status Badge */}
            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Hire</span>
              <span className="text-emerald-300">•</span>
              <span className="text-emerald-700">Full-Stack / MERN</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500">
                Staff Software Engineer & Architect
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 leading-[1.08]">
                {profileData?.name || 'Bishal Kumar Shaw'}
              </h1>
            </div>

            {/* Bio / Summary */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
              {profileData?.summary ||
                'Full-stack engineer with 9+ years of experience architecting resilient distributed systems, modern React frontends, and enterprise cloud applications.'}
            </p>

            {/* SLA / Stat Numbers (Strictly Monospace) */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-950">
                  {profileData?.statistics?.yearsExperience ||
                    profileData?.yearsOfExperience ||
                    8}
                  +
                </div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mt-0.5">
                  Years Exp
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-950">
                  {profileData?.statistics?.projectsCompleted ||
                    featuredProjectsCount ||
                    50}
                  +
                </div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mt-0.5">
                  Production Apps
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-950">
                  {profileData?.statistics?.technologiesMastered || 20}+
                </div>
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mt-0.5">
                  Tech Stacks
                </div>
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/contact" className="btn-primary group">
                <span>Start a Project</span>
                <ArrowRight
                  size={15}
                  className="ml-1.5 group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link to="/projects" className="btn-secondary">
                View Work
              </Link>
              {profileData?.resume && (
                <a
                  href={getFileUrl(profileData.resume)}
                  download
                  className="btn-outline group inline-flex items-center"
                >
                  <Download
                    size={14}
                    className="mr-1.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                  <span>CV</span>
                </a>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-5 text-xs font-mono text-slate-500 pt-1">
              {profileData?.location && (
                <div className="flex items-center space-x-2">
                  <MapPin size={14} className="text-slate-400" />
                  <span>{profileData.location}</span>
                </div>
              )}
              {profileData?.email && (
                <div className="flex items-center space-x-2">
                  <Mail size={14} className="text-slate-400" />
                  <a
                    href={`mailto:${profileData.email}`}
                    className="hover:text-slate-900 transition-colors"
                  >
                    {profileData.email}
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Content - Profile Image (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative">
              {/* Circular Avatar Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-50 shadow-md">
                {profileData?.profileImage ? (
                  <img
                    src={getFileUrl(profileData.profileImage)}
                    alt={profileData.name || 'Profile'}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                    width="320"
                    height="320"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-7xl font-bold font-mono bg-slate-900 text-white">
                    {profileData?.name
                      ? profileData.name.charAt(0).toUpperCase()
                      : 'P'}
                  </div>
                )}
              </div>

              {/* Minimalist Circular Tech Badges */}
              <div className="absolute top-2 right-2 w-11 h-11 bg-slate-950 text-white rounded-full flex items-center justify-center shadow-lg border border-slate-800">
                <Code size={18} />
              </div>

              <div className="absolute bottom-2 left-2 w-11 h-11 bg-slate-950 text-white rounded-full flex items-center justify-center shadow-lg border border-slate-800">
                <Database size={18} />
              </div>

              <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 bg-slate-950 text-emerald-400 rounded-full flex items-center justify-center shadow-lg border border-slate-800">
                <Zap size={16} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
