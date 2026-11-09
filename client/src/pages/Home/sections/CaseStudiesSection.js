import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Github,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const flagshipCaseStudies = [
  {
    id: 'auditpulse',
    title: 'AuditPulse: Open-Source Core Web Vitals & SPA SEO Monitor',
    tagline:
      'Automated headless performance profiling engine built to eliminate SPA SEO crawl drops and detect rendering regressions before deployment.',
    category: 'Open-Source Developer Infrastructure',
    role: 'Creator & Core Architect',
    badge: 'Flagship Open-Source',
    technologies: [
      'Next.js (App Router)',
      'Puppeteer',
      'Redis / BullMQ',
      'MongoDB',
      'WebSockets',
      'Tailwind CSS'
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '48 → 98+', change: '+50 pts', highlight: true },
      { label: 'TTFB Reduction', value: '-58%', change: 'Sub-second server response' },
      { label: 'Real-User LCP', value: '< 800ms', change: 'Passed all CWV audits' },
      { label: 'URLs Governed', value: '100+', change: 'Continuous automated sweeps' }
    ],
    sar: {
      situation:
        'Modern client-side Single-Page Applications (SPAs) and heavy dynamic React frontends suffered from severe Google search crawl budget drops, invisible client-side rendering bottlenecks, and poor Core Web Vitals (LCP > 4.2s, INP > 350ms) that directly depressed search rankings and conversion rates.',
      action:
        'Architected AuditPulse as an open-source headless performance monitoring engine. Developed distributed Puppeteer worker clusters managed via Redis BullMQ to emulate real-world mobile 4G network throttling, trace waterfall LCP/CLS/INP bottlenecks, and cache automated diagnostic audits in MongoDB with streaming WebSockets for live regression notifications.',
      result:
        'Automated continuous CWV governance across 100+ production URLs, detected critical layout shifts and render-blocking scripts before staging deploys, slashing time-to-first-byte (TTFB) by 58% and lifting Lighthouse scores from 48 to 98+. Open-sourced for the developer community with active GitHub adoption.'
    },
    architectureHighlights: [
      'Headless Chromium cluster with emulated mobile network and CPU throttling',
      'BullMQ asynchronous queue handling concurrent audit jobs without server blocking',
      'Real-time WebSocket streaming of DOM waterfall traces and critical render paths',
      'Automated CI/CD webhook integrations alerting engineers to performance regressions'
    ],
    githubUrl: 'https://github.com/bkshaw1994/AuditPulse',
    liveUrl: 'https://bishal-portfolio-chi.vercel.app/projects'
  },
  {
    id: 'ecommerce-architecture',
    title: 'High-Performance E-Commerce & SaaS Architecture Platform',
    tagline:
      'Sub-second LCP, multi-tier ISR caching, and zero hydration debt for high-concurrency storefronts handling millions in GMV.',
    category: 'E-Commerce / SaaS Scale',
    role: 'Lead Frontend Architect',
    badge: 'Scale Showcase',
    technologies: [
      'Next.js App Router',
      'React Server Components',
      'TypeScript',
      'Redis Edge Cache',
      'Zustand',
      'Tailwind CSS'
    ],
    metrics: [
      { label: 'Mobile LCP', value: '720ms', change: 'Sub-second speed', highlight: true },
      { label: 'Bundle Footprint', value: '-52%', change: 'Tree-shaken dynamic imports' },
      { label: 'Checkout Conversion', value: '+28.4%', change: 'Direct revenue uplift' },
      { label: 'Hydration Errors', value: '0%', change: 'Zero state desynchronization' }
    ],
    sar: {
      situation:
        'High-traffic e-commerce storefront handling heavy catalog volume and concurrent flash sales suffered from sluggish navigation, 3.8s mobile LCP during peak marketing campaigns, and frequent cart state synchronization errors under high concurrency.',
      action:
        'Re-architected the frontend onto Next.js App Router with tiered Incremental Static Regeneration (ISR) and Edge middleware caching. Built an atomic state store with optimistic UI updates for cart/checkout, eliminated redundant re-renders via memoized selectors, and lazy-loaded dynamic analytics scripts behind user interactions.',
      result:
        'Achieved 720ms mobile LCP (sub-second), reduced JavaScript bundle footprint by 52%, eliminated 100% of checkout hydration mismatches, and improved conversion checkout rate by +28.4% during scale events.'
    },
    architectureHighlights: [
      'Tiered ISR caching with instant stale-while-revalidate edge responses for fast catalog browsing',
      'Server Component streaming of product pricing and real-time inventory availability',
      'Zero-layout-shift (CLS = 0) responsive image optimization pipeline',
      'Optimistic cart updates with offline rollback guards for instant, frictionless checkout'
    ],
    githubUrl: 'https://github.com/bkshaw1994',
    liveUrl: 'https://bishal-portfolio-chi.vercel.app/projects'
  },
  {
    id: 'micro-frontend-design-system',
    title: 'Enterprise Micro-Frontend & Scalable Component System',
    tagline:
      'Monorepo design system architecture with strict TypeScript contracts, zero-runtime CSS tokens, and automated Playwright test gates.',
    category: 'Enterprise Platform & Architecture',
    role: 'Principal Frontend Architect & Design Systems Lead',
    badge: 'Architecture Governance',
    technologies: [
      'Turborepo',
      'Module Federation',
      'TypeScript',
      'Playwright',
      'Jest',
      'Tailwind CSS',
      'GitHub Actions'
    ],
    metrics: [
      { label: 'CI/CD Build Speed', value: '22m → 3.5m', change: '84% faster pipeline', highlight: true },
      { label: 'Core Test Coverage', value: '99.4%', change: 'Playwright E2E + Jest' },
      { label: 'Team Ship Velocity', value: '3x', change: 'Autonomous feature releases' },
      { label: 'Production Regressions', value: '0', change: 'Strict type contracts' }
    ],
    sar: {
      situation:
        'Multiple autonomous product teams across 4 departments were duplicating UI primitives, causing design drift, fragile dependency updates, and slow build pipelines exceeding 22 minutes with zero end-to-end reliability.',
      action:
        'Designed and deployed an enterprise design system and micro-frontend architecture using Turborepo, Module Federation, and strictly typed TypeScript packages. Implemented an automated CI/CD pipeline with Playwright E2E suites, Jest unit coverage guards, and automatic semantic versioning with zero-runtime CSS tokens.',
      result:
        'Reduced CI build times from 22 minutes to 3.5 minutes (84% speedup), achieved 99.4% test coverage on shared core primitives, and accelerated cross-team feature shipping velocity by 3x with zero regression bugs reported in production.'
    },
    architectureHighlights: [
      'Monorepo package isolation with strictly versioned shared component primitives',
      'Automated visual and interaction regression testing using Playwright in GitHub Actions',
      'Zero-runtime design token generation matching strict enterprise brand guidelines',
      'Self-documenting TypeScript contracts preventing cross-team breaking changes'
    ],
    githubUrl: 'https://github.com/bkshaw1994',
    liveUrl: 'https://bishal-portfolio-chi.vercel.app/projects'
  }
];

const CaseStudiesSection = () => {
  const [activeTabs, setActiveTabs] = useState({
    auditpulse: 'sar',
    'ecommerce-architecture': 'sar',
    'micro-frontend-design-system': 'sar'
  });

  const setTab = (projectId, tab) => {
    setActiveTabs((prev) => ({ ...prev, [projectId]: tab }));
  };

  return (
    <section id="case-studies" className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-primary-100/70 border border-primary-200/80 px-3.5 py-1.5 rounded-full text-primary-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} className="text-primary-600" />
            <span>Proven Architectural Impact • Case Studies</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Flagship Proof of Work:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-indigo-600 to-sky-600">
              Built for Speed, Scale & Revenue
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Every architectural engagement is evaluated by business outcomes: slashing latency, passing Core Web Vitals, and unlocking rapid shipping velocity for product teams.
          </p>
        </motion.div>

        {/* 3 Flagship Showcases */}
        <div className="space-y-12">
          {flagshipCaseStudies.map((project, index) => {
            const currentTab = activeTabs[project.id] || 'sar';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden hover:border-primary-500/40 transition-all duration-300"
              >
                {/* Showcase Header Bar */}
                <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/40">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-primary-50 border border-primary-200/80 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wider">
                          {project.badge}
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          {project.category} • {project.role}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-4xl leading-relaxed">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 flex-shrink-0 pt-2 lg:pt-0">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                        >
                          <Github size={15} />
                          <span>View Code</span>
                        </a>
                      )}
                      <Link
                        to="/contact?service=audit"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-sm transition-all"
                      >
                        <span>Audit My Stack</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Quantitative ROI Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                          metric.highlight
                            ? 'bg-gradient-to-br from-primary-50/90 to-indigo-50/60 border-primary-200/90'
                            : 'bg-white border-slate-200/70'
                        }`}
                      >
                        <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {metric.value}
                        </div>
                        <div className="text-xs font-bold text-primary-700 uppercase tracking-wider mt-0.5">
                          {metric.label}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {metric.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SAR & Architecture Deep-Dive Tabs */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 mb-6">
                    <button
                      onClick={() => setTab(project.id, 'sar')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        currentTab === 'sar'
                          ? 'bg-primary-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      SAR Framework (Situation • Action • Result)
                    </button>
                    <button
                      onClick={() => setTab(project.id, 'architecture')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        currentTab === 'architecture'
                          ? 'bg-primary-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      Architecture Highlights & Tech Stack
                    </button>
                  </div>

                  {currentTab === 'sar' ? (
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Situation */}
                      <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-2">
                        <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          <span>The Bottleneck (Situation)</span>
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed">
                          {project.sar.situation}
                        </p>
                      </div>

                      {/* Action */}
                      <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-200/60 space-y-2">
                        <div className="flex items-center space-x-2 text-indigo-800 font-bold text-xs uppercase tracking-wider">
                          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                          <span>The Architecture (Action)</span>
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed">
                          {project.sar.action}
                        </p>
                      </div>

                      {/* Result */}
                      <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 space-y-2">
                        <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>The Impact (Result)</span>
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed font-medium">
                          {project.sar.result}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        {project.architectureHighlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="flex items-start space-x-3 p-4 rounded-xl bg-slate-50 border border-slate-200/70"
                          >
                            <CheckCircle2 size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="pt-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                          Technologies Deployed:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold border border-slate-200/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA & Navigation to All Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 text-center flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/projects" className="btn-secondary !px-6 !py-3">
            <span>Explore All 20+ Repositories & Projects</span>
            <ArrowRight size={16} className="ml-2" />
          </Link>
          <Link to="/contact?service=audit" className="btn-primary !px-6 !py-3">
            <span>Book a 15-Min Architecture Audit</span>
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
