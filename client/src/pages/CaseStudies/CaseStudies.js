import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
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
        <title>Architectural Case Studies | Next.js & Core Web Vitals - Bishal Kumar Shaw</title>
        <meta
          name="description"
          content="In-depth architectural case studies using the Situation-Action-Result (SAR) framework. Real metrics on sub-second LCP, bundle reduction, and Next.js performance overhauls."
        />
      </Helmet>

      <div className="pt-24 sm:pt-28 pb-20 bg-slate-50/60 bg-grid-pattern min-h-screen">
        <div className="container-custom">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-primary-100/80 border border-primary-200/80 px-4 py-1.5 rounded-full text-primary-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles size={14} className="text-primary-600" />
              <span>Flagship Proof-of-Work • The SAR Framework</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Architectural Case Studies:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-indigo-600 to-sky-600">
                Speed, Scale & Revenue
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Every architectural engagement is evaluated by concrete business outcomes: slashing latency, passing Core Web Vitals, and unlocking rapid shipping velocity for product teams.
            </p>

            {/* Quick Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All Showcases ({flagshipCaseStudies.length})
              </button>
              <button
                onClick={() => setSelectedFilter('auditpulse')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedFilter === 'auditpulse'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                AuditPulse (Open Source)
              </button>
              <button
                onClick={() => setSelectedFilter('ecommerce-architecture')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedFilter === 'ecommerce-architecture'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                High-Performance E-Commerce
              </button>
              <button
                onClick={() => setSelectedFilter('micro-frontend-design-system')}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedFilter === 'micro-frontend-design-system'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Enterprise Micro-Frontend
              </button>
            </div>
          </motion.div>

          {/* Case Studies Detailed Cards */}
          <div className="space-y-12">
            {filteredStudies.map((project, index) => {
              const currentTab = activeTabs[project.id] || 'sar';

              return (
                <motion.div
                  key={project.id}
                  id={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden scroll-mt-28"
                >
                  {/* Card Header */}
                  <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50/90 via-white to-slate-50/40">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-3 py-1 bg-primary-50 border border-primary-200 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wider">
                            {project.badge}
                          </span>
                          <span className="text-xs font-medium text-slate-500">
                            {project.category} • {project.role}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                          {project.title}
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-4xl leading-relaxed">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Header Actions */}
                      <div className="flex items-center gap-3 flex-shrink-0 pt-2 lg:pt-0">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                          >
                            <Github size={15} />
                            <span>View Source</span>
                          </a>
                        )}
                        <Link
                          to="/contact?service=audit"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-sm transition-all"
                        >
                          <Calendar size={14} />
                          <span>Audit Similar Stack</span>
                        </Link>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
                      {project.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                            metric.highlight
                              ? 'bg-gradient-to-br from-primary-50 to-indigo-50/60 border-primary-200'
                              : 'bg-white border-slate-200/80'
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

                  {/* Tabs & Deep-Dive Content */}
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
                        Architecture Highlights & Technologies
                      </button>
                    </div>

                    {currentTab === 'sar' ? (
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Situation */}
                        <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/70 space-y-2.5">
                          <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            <span>The Bottleneck (Situation)</span>
                          </div>
                          <p className="text-slate-700 text-sm leading-relaxed">
                            {project.sar.situation}
                          </p>
                        </div>

                        {/* Action */}
                        <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200/70 space-y-2.5">
                          <div className="flex items-center space-x-2 text-indigo-800 font-bold text-xs uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                            <span>The Architecture (Action)</span>
                          </div>
                          <p className="text-slate-700 text-sm leading-relaxed">
                            {project.sar.action}
                          </p>
                        </div>

                        {/* Result */}
                        <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-2.5">
                          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span>The Business Impact (Result)</span>
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
                              className="flex items-start space-x-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80"
                            >
                              <CheckCircle2 size={18} className="text-primary-600 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>

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

          {/* Bottom Conversion Prompt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-xl font-bold">
                Facing similar performance or architectural bottlenecks?
              </h3>
              <p className="text-sm text-slate-400">
                Book a 15-minute, zero-sales-pressure architecture audit. We will trace your render waterfall and identify immediate wins.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/services"
                className="btn-secondary !bg-slate-800 !text-white !border-slate-700 hover:!bg-slate-700 !py-3 !px-5 text-xs font-bold uppercase tracking-wider"
              >
                <span>View Fixed Sprints</span>
              </Link>
              <Link
                to="/contact?service=audit"
                className="btn-primary !py-3 !px-6 text-xs font-bold uppercase tracking-wider"
              >
                <span>Book 15-Min Audit</span>
                <ArrowRight size={15} className="ml-1.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CaseStudies;
