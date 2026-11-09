import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  Code2,
  Cloud,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const credibilityPillars = [
  {
    icon: ShieldCheck,
    title: 'Automated Testing & CI/CD Guardrails',
    tag: 'Reliability Gate',
    gradient: 'from-emerald-500 to-teal-600',
    border: 'hover:border-emerald-500/40',
    description:
      'Zero broken builds in production. Every feature is guarded by comprehensive Playwright end-to-end tests, Jest unit suites, and strict GitHub Actions CI/CD gates that catch regressions before staging.',
    bullets: [
      'Playwright E2E smoke and visual regression tests',
      'Jest & React Testing Library coverage for core logic',
      'Automated semantic releases and PR preview environments',
      'Zero-regression deployment track record'
    ]
  },
  {
    icon: Zap,
    title: 'Sub-Second Performance & Core Web Vitals',
    tag: 'Conversion Engine',
    gradient: 'from-primary-600 to-sky-500',
    border: 'hover:border-primary-500/40',
    description:
      'Obsessive performance optimization. Deep profiling with Chrome DevTools, eliminating JavaScript hydration bottlenecks, streaming React Server Components, and multi-tier Edge caching.',
    bullets: [
      'Next.js (App Router) with tiered ISR & Edge caching',
      'Sub-1.2s Target LCP and 98+ Lighthouse scores',
      'Tree-shaking, code-splitting & third-party script deferral',
      'Eliminated hydration mismatches and layout shifts'
    ]
  },
  {
    icon: Code2,
    title: 'Strict TypeScript & Resilient API Architecture',
    tag: 'Type Safety',
    gradient: 'from-indigo-600 to-purple-600',
    border: 'hover:border-indigo-500/40',
    description:
      'End-to-end type safety from database schemas to client views. Strict TypeScript compiler settings, schema validation with Zod, and clear separation of business logic and presentation.',
    bullets: [
      'Strict TypeScript contracts across entire client & server',
      'Type-safe REST, GraphQL, and Server Action payloads',
      'Clean domain-driven modular component architecture',
      'Rapid refactoring velocity with zero runtime surprises'
    ]
  },
  {
    icon: Cloud,
    title: 'Enterprise Cloud Scalability & Zero-Downtime',
    tag: 'Infrastructure',
    gradient: 'from-slate-800 to-slate-900',
    border: 'hover:border-slate-500/40',
    description:
      'Cloud deployments built to handle traffic surges without degradation. Multi-region Vercel Edge networks, containerized Google Cloud (GCP) microservices, and distributed Redis caching.',
    bullets: [
      'Vercel Edge network & Google Cloud Platform (GCP)',
      'Redis distributed caching and BullMQ task queues',
      'Dockerized environments with environment isolation',
      'Zero-downtime rolling updates and instant rollbacks'
    ]
  }
];

const EngineeringCredibilitySection = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50/80 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-slate-200/80 border border-slate-300/80 px-3.5 py-1.5 rounded-full text-slate-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} className="text-primary-600" />
            <span>Senior Architectural Rigor</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Engineering Standards & Technical Credibility
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            How I build systems that scale effortlessly from seed launch to millions of monthly active users without accumulating crippling technical debt.
          </p>
        </motion.div>

        {/* 4 Credibility Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {credibilityPillars.map((pillar, idx) => {
            const IconComp = pillar.icon;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 ${pillar.border} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${pillar.gradient} flex items-center justify-center text-white shadow-md`}
                    >
                      <IconComp size={28} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100">
                    {pillar.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="font-medium">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-primary-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold tracking-tight">
              Ready to verify your frontend architecture?
            </h4>
            <p className="text-sm text-slate-300">
              Get an actionable, no-obligation audit of your Core Web Vitals, bundle breakdown, and component re-renders.
            </p>
          </div>

          <Link
            to="/contact?service=audit"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-sm bg-primary-500 hover:bg-primary-400 text-white shadow-lg shadow-primary-500/25 transition-all whitespace-nowrap"
          >
            <span>Book 15-Min Architecture Audit</span>
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EngineeringCredibilitySection;
