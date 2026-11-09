import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Download,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Github,
  Linkedin,
  Terminal,
  ShieldCheck,
  Zap,
  Code2,
  Cloud
} from 'lucide-react';
import { useGetProfileQuery } from '../../features/api/apiSlice';
import { SkeletonProfile } from '../../components/Skeleton';
import { getFileUrl } from '../../utils/apiUrl';

const engineeringPrinciples = [
  {
    icon: Zap,
    title: 'Zero Hydration Debt & Edge Streaming',
    description:
      'Render performance is non-negotiable. I build with Next.js App Router, React Server Components (RSC), and tiered ISR to eliminate client-side hydration freezes and deliver sub-second LCP.'
  },
  {
    icon: Code2,
    title: 'Strict TypeScript & End-to-End Type Safety',
    description:
      'Compiler strictness from database schemas to client forms. Shared Zod schemas, type-safe API contracts, and domain-driven design eliminate runtime surprises and enable rapid refactoring.'
  },
  {
    icon: ShieldCheck,
    title: 'Automated CI/CD Guardrails & Zero-Regression Gates',
    description:
      'Every pull request is guarded by comprehensive Playwright end-to-end suites, Jest unit coverage, and automated Lighthouse CI checks that fail builds before regressions touch staging.'
  },
  {
    icon: Cloud,
    title: 'Resilient Microservices & Distributed Caching',
    description:
      'Edge networks (Vercel) coupled with containerized GCP microservices, Redis distributed caching, and BullMQ queues engineered to gracefully absorb high-concurrency traffic surges.'
  }
];

const About = () => {
  const {
    data: profileResponse,
    isLoading,
    isError,
    refetch
  } = useGetProfileQuery();

  const profile = profileResponse?.data || profileResponse;

  if (isLoading) {
    return (
      <div className="pt-24 sm:pt-28 min-h-screen bg-white">
        <div className="container-custom max-w-6xl mx-auto py-10">
          <div className="flex justify-center mb-8">
            <SkeletonProfile />
          </div>
          <div className="space-y-4 max-w-2xl mx-auto">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-4 bg-slate-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 sm:pt-28 bg-white">
        <div className="text-center">
          <div className="text-red-500 font-mono text-sm mb-4">Error loading profile data</div>
          <button onClick={() => refetch()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>About - Bishal Kumar Shaw | Senior Frontend Architect</title>
        <meta
          name="description"
          content="Senior Frontend & Full-Stack Architect with 9+ years experience delivering sub-second Core Web Vitals, Next.js architecture, and high-velocity MVP sprints for venture-backed startups."
        />
      </Helmet>

      <div className="pt-24 sm:pt-28 min-h-screen bg-white pb-20">
        <div className="container-custom max-w-6xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-12 space-y-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500">
              Architect Dossier & Background
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              About Bishal Kumar Shaw
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Senior Full-Stack & Frontend Architect • Core Web Vitals Specialist • Creator of AuditPulse
            </p>
          </div>

          {/* Dossier 2-Column Grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Sticky Profile Spec Card (4 cols) */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs space-y-5">
                {/* Photo & Status */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl overflow-hidden border border-slate-300 flex-shrink-0">
                    {profile.profileImage ? (
                      <img
                        src={getFileUrl(profile.profileImage)}
                        alt={profile.name || 'Bishal Kumar Shaw'}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                        width="64"
                        height="64"
                      />
                    ) : (
                      'B'
                    )}
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-base font-bold text-slate-950 tracking-tight leading-tight">
                      {profile.name || 'Bishal Kumar Shaw'}
                    </h2>
                    <div className="text-xs font-mono text-slate-500">
                      Senior Frontend Architect
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Available for Sprints</span>
                    </div>
                  </div>
                </div>

                {/* Specs Table */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Experience</span>
                    <span className="text-slate-900 font-semibold">{profile.yearsOfExperience || 9}+ Years</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Location</span>
                    <span className="text-slate-900 font-semibold">{profile.location || 'Bangalore, India'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Work Mode</span>
                    <span className="text-slate-900 font-semibold">Remote Worldwide</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Timezones</span>
                    <span className="text-slate-900 font-semibold">EST, PST, GMT, IST</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Specialty</span>
                    <span className="text-slate-900 font-semibold">Next.js & Performance</span>
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="pt-2 space-y-2">
                  <Link
                    to="/contact?service=audit"
                    className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                  >
                    <Calendar size={13} className="mr-1.5" />
                    <span>Book 15-Min Audit</span>
                  </Link>

                  <div className="flex items-center gap-2">
                    {profile.resume && (
                      <a
                        href={getFileUrl(profile.resume)}
                        download
                        className="flex-1 inline-flex items-center justify-center py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors font-mono"
                      >
                        <Download size={13} className="mr-1.5" />
                        <span>CV</span>
                      </a>
                    )}
                    {profile.socialLinks?.github && (
                      <a
                        href={profile.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                        title="GitHub"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {profile.socialLinks?.linkedin && (
                      <a
                        href={profile.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Main Dossier Content (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Executive Proof Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="text-2xl font-bold font-mono text-slate-950">
                    {profile.yearsOfExperience || 9}+ Yrs
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-1">
                    Lead Experience
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="text-2xl font-bold font-mono text-slate-950">
                    &lt; 1.2s
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-1">
                    Target LCP Guarantee
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="text-2xl font-bold font-mono text-slate-950">
                    $10M+
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-1">
                    Scale Supported
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="text-2xl font-bold font-mono text-slate-950">
                    98+
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-1">
                    Lighthouse Standard
                  </div>
                </div>
              </div>

              {/* Biography Section */}
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500">
                  Executive Summary
                </div>
                {profile.aboutParagraphs && profile.aboutParagraphs.length > 0 ? (
                  profile.aboutParagraphs.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <>
                    <p>
                      I am a Senior Frontend and Full-Stack Architect with over 9 years of hands-on experience building, scaling, and optimizing web applications for Seed-to-Series-A venture-backed startups and high-growth brands.
                    </p>
                    <p>
                      My engineering focus centers on high-impact performance governance: eliminating client-side hydration bottlenecks, implementing streaming server-side architectures with Next.js App Router, and architecting resilient microservices that scale effortlessly under heavy traffic surges.
                    </p>
                    <p>
                      Rather than billing arbitrary hourly rates, I partner with CTOs, founders, and engineering teams through fixed-scope, outcome-guaranteed sprints—from 2-week Core Web Vitals speed overhauls to 4-week zero-debt MVP production builds.
                    </p>
                  </>
                )}
              </div>

              {/* Engineering Principles & Philosophy */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500">
                  Core Engineering Principles
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {engineeringPrinciples.map((principle, idx) => {
                    const Icon = principle.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-2xs"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                          <Icon size={16} />
                        </div>
                        <h3 className="text-sm font-bold text-slate-950 tracking-tight">
                          {principle.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {principle.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Open-Source Tool Spotlight: AuditPulse */}
              <div className="p-6 rounded-xl bg-slate-950 text-white border border-slate-800 space-y-3 font-mono shadow-xl">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Terminal size={14} className="text-emerald-400" />
                    <span className="font-semibold">Open-Source Leadership</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                    ACTIVE PROJECT
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-sans text-white tracking-tight">
                    AuditPulse: Headless Core Web Vitals & SPA SEO Engine
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed font-normal">
                    Automated performance monitoring engine built with Next.js, Puppeteer, Redis, and MongoDB. Designed to prevent SPA SEO indexation drops and detect Core Web Vitals regressions prior to staging deploys.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-t border-slate-800">
                  <span className="text-slate-400 text-[11px]">Next.js • Puppeteer • Redis • BullMQ</span>
                  <a
                    href="https://github.com/bkshaw1994/AuditPulse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white hover:text-slate-300 gap-1 font-sans font-semibold text-xs transition-colors"
                  >
                    <span>View Repository</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>

              {/* Architectural Competencies */}
              {profile.competencies && profile.competencies.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500">
                    Architectural Competencies & Capabilities
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    {profile.competencies.map((comp, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs"
                      >
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
                          <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
                          <span>{comp.title}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pl-5 font-normal">
                          {comp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
