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
  const resumeUrl = profileData?.resume
    ? getFileUrl(profileData.resume)
    : null;

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-white pt-24 pb-16 overflow-hidden border-b border-slate-100">
      {/* Linear-style subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/90 text-xs font-mono font-medium text-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Opportunities</span>
              </div>

              <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2">
                Portfolio • Full Stack Development
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                <span className="block text-slate-600 font-medium text-xl sm:text-2xl mb-1">Hi, I'm</span>
                <span className="text-slate-950 block break-words">{profileData?.name || 'Bishal Kumar Shaw'}</span>
              </h1>

              <h2 className="text-base sm:text-lg text-slate-600 font-mono font-medium">
                {profileData?.title || 'Full Stack Developer'}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
              {profileData?.summary}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-1">
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200/90 bg-slate-50/70 text-center">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-950">
                  {profileData?.yearsOfExperience || 9}+
                </div>
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mt-1">Years Exp.</div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200/90 bg-slate-50/70 text-center">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-950">
                  {featuredProjectsCount || 6}+
                </div>
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mt-1">Projects Built</div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200/90 bg-slate-50/70 text-center">
                <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-950">
                  100%
                </div>
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mt-1">Satisfaction</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/projects" className="btn-primary group font-mono text-xs uppercase tracking-wider">
                <span>View Projects</span>
                <ArrowRight
                  size={14}
                  className="ml-1.5 group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link to="/contact" className="btn-secondary font-mono text-xs uppercase tracking-wider">
                Get In Touch
              </Link>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary group font-mono text-xs uppercase tracking-wider"
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
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-2xs">
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

              {/* Minimalist Tech Badges */}
              <div className="absolute -top-3 -right-3 w-11 h-11 bg-slate-950 text-white rounded-xl flex items-center justify-center shadow-xl border border-slate-800">
                <Code size={18} />
              </div>

              <div className="absolute -bottom-3 -left-3 w-11 h-11 bg-slate-950 text-white rounded-xl flex items-center justify-center shadow-xl border border-slate-800">
                <Database size={18} />
              </div>

              <div className="absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-10 bg-slate-950 text-emerald-400 rounded-xl flex items-center justify-center shadow-xl border border-slate-800">
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
