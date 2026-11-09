import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Rocket,
  Shield,
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';

const serviceCards = [
  {
    id: 'cwv-overhaul',
    title: 'The Core Web Vitals Overhaul',
    timeline: '2-Week Sprint',
    badge: 'Fixed-Fee Sprint',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    icon: Zap,
    iconGradient: 'from-emerald-500 to-teal-600',
    description:
      'Eliminate UI lag, optimize render waterfalls, and achieve sub-second Core Web Vitals (LCP < 2.0s, INP < 150ms).',
    guarantee: 'Guaranteed green Core Web Vitals',
    link: '/services#cwv-overhaul'
  },
  {
    id: 'mvp-launchpad',
    title: 'The Full-Stack MVP Launchpad',
    timeline: '4-Week Sprint',
    badge: 'Most Popular Sprint',
    badgeColor: 'bg-primary-600 text-white border-primary-500 shadow-sm',
    icon: Rocket,
    iconGradient: 'from-primary-600 to-indigo-600',
    highlight: true,
    description:
      'From Figma designs to a production-ready Next.js application in 30 days with PostgreSQL, auth, and automated testing.',
    guarantee: 'Zero technical debt & 100% typed contracts',
    link: '/services#mvp-launchpad'
  },
  {
    id: 'fractional-retainer',
    title: 'Senior Fractional Retainer',
    timeline: 'Monthly Advisory',
    badge: 'Limited to 1-2 Clients',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    icon: Shield,
    iconGradient: 'from-indigo-600 to-purple-600',
    description:
      'Executive-level frontend architecture, code governance, high-leverage PR reviews, and engineering mentorship on demand.',
    guarantee: 'Direct senior architect SLA access',
    link: '/services#fractional-retainer'
  }
];

const ServicesSnapshot = () => {
  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-200/80 px-3.5 py-1.5 rounded-full text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-primary-600" />
            <span>How We Can Work Together</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Fixed-Scope Packages & Sprints
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            No vague hourly billing. Choose a predictable, outcome-driven sprint tailored to your startup's growth stage.
          </p>
        </motion.div>

        {/* 3 Clean Package Cards */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-10">
          {serviceCards.map((service, idx) => {
            const IconComp = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  service.highlight
                    ? 'bg-gradient-to-b from-white via-primary-50/25 to-slate-50 border-2 border-primary-500 shadow-xl'
                    : 'bg-white border border-slate-200/90 shadow-md hover:shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${service.badgeColor}`}
                    >
                      {service.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Clock size={12} />
                      {service.timeline}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${service.iconGradient} flex items-center justify-center text-white shadow-sm flex-shrink-0`}
                    >
                      <IconComp size={20} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-medium text-slate-700 flex items-center gap-2 mb-6">
                    <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                    <span>{service.guarantee}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={service.link}
                    className="text-xs font-bold text-primary-600 hover:text-primary-700 uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>View Scope & Deliverables</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Explore Full Services Button */}
        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-800 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-primary-500/50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <span>Explore Full Deliverables, Process & FAQ</span>
            <ArrowRight size={15} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSnapshot;
