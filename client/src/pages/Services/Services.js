import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Zap,
  Rocket,
  Shield,
  CheckCircle2,
  ArrowRight,
  Clock,
  Calendar,
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';

const packages = [
  {
    id: 'cwv-overhaul',
    name: 'Core Web Vitals & Performance Overhaul',
    timeline: '2-Week Sprint',
    target: 'Best for: High-Growth SaaS & E-Commerce losing revenue to slow load times',
    tagline:
      'Eliminate UI lag, slash LCP & INP, and pass Google Core Web Vitals with flying colors.',
    highlight: false,
    badge: 'Fixed-Fee Sprint',
    icon: Zap,
    ctaText: 'Book Performance Audit',
    ctaLink: '/contact?service=audit',
    guarantee: 'Guaranteed green Core Web Vitals (LCP < 1.2s, INP < 100ms, CLS < 0.05)',
    deliverables: [
      'Comprehensive Chrome DevTools & Lighthouse CI waterfall audit report',
      'Bundle size reduction, tree-shaking & dynamic code splitting',
      'Next.js SSR/ISR cache tuning & Edge middleware headers',
      'Image, custom font, and 3rd-party script optimization pipeline',
      'Automated CWV regression testing guardrails in GitHub Actions CI',
      '30-day post-launch performance monitoring & regression warranty'
    ]
  },
  {
    id: 'mvp-launchpad',
    name: 'Full-Stack MVP Launchpad',
    timeline: '4-Week Sprint',
    target: 'Best for: Seed-to-Series-A Startups needing to ship in 30 days without technical debt',
    tagline:
      'Go from Figma designs to a production-ready, scalable Next.js application in 30 days.',
    highlight: true,
    badge: 'Flagship Sprint',
    icon: Rocket,
    ctaText: 'Apply for MVP Sprint',
    ctaLink: '/contact?service=mvp',
    guarantee: 'Production-ready architecture, 100% typed contracts & zero technical debt',
    deliverables: [
      'Full Next.js (App Router) architecture with responsive Tailwind UI',
      'PostgreSQL / MongoDB database schema design, indexing & migrations',
      'Robust type-safe API layer (Server Actions / REST / tRPC)',
      'Secure authentication, session management & Role-Based Access Control',
      'Automated testing suite (Jest unit tests + Playwright E2E smoke tests)',
      'Production deployment on Vercel / GCP with custom domain & SSL'
    ]
  },
  {
    id: 'fractional-retainer',
    name: 'Senior Fractional Retainer',
    timeline: 'Monthly Advisory',
    target: 'Best for: CTOs & VPs of Engineering seeking senior firepower without full-time executive overhead',
    tagline:
      'Executive-level frontend architecture, code governance, and engineering mentorship on demand.',
    highlight: false,
    badge: '1-2 Clients Max',
    icon: Shield,
    ctaText: 'Reserve Retainer Spot',
    ctaLink: '/contact?service=retainer',
    guarantee: 'Direct senior architect access with prioritized asynchronous SLA',
    deliverables: [
      'Weekly architecture reviews & technical roadmap alignment',
      'High-leverage PR reviews, code standards & TypeScript strictness',
      'Performance profiling, bottleneck diagnostics & incident triaging',
      'Design system governance & developer experience optimization',
      'Async Slack/Teams channels & mentorship for engineers',
      'Emergency architecture advisory for high-stakes releases'
    ]
  }
];

const faqs = [
  {
    q: 'How quickly can we kick off a sprint?',
    a: 'Following our initial 15-minute architecture audit, sprint kickoffs typically occur within 3 to 7 business days once scope and repository access are established.'
  },
  {
    q: 'What is your Core Web Vitals guarantee?',
    a: 'Every Core Web Vitals Overhaul sprint includes a guaranteed passing grade in Chrome User Experience Report (CrUX) and Lighthouse metrics (LCP < 1.2s, INP < 100ms, CLS < 0.05). If we do not hit agreed-upon metrics, we continue optimizing at zero additional cost until we do.'
  },
  {
    q: 'How do you work with our internal engineering team?',
    a: 'Seamlessly. I operate via GitHub pull requests, small atomic commits, detailed PR descriptions, and asynchronous Slack/Loom walkthroughs. Your team retains full ownership and visibility at every stage.'
  },
  {
    q: 'Do you sign Non-Disclosure Agreements (NDAs)?',
    a: 'Yes, absolutely. Mutual NDAs are standard practice before repository access or code inspection occurs.'
  }
];

const Services = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <Helmet>
        <title>Services & Sprints | Fixed-Scope Packages - Bishal Kumar Shaw</title>
        <meta
          name="description"
          content="Outcome-based, fixed-scope engineering packages: Core Web Vitals Overhauls, Full-Stack MVP Sprints, and Senior Fractional Retainers. No hourly billing—only guaranteed results."
        />
      </Helmet>

      <div className="pt-24 sm:pt-28 pb-20 bg-white min-h-screen">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mb-12"
          >
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Fixed-Scope Engagements & Sprints
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
              How We Can Work Together
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Fixed-scope, outcome-driven packages built for founders and engineering leaders. No vague hourly billing—only tangible speed, clean architecture, and rapid velocity.
            </p>
          </motion.div>

          {/* 3 Packages Grid */}
          <div className="grid lg:grid-cols-3 gap-6 items-stretch mb-16">
            {packages.map((pkg, idx) => {
              const IconComponent = pkg.icon;

              return (
                <motion.div
                  key={pkg.id}
                  id={pkg.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className={`rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 scroll-mt-24 ${
                    pkg.highlight
                      ? 'bg-slate-950 text-white border border-slate-900 shadow-xl relative'
                      : 'bg-white border border-slate-200 hover:border-slate-400 shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                          pkg.highlight
                            ? 'bg-white/10 text-slate-200 border border-white/15'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {pkg.badge}
                      </span>
                      <span
                        className={`text-xs font-mono flex items-center gap-1 ${
                          pkg.highlight ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        <Clock size={12} />
                        {pkg.timeline}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            pkg.highlight
                              ? 'bg-white/10 text-white'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          <IconComponent size={18} />
                        </div>
                        <h2
                          className={`text-lg font-bold tracking-tight leading-snug ${
                            pkg.highlight ? 'text-white' : 'text-slate-950'
                          }`}
                        >
                          {pkg.name}
                        </h2>
                      </div>

                      <div
                        className={`text-[11px] font-mono ${
                          pkg.highlight ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {pkg.target}
                      </div>

                      <p
                        className={`text-xs sm:text-sm leading-relaxed font-normal ${
                          pkg.highlight ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {pkg.tagline}
                      </p>

                      <div
                        className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                          pkg.highlight
                            ? 'bg-white/5 border border-white/10 text-slate-200'
                            : 'bg-slate-50 border border-slate-200/80 text-slate-700'
                        }`}
                      >
                        <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                        <span className="text-[11px] font-mono">{pkg.guarantee}</span>
                      </div>
                    </div>

                    <div
                      className={`pt-4 border-t space-y-2 mb-6 ${
                        pkg.highlight ? 'border-slate-800' : 'border-slate-100'
                      }`}
                    >
                      <div
                        className={`text-[11px] font-mono uppercase tracking-wider mb-2 ${
                          pkg.highlight ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        Deliverables:
                      </div>
                      {pkg.deliverables.map((item, i) => (
                        <div
                          key={i}
                          className={`flex items-start space-x-2 text-xs leading-normal ${
                            pkg.highlight ? 'text-slate-300' : 'text-slate-600'
                          }`}
                        >
                          <CheckCircle2
                            size={13}
                            className={`flex-shrink-0 mt-0.5 ${
                              pkg.highlight ? 'text-slate-400' : 'text-slate-900'
                            }`}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`pt-4 border-t ${pkg.highlight ? 'border-slate-800' : 'border-slate-100'}`}>
                    <Link
                      to={pkg.ctaLink}
                      className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs flex items-center justify-center transition-colors ${
                        pkg.highlight
                          ? 'bg-white text-slate-950 hover:bg-slate-100 shadow-xs'
                          : 'bg-slate-900 text-white hover:bg-slate-800 shadow-2xs'
                      }`}
                    >
                      <span>{pkg.ctaText}</span>
                      <ArrowRight size={13} className="ml-1.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* The 4-Step Sprint Framework */}
          <div className="rounded-xl p-6 sm:p-8 border border-slate-200 bg-slate-50/50 mb-16">
            <div className="max-w-2xl mb-8 space-y-1">
              <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500">
                Process
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                The 4-Step Sprint Execution Framework
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                A disciplined engineering workflow ensuring zero downtime, continuous PR visibility, and verifiable metrics.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-white border border-slate-200/90 space-y-1.5">
                <div className="text-xs font-mono font-bold text-slate-400">01</div>
                <h4 className="text-sm font-bold text-slate-950">Benchmark & Audit</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Capture baseline waterfall traces, profile bundle debt, and identify render-blocking bottlenecks before writing code.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-slate-200/90 space-y-1.5">
                <div className="text-xs font-mono font-bold text-slate-400">02</div>
                <h4 className="text-sm font-bold text-slate-950">Architecture Scope</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Lock down fixed deliverables, API contracts, and milestone dates to eliminate ambiguity and scope creep.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-slate-200/90 space-y-1.5">
                <div className="text-xs font-mono font-bold text-slate-400">03</div>
                <h4 className="text-sm font-bold text-slate-950">Atomic PR Sprints</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Atomic pull requests with full automated test coverage, daily async updates, and staging preview URLs.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-slate-200/90 space-y-1.5">
                <div className="text-xs font-mono font-bold text-slate-400">04</div>
                <h4 className="text-sm font-bold text-slate-950">Verify & Guarantee</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Post-deployment verification against real user traffic, CI/CD regression guards, and a 30-day performance warranty.
                </p>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions (Accordion) */}
          <div className="max-w-3xl mb-16 space-y-6">
            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-1">
                FAQ
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                Frequently Asked Procurement Questions
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = openFaqIndex === i;

                return (
                  <div
                    key={i}
                    className={`rounded-xl border transition-colors bg-white overflow-hidden ${
                      isOpen
                        ? 'border-slate-300 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(i)}
                      aria-expanded={isOpen}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs text-slate-400 font-semibold flex-shrink-0">
                          0{i + 1}
                        </span>
                        <span className="font-bold text-slate-950 text-sm sm:text-base tracking-tight">
                          {faq.q}
                        </span>
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-slate-900' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="faq-content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-5 pt-1 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pl-9 sm:pl-11 border-t border-slate-100">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ready to start */}
          <div className="p-6 sm:p-8 rounded-xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-5 border border-slate-800">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-bold text-white">
                Ready to eliminate UI lag or ship your MVP?
              </h3>
              <p className="text-xs text-slate-400">
                Book a 15-minute, zero-pitch architecture audit. We'll identify Core Web Vitals bottlenecks and outline an actionable fix.
              </p>
            </div>
            <Link
              to="/contact?service=audit"
              className="inline-flex items-center px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              <Calendar size={13} className="mr-1.5" />
              <span>Book 15-Min Audit</span>
              <ArrowUpRight size={13} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
