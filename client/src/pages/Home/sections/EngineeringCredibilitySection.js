import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  Code2,
  Cloud,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const credibilityPillars = [
  {
    icon: ShieldCheck,
    title: 'Automated Testing & CI/CD Guardrails',
    tag: 'Reliability Gate',
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
    <section className="py-16 sm:py-20 bg-slate-50/50 border-b border-slate-100">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mb-12"
        >
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Engineering Rigor
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
            Architectural Standards & Code Governance
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            How I build systems that scale smoothly from initial seed launch to millions of monthly active users without accumulating crippling technical debt.
          </p>
        </motion.div>

        {/* 4 Credibility Pillars Grid */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {credibilityPillars.map((pillar, idx) => {
            const IconComp = pillar.icon;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="bg-white rounded-xl p-6 border border-slate-200/90 hover:border-slate-400 transition-colors duration-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                      <IconComp size={18} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 font-normal">
                    {pillar.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    {pillar.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                        <CheckCircle2 size={13} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
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
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 p-6 rounded-xl bg-slate-950 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold tracking-tight text-white">
              Ready to verify your frontend architecture?
            </h4>
            <p className="text-xs text-slate-400 font-normal">
              Book a zero-fluff diagnostic on your Core Web Vitals, bundle breakdown, and rendering waterfalls.
            </p>
          </div>

          <Link
            to="/contact?service=audit"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-950 transition-colors whitespace-nowrap"
          >
            <span>Book 15-Min Audit</span>
            <ArrowRight size={13} className="ml-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EngineeringCredibilitySection;
