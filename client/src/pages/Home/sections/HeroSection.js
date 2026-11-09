import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowDown,
  Calendar,
  Download,
  Gauge,
  Code,
  ShieldCheck,
  Zap,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import ParticleNetwork from '../../../components/ParticleNetwork';
import { getFileUrl } from '../../../utils/apiUrl';

const HeroSection = ({ profileData }) => {
  const resumeUrl = profileData?.resume
    ? getFileUrl(profileData.resume)
    : null;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-slate-50/60 bg-grid-pattern pt-24 pb-16 overflow-hidden">
      {/* Interactive Spider-Web / Constellation Canvas Background */}
      <ParticleNetwork />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            {/* High-Impact Audience & Availability Pill */}
            <div className="inline-flex flex-wrap items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/90 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Available for Q1/Q2 Sprints
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-full">
                Seed-to-Series-A & High-Growth Brands
              </span>
            </div>

            {/* Specialist Tagline */}
            <div className="text-sm sm:text-base font-semibold tracking-wide text-slate-600 uppercase flex items-center gap-2">
              <span className="w-6 h-0.5 bg-primary-600 inline-block"></span>
              <span>{profileData?.name || 'Bishal Kumar Shaw'} • Elite Frontend Architect</span>
            </div>

            {/* The 3-Second Hook Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              I help fast-growing SaaS and e-commerce brands{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-indigo-600 to-sky-500">
                eliminate UI lag, slash load times
              </span>
              , and ship bulletproof Next.js applications.
            </h1>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Senior Full-Stack & Frontend Architect with 9+ years experience delivering sub-second Core Web Vitals, zero hydration debt, and 4-week production MVP sprints. Creator of open-source tools like AuditPulse.
            </p>

            {/* High-Contrast CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link
                to="/contact?service=audit"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-primary-600 via-primary-700 to-indigo-700 hover:from-primary-500 hover:to-indigo-600 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/35 transform hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <Calendar size={18} className="mr-2 text-primary-200 group-hover:scale-110 transition-transform" />
                <span>Book a 15-Min Architecture Audit</span>
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#case-studies"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-800 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-primary-500/50 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <span>View Case Studies</span>
                <ArrowDown size={18} className="ml-2 text-slate-500 group-hover:translate-y-1 transition-transform" />
              </a>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary !py-3 !px-4 text-xs tracking-wide"
                  title="Download Architecture CV"
                >
                  <Download size={15} className="mr-1.5" />
                  CV
                </a>
              )}
            </div>

            {/* Credibility Checklist */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm font-medium text-slate-600 pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Sub-1.2s Target LCP Guarantee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Strict TypeScript & Automated Testing</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Zero-Downtime Cloud Deploys</span>
              </span>
            </div>

            {/* Executive Proof Metrics (Replacing Junior Counters) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-slate-200/80">
              <div className="glass-card p-3 sm:p-4 text-center border border-slate-200/80 hover:border-primary-500/30 transition-colors">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  &lt; 1.2s
                </div>
                <div className="text-xs font-semibold text-primary-700 mt-1 uppercase tracking-wider">
                  Target LCP
                </div>
                <div className="text-[11px] text-slate-500 hidden sm:block">Sub-second Speed</div>
              </div>

              <div className="glass-card p-3 sm:p-4 text-center border border-slate-200/80 hover:border-primary-500/30 transition-colors">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  98+
                </div>
                <div className="text-xs font-semibold text-emerald-700 mt-1 uppercase tracking-wider">
                  Lighthouse Score
                </div>
                <div className="text-[11px] text-slate-500 hidden sm:block">Core Web Vitals Pass</div>
              </div>

              <div className="glass-card p-3 sm:p-4 text-center border border-slate-200/80 hover:border-primary-500/30 transition-colors">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  $10M+
                </div>
                <div className="text-xs font-semibold text-indigo-700 mt-1 uppercase tracking-wider">
                  Scale Supported
                </div>
                <div className="text-[11px] text-slate-500 hidden sm:block">High-Growth GMV/Traffic</div>
              </div>

              <div className="glass-card p-3 sm:p-4 text-center border border-slate-200/80 hover:border-primary-500/30 transition-colors">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  9+ Yrs
                </div>
                <div className="text-xs font-semibold text-slate-700 mt-1 uppercase tracking-wider">
                  Engineering Lead
                </div>
                <div className="text-[11px] text-slate-500 hidden sm:block">Full-Stack Architecture</div>
              </div>
            </div>

            {/* Location & Direct Contact info */}
            {profileData?.location && (
              <div className="flex items-center space-x-2 text-xs text-slate-500 pt-1">
                <MapPin size={14} className="text-primary-600" />
                <span>{profileData.location} • Available for remote worldwide contracts (EST, PST, GMT, IST)</span>
              </div>
            )}
          </motion.div>

          {/* Right Content - Visual Architecture Showcase (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer Glowing Halo Ring */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary-600 via-indigo-500 to-sky-400 rounded-3xl opacity-25 blur-2xl animate-pulse-slow"></div>

              {/* Main Profile & Credibility Container */}
              <div className="relative bg-gradient-to-b from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 space-y-6">
                {/* Profile Image & Status */}
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-white ring-2 ring-primary-500/20 bg-slate-100 flex-shrink-0">
                    {profileData?.profileImage ? (
                      <img
                        src={getFileUrl(profileData.profileImage)}
                        alt={profileData.name || 'Bishal Kumar Shaw'}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                        decoding="async"
                        fetchpriority="high"
                        width="96"
                        height="96"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-bold bg-gradient-to-br from-primary-600 to-indigo-700 text-white">
                        {profileData?.name ? profileData.name.charAt(0).toUpperCase() : 'B'}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-900">
                      {profileData?.name || 'Bishal Kumar Shaw'}
                    </div>
                    <div className="text-xs font-semibold text-primary-600">
                      Senior Frontend & Full-Stack Architect
                    </div>
                    <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-[11px] font-semibold">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                      <span>Booking Q1/Q2 Sprints</span>
                    </div>
                  </div>
                </div>

                {/* Architecture Highlights Card */}
                <div className="space-y-3 bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                    <span>Architecture Specializations</span>
                    <span className="text-[10px] text-primary-600 font-semibold">Production Ready</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/50">
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <Gauge size={14} className="text-primary-600" />
                        Core Web Vitals & Hydration
                      </span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                        LCP &lt; 1.2s
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/50">
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <Code size={14} className="text-indigo-600" />
                        Next.js App Router & RSC
                      </span>
                      <span className="text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                        SSR / ISR
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/50">
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-emerald-600" />
                        Playwright & Jest CI/CD
                      </span>
                      <span className="text-slate-700 font-bold bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        98%+ Gate
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/50">
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <Zap size={14} className="text-amber-600" />
                        AuditPulse Open-Source Engine
                      </span>
                      <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                        CWV Monitor
                      </span>
                    </div>
                  </div>
                </div>

                {/* Founder Testimonial / Quick Quote */}
                <div className="bg-gradient-to-r from-primary-500/10 via-indigo-500/10 to-sky-500/10 rounded-2xl p-4 border border-primary-500/20 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 mb-1 flex items-center gap-1">
                    <span>Target: Seed-to-Series-A Startups & Fast-Growth Brands</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    "Zero fluff, fixed-scope sprints that eliminate UI lag, unblock engineering teams, and deliver immediate conversion impact."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
