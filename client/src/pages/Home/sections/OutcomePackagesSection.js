import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  Rocket,
  Shield,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  Calendar
} from 'lucide-react';

const packages = [
  {
    id: 'cwv-overhaul',
    name: 'The Core Web Vitals & Performance Overhaul',
    timeline: '2-Week Sprint',
    target: 'Best for: High-Growth SaaS & E-Commerce with UI Lag',
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
      'Comprehensive Chrome DevTools & Lighthouse CI waterfall audit',
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
    target: 'Best for: Funded Seed-to-Series-A Startups Ready to Ship',
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
    timeline: 'Monthly Advisory',
    target: 'Best for: CTOs & VPs of Eng Needing Senior Firepower',
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

const OutcomePackagesSection = () => {
  return (
    <section id="packages" className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200/80 px-3.5 py-1.5 rounded-full text-slate-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={14} className="text-primary-600" />
            <span>High-Ticket Sprints & Fractional Retainers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            How We Can Work Together
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Predictable, fixed-scope engagements designed for high-growth startups and brands. No vague hourly billing—only tangible business velocity and sub-second performance.
          </p>
        </motion.div>

        {/* 3 Outcome-Based Packages Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => {
            const IconComponent = pkg.icon;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  pkg.highlight
                    ? 'bg-gradient-to-b from-white via-primary-50/20 to-slate-50 border-2 border-primary-500 shadow-2xl shadow-primary-500/10 lg:-translate-y-3'
                    : 'bg-white border border-slate-200/90 shadow-lg hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {/* Top Badge */}
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

                {/* Package Title & Header */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${pkg.iconGradient} flex items-center justify-center text-white shadow-md`}
                    >
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                        {pkg.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-primary-700">
                    {pkg.target}
                  </p>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {pkg.tagline}
                  </p>

                  {/* Guarantee Box */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800 flex items-start space-x-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{pkg.guarantee}</span>
                  </div>

                  {/* Deliverables List */}
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

                {/* CTA Button */}
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

        {/* Custom Scope / FAQ Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-slate-900">
              Need a custom architecture sprint or emergency turnaround?
            </h4>
            <p className="text-sm text-slate-600">
              Have unique compliance, micro-frontend migration, or multi-tenant database requirements? Let's discuss a tailored engagement.
            </p>
          </div>

          <Link
            to="/contact?service=custom"
            className="btn-outline !py-3 !px-6 whitespace-nowrap text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center"
          >
            <Calendar size={16} className="mr-2" />
            <span>Schedule Intro Discussion</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OutcomePackagesSection;
