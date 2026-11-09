import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Rocket,
  Shield,
  CheckCircle2,
  ArrowRight,
  Clock,
  Calendar
} from 'lucide-react';

const packages = [
  {
    id: 'cwv-overhaul',
    name: 'The Core Web Vitals & Performance Overhaul',
    timeline: '2-Week Sprint',
    target: 'Best for: High-Growth SaaS & E-Commerce losing revenue to slow load times',
    tagline:
      'Eliminate UI lag, slash LCP & INP, and pass Google Core Web Vitals with flying colors.',
    highlight: false,
    badge: 'Fixed-Fee Sprint',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    icon: Zap,
    iconGradient: 'from-emerald-500 to-teal-600',
    ctaText: 'Book Performance Audit',
    ctaLink: '/contact?service=audit',
    guarantee: 'Guaranteed green Core Web Vitals (LCP < 2.0s, INP < 150ms, CLS < 0.05)',
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
    name: 'The Full-Stack MVP Launchpad',
    timeline: '4-Week Sprint',
    target: 'Best for: Seed-to-Series-A Startups needing to ship in 30 days without technical debt',
    tagline:
      'Go from Figma designs to a production-ready, scalable Next.js application in 30 days.',
    highlight: true,
    badge: 'Most Popular Sprint',
    badgeColor: 'bg-primary-600 text-white border-primary-500 shadow-md shadow-primary-500/20',
    icon: Rocket,
    iconGradient: 'from-primary-600 to-indigo-600',
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
    name: 'Senior Fractional Engineering Retainer',
    timeline: 'Monthly Advisory (10–20 hrs/week)',
    target: 'Best for: CTOs & VPs of Engineering seeking senior firepower without full-time executive overhead',
    tagline:
      'Executive-level frontend architecture, code governance, and mentorship on demand.',
    highlight: false,
    badge: 'Limited to 1-2 Clients',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    icon: Shield,
    iconGradient: 'from-indigo-600 to-purple-600',
    ctaText: 'Reserve Retainer Spot',
    ctaLink: '/contact?service=retainer',
    guarantee: 'Direct senior architect access with prioritized asynchronous turnaround',
    deliverables: [
      'Weekly architecture reviews & technical roadmap alignment',
      'High-leverage PR reviews, code standards & TypeScript strictness',
      'Performance profiling, bottleneck diagnostics & incident triaging',
      'Design system governance & developer experience optimization',
      'Async Slack/Teams channels & mentorship for junior/mid engineers',
      'Emergency architecture advisory for high-stakes product releases'
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
    a: 'Every Core Web Vitals Overhaul sprint includes a guaranteed passing grade in Chrome User Experience Report (CrUX) and Lighthouse metrics (LCP < 2.0s, INP < 150ms, CLS < 0.05). If we do not hit agreed-upon metrics, we continue optimizing at zero additional cost until we do.'
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
  return (
    <>
      <Helmet>
        <title>Services & Pricing | Fixed-Scope Engineering Sprints - Bishal Kumar Shaw</title>
        <meta
          name="description"
          content="Outcome-based, fixed-scope engineering packages: Core Web Vitals Overhauls, Full-Stack MVP Sprints, and Senior Fractional Retainers. No hourly billing—only guaranteed results."
        />
      </Helmet>

      <div className="pt-24 sm:pt-28 pb-20 bg-slate-50/60 bg-grid-pattern min-h-screen">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-primary-100/80 border border-primary-200/80 px-4 py-1.5 rounded-full text-primary-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles size={14} className="text-primary-600" />
              <span>High-Ticket Sprints & Retainers</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              How We Can Work Together
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Fixed-scope, outcome-driven packages built for founders and engineering leaders. No vague hourly billing—only tangible speed, clean architecture, and rapid velocity.
            </p>
          </motion.div>

          {/* 3 Packages Grid */}
          <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-20">
            {packages.map((pkg, idx) => {
              const IconComponent = pkg.icon;

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                    pkg.highlight
                      ? 'bg-gradient-to-b from-white via-primary-50/20 to-slate-50 border-2 border-primary-500 shadow-2xl shadow-primary-500/10 lg:-translate-y-2'
                      : 'bg-white border border-slate-200/90 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${pkg.badgeColor}`}
                    >
                      {pkg.badge}
                    </span>
                    <span className="inline-flex items-center text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Clock size={12} className="mr-1" />
                      {pkg.timeline}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${pkg.iconGradient} flex items-center justify-center text-white shadow-md`}
                      >
                        <IconComponent size={24} />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                        {pkg.name}
                      </h2>
                    </div>

                    <p className="text-xs font-bold uppercase tracking-wider text-primary-700">
                      {pkg.target}
                    </p>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {pkg.tagline}
                    </p>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800 flex items-start space-x-2">
                      <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{pkg.guarantee}</span>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-2.5">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Scope of Deliverables:
                      </div>
                      {pkg.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 size={15} className="text-primary-600 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 mt-6 border-t border-slate-100">
                    <Link
                      to={pkg.ctaLink}
                      className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center transition-all duration-200 group ${
                        pkg.highlight
                          ? 'bg-gradient-to-r from-primary-600 via-primary-700 to-indigo-700 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/35 transform hover:-translate-y-0.5'
                          : 'bg-slate-900 text-white hover:bg-primary-600 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <span>{pkg.ctaText}</span>
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* The 4-Step Sprint Framework */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl mb-20"
          >
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                The 4-Step Sprint Framework
              </h3>
              <p className="text-sm sm:text-base text-slate-600">
                A disciplined, battle-tested engineering process ensuring speed, zero downtime, and complete alignment.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-2xl font-black text-primary-600">01</div>
                <h4 className="font-bold text-slate-900">Benchmark & Audit</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We capture baseline waterfall traces, profile bundle debt, and identify render-blocking bottlenecks before writing a line of code.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-2xl font-black text-indigo-600">02</div>
                <h4 className="font-bold text-slate-900">Architecture Scope</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We lock down fixed deliverables, API contracts, and milestone dates so there is zero ambiguity or scope creep.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-2xl font-black text-emerald-600">03</div>
                <h4 className="font-bold text-slate-900">Rapid PR Execution</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Atomic pull requests with full automated tests, daily async updates, and staging preview URLs for continuous review.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-2xl font-black text-slate-800">04</div>
                <h4 className="font-bold text-slate-900">Verify & Guarantee</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Post-deployment verification against real user traffic, CI/CD regression guards, and a 30-day performance warranty.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Frequently Asked Questions */}
          <div className="max-w-3xl mx-auto mb-20 space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2"
                >
                  <h4 className="font-bold text-slate-900 text-base flex items-start gap-2">
                    <span className="text-primary-600">Q.</span>
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed pl-5">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ready to start */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white text-center max-w-3xl mx-auto space-y-6"
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to eliminate latency or ship your MVP?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Book a 15-minute, zero-pitch architecture audit. We'll identify your Core Web Vitals bottlenecks and map out an actionable optimization plan.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/contact?service=audit"
                className="btn-primary !px-8 !py-3.5 text-sm font-bold uppercase tracking-wider"
              >
                <Calendar size={16} className="mr-2" />
                <span>Book 15-Min Architecture Audit</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Services;
