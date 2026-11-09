import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  CheckCircle2,
  Terminal,
  Activity,
  Check
} from 'lucide-react';
import { getFileUrl } from '../../../utils/apiUrl';

const HeroSection = ({ profileData }) => {
  const resumeUrl = profileData?.resume
    ? getFileUrl(profileData.resume)
    : null;

  return (
    <section className="relative bg-white pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden border-b border-slate-100">
      {/* Linear-style subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Content (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Minimalist Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-medium text-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Q1/Q2 Sprints</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-mono text-[11px]">Seed-to-Series-A Startups</span>
            </div>

            {/* Specialist Byline */}
            <div className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest">
              {profileData?.name || 'Bishal Kumar Shaw'} • Senior Frontend & Full-Stack Architect
            </div>

            {/* The 3-Second Hook Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.15]">
              I help fast-growing SaaS and e-commerce brands{' '}
              <span className="text-slate-900 underline decoration-slate-300 underline-offset-8">
                eliminate UI lag
              </span>
              , slash load times, and ship bulletproof Next.js applications.
            </h1>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
              Senior Full-Stack & Frontend Architect with 9+ years experience delivering sub-second Core Web Vitals, zero hydration debt, and 4-week production MVP sprints. Creator of open-source AuditPulse.
            </p>

            {/* High-Contrast Focused CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/contact?service=audit"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-semibold text-xs sm:text-sm text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs group"
              >
                <span>Book a 15-Min Architecture Audit</span>
                <ArrowRight size={15} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/case-studies"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-semibold text-xs sm:text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-colors"
              >
                <span>View Case Studies</span>
              </Link>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3.5 py-3 rounded-lg font-medium text-xs text-slate-500 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 transition-colors"
                  title="Download Architecture CV"
                >
                  <Download size={14} className="mr-1.5" />
                  <span>CV</span>
                </a>
              )}
            </div>

            {/* Credibility Checklist */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-600 font-medium pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" />
                <span>Sub-1.2s Target LCP Guarantee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" />
                <span>Strict TypeScript & Automated Testing</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-600" />
                <span>Zero-Downtime Cloud Deploys</span>
              </span>
            </div>

            {/* Executive Proof Metrics (Tabular Linear Style) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="p-3.5 rounded-lg border border-slate-200/90 bg-slate-50/50">
                <div className="text-2xl font-bold text-slate-950 font-mono tracking-tight">
                  &lt; 1.2s
                </div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Target LCP
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200/90 bg-slate-50/50">
                <div className="text-2xl font-bold text-slate-950 font-mono tracking-tight">
                  98+
                </div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Lighthouse
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200/90 bg-slate-50/50">
                <div className="text-2xl font-bold text-slate-950 font-mono tracking-tight">
                  $10M+
                </div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Scale Handled
                </div>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200/90 bg-slate-50/50">
                <div className="text-2xl font-bold text-slate-950 font-mono tracking-tight">
                  9+ Yrs
                </div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                  Lead Exp
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Precision Architecture Inspector (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="rounded-xl border border-slate-800 bg-slate-950 text-slate-300 shadow-xl overflow-hidden font-mono text-xs">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <span className="text-[11px] text-slate-400 ml-2 font-mono flex items-center gap-1.5">
                    <Terminal size={12} className="text-slate-400" />
                    architecture-audit.spec.ts
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 flex items-center gap-1">
                  <Check size={10} />
                  PASS
                </span>
              </div>

              {/* Inspector Content */}
              <div className="p-4 space-y-3.5">
                <div className="text-slate-400 text-[11px]">
                  {'// High-Ticket Architecture Spec & Standards'}
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-start justify-between p-2.5 rounded-lg bg-slate-900/70 border border-slate-800/80">
                    <div className="space-y-0.5">
                      <div className="text-slate-400 text-[10px] uppercase tracking-wider">Framework & SSR</div>
                      <div className="text-slate-100 font-semibold text-xs">Next.js 14+ (App Router & RSC)</div>
                    </div>
                    <span className="text-emerald-400 text-[11px] font-semibold">Tiered ISR</span>
                  </div>

                  <div className="flex items-start justify-between p-2.5 rounded-lg bg-slate-900/70 border border-slate-800/80">
                    <div className="space-y-0.5">
                      <div className="text-slate-400 text-[10px] uppercase tracking-wider">Core Web Vitals Metric</div>
                      <div className="text-slate-100 font-semibold text-xs">LCP: 0.82s • INP: 38ms • CLS: 0.00</div>
                    </div>
                    <span className="text-emerald-400 text-[11px] font-semibold">CWV 100%</span>
                  </div>

                  <div className="flex items-start justify-between p-2.5 rounded-lg bg-slate-900/70 border border-slate-800/80">
                    <div className="space-y-0.5">
                      <div className="text-slate-400 text-[10px] uppercase tracking-wider">Bundle Reduction</div>
                      <div className="text-slate-100 font-semibold text-xs">-45% JS payload via tree-shaking</div>
                    </div>
                    <span className="text-slate-300 text-[11px] font-semibold">Zero Hydration Debt</span>
                  </div>

                  <div className="flex items-start justify-between p-2.5 rounded-lg bg-slate-900/70 border border-slate-800/80">
                    <div className="space-y-0.5">
                      <div className="text-slate-400 text-[10px] uppercase tracking-wider">Testing & Guardrails</div>
                      <div className="text-slate-100 font-semibold text-xs">Playwright E2E + Jest CI/CD</div>
                    </div>
                    <span className="text-emerald-400 text-[11px] font-semibold">94%+ Guard</span>
                  </div>
                </div>

                {/* Open-Source Tool Reference */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Activity size={12} className="text-primary-400" />
                    Open Source: AuditPulse
                  </span>
                  <span className="text-slate-300 font-mono">Headless CWV Engine</span>
                </div>

                {/* Profile Card Footer */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 overflow-hidden border border-slate-700 flex items-center justify-center text-white text-xs font-bold">
                      {profileData?.profileImage ? (
                        <img
                          src={getFileUrl(profileData.profileImage)}
                          alt={profileData.name || 'Bishal'}
                          className="w-full h-full object-cover"
                          crossOrigin="anonymous"
                          width="32"
                          height="32"
                        />
                      ) : (
                        'B'
                      )}
                    </div>
                    <div>
                      <div className="text-slate-200 font-semibold text-xs">
                        {profileData?.name || 'Bishal Kumar Shaw'}
                      </div>
                      <div className="text-slate-500 text-[10px]">
                        Available Worldwide (Remote)
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/services"
                    className="text-[11px] text-slate-400 hover:text-white transition-colors flex items-center gap-1 font-sans"
                  >
                    <span>View Sprints</span>
                    <ArrowRight size={11} />
                  </Link>
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
