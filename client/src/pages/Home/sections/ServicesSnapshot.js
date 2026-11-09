import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  Rocket,
  Shield,
  ArrowRight,
  Clock,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

const serviceCards = [
  {
    id: 'cwv-overhaul',
    title: 'Core Web Vitals Overhaul',
    timeline: '2-Week Sprint',
    badge: 'Fixed-Fee Sprint',
    icon: Zap,
    description:
      'Eliminate UI lag, optimize render waterfalls, and achieve sub-second Core Web Vitals (LCP < 1.2s, INP < 100ms).',
    guarantee: 'Guaranteed green Core Web Vitals audit pass',
    link: '/services#cwv-overhaul'
  },
  {
    id: 'mvp-launchpad',
    title: 'Full-Stack MVP Launchpad',
    timeline: '4-Week Sprint',
    badge: 'Flagship Sprint',
    icon: Rocket,
    highlight: true,
    description:
      'From design specs to production Next.js application in 30 days with PostgreSQL, auth, and automated Playwright test suites.',
    guarantee: 'Zero technical debt & 100% typed contracts',
    link: '/services#mvp-launchpad'
  },
  {
    id: 'fractional-retainer',
    title: 'Senior Fractional Retainer',
    timeline: 'Monthly Advisory',
    badge: '1-2 Clients Max',
    icon: Shield,
    description:
      'Executive-level frontend architecture, code governance, high-leverage PR reviews, and engineering mentorship on demand.',
    guarantee: 'Direct senior architect SLA access',
    link: '/services#fractional-retainer'
  }
];

const ServicesSnapshot = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mb-12"
        >
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Engagement Models & Sprints
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
            Fixed-Scope Packages: Zero Ambiguity
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            No vague hourly billing. Predictable, outcome-driven engineering sprints tailored to Seed and Series-A momentum.
          </p>
        </motion.div>

        {/* 3 Clean Package Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch mb-10">
          {serviceCards.map((service, idx) => {
            const IconComp = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`rounded-xl p-6 flex flex-col justify-between transition-all duration-200 ${
                  service.highlight
                    ? 'bg-slate-950 text-white border border-slate-900 shadow-xl relative'
                    : 'bg-white border border-slate-200 hover:border-slate-400 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                        service.highlight
                          ? 'bg-white/10 text-slate-200 border border-white/15'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {service.badge}
                    </span>
                    <span
                      className={`text-xs font-mono flex items-center gap-1 ${
                        service.highlight ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      <Clock size={12} />
                      {service.timeline}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        service.highlight
                          ? 'bg-white/10 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <IconComp size={18} />
                    </div>
                    <h3
                      className={`text-base sm:text-lg font-bold tracking-tight ${
                        service.highlight ? 'text-white' : 'text-slate-950'
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-5 font-normal ${
                      service.highlight ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {service.description}
                  </p>

                  <div
                    className={`p-2.5 rounded-lg text-xs flex items-center gap-2 mb-5 ${
                      service.highlight
                        ? 'bg-white/5 border border-white/10 text-slate-200'
                        : 'bg-slate-50 border border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                    <span className="text-[11px] font-mono">{service.guarantee}</span>
                  </div>
                </div>

                <div
                  className={`pt-4 border-t flex items-center justify-between ${
                    service.highlight ? 'border-slate-800' : 'border-slate-100'
                  }`}
                >
                  <Link
                    to={service.link}
                    className={`text-xs font-semibold flex items-center gap-1 transition-colors ${
                      service.highlight
                        ? 'text-white hover:text-slate-300'
                        : 'text-slate-950 hover:text-slate-600'
                    }`}
                  >
                    <span>View Deliverables & Scope</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Explore Full Services Link */}
        <div>
          <Link
            to="/services"
            className="inline-flex items-center text-xs font-semibold text-slate-900 hover:text-slate-600 gap-1.5 transition-colors font-mono"
          >
            <span>Compare full package scopes, sprint phases, and procurement FAQs</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSnapshot;
