import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Github,
  ArrowRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { flagshipCaseStudies } from '../Home/sections/CaseStudiesSection';

const CaseStudies = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeTabs, setActiveTabs] = useState({
    auditpulse: 'sar',
    'ecommerce-architecture': 'sar',
    'micro-frontend-design-system': 'sar'
  });

  const setTab = (projectId, tab) => {
    setActiveTabs((prev) => ({ ...prev, [projectId]: tab }));
  };

  const filteredStudies =
    selectedFilter === 'all'
      ? flagshipCaseStudies
      : flagshipCaseStudies.filter((item) => item.id === selectedFilter);

  return (
    <>
      <Helmet>
        <title>Architectural Case Studies | Next.js & Performance - Bishal Kumar Shaw</title>
        <meta
          name="description"
          content="In-depth architectural case studies using the Situation-Action-Result (SAR) framework. Real metrics on sub-second LCP, bundle reduction, and Next.js performance overhauls."
        />
      </Helmet>

      <div className="pt-24 sm:pt-28 pb-20 bg-white min-h-screen">
        <div className="container-custom">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mb-10"
          >
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Flagship Proof of Work • SAR Framework
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
              Architectural Case Studies: Speed, Scale & Revenue
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Every architectural engagement is evaluated by concrete engineering and business outcomes: slashing latency, passing Core Web Vitals, and unlocking shipping velocity.
            </p>

            {/* Quick Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-6">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-950'
                }`}
              >
                All Showcases ({flagshipCaseStudies.length})
              </button>
              <button
                onClick={() => setSelectedFilter('auditpulse')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                  selectedFilter === 'auditpulse'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-950'
                }`}
              >
                AuditPulse (Open Source)
              </button>
              <button
                onClick={() => setSelectedFilter('ecommerce-architecture')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                  selectedFilter === 'ecommerce-architecture'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-950'
                }`}
              >
                E-Commerce Architecture
              </button>
              <button
                onClick={() => setSelectedFilter('micro-frontend-design-system')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                  selectedFilter === 'micro-frontend-design-system'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-950'
                }`}
              >
                Enterprise Micro-Frontend
              </button>
            </div>
          </motion.div>

          {/* Case Studies Detailed Cards */}
          <div className="space-y-10">
            {filteredStudies.map((project, index) => {
              const currentTab = activeTabs[project.id] || 'sar';

              return (
                <motion.div
                  key={project.id}
                  id={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden scroll-mt-24"
                >
                  {/* Card Header */}
                  <div className="p-6 sm:p-7 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-mono font-semibold">
                            {project.badge}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            {project.category} • {project.role}
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                          {project.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-4xl leading-relaxed font-normal">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Header Actions */}
                      <div className="flex items-center gap-2.5 flex-shrink-0 pt-1 lg:pt-0">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                          >
                            <Github size={14} />
                            <span>Source</span>
                          </a>
                        )}
                        <Link
                          to="/contact?service=audit"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                        >
                          <Calendar size={13} />
                          <span>Audit Similar Stack</span>
                        </Link>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
                      {project.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="p-3.5 rounded-lg border border-slate-200/90 bg-white"
                        >
                          <div className="text-xl font-bold font-mono text-slate-950 tracking-tight">
                            {metric.value}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5">
                            {metric.label}
                          </div>
                          <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
                            {metric.change}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tabs & Deep-Dive Content */}
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center space-x-1.5 border-b border-slate-200 pb-3 mb-6">
                      <button
                        onClick={() => setTab(project.id, 'sar')}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${
                          currentTab === 'sar'
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                        }`}
                      >
                        SAR Framework (Situation • Action • Result)
                      </button>
                      <button
                        onClick={() => setTab(project.id, 'architecture')}
                        className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${
                          currentTab === 'architecture'
                            ? 'bg-slate-900 text-white'
                            : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                        }`}
                      >
                        Architecture Highlights & Technologies
                      </button>
                    </div>

                    {currentTab === 'sar' ? (
                      <div className="grid md:grid-cols-3 gap-5">
                        {/* Situation */}
                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
                          <div className="flex items-center space-x-2 text-slate-900 font-mono text-xs font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            <span>The Bottleneck (Situation)</span>
                          </div>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                            {project.sar.situation}
                          </p>
                        </div>

                        {/* Action */}
                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
                          <div className="flex items-center space-x-2 text-slate-900 font-mono text-xs font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                            <span>The Architecture (Action)</span>
                          </div>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                            {project.sar.action}
                          </p>
                        </div>

                        {/* Result */}
                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
                          <div className="flex items-center space-x-2 text-slate-900 font-mono text-xs font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            <span>The Business Impact (Result)</span>
                          </div>
                          <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                            {project.sar.result}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-3.5">
                          {project.architectureHighlights.map((highlight, idx) => (
                            <div
                              key={idx}
                              className="flex items-start space-x-2.5 p-3.5 rounded-lg bg-slate-50 border border-slate-200/80"
                            >
                              <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-700 text-xs leading-relaxed font-normal">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2">
                          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2">
                            Technologies Deployed:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-xs font-mono"
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

          {/* Bottom Conversion Prompt */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-12 p-6 sm:p-7 rounded-xl bg-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-5 border border-slate-800"
          >
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-base font-bold text-white">
                Facing similar performance or architectural bottlenecks?
              </h3>
              <p className="text-xs text-slate-400">
                Book a 15-minute, zero-sales-pressure architecture audit. We will trace your render waterfall and identify immediate wins.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/services"
                className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
              >
                <span>View Sprints</span>
              </Link>
              <Link
                to="/contact?service=audit"
                className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-colors"
              >
                <span>Book 15-Min Audit</span>
                <ArrowRight size={13} className="ml-1.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CaseStudies;
