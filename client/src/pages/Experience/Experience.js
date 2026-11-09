import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Building2,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetExperienceQuery } from '../../features/api/apiSlice';
import { SkeletonExperience } from '../../components/Skeleton';

const Experience = () => {
  const { data: experienceData = { data: [] }, isLoading, isError, refetch } = useGetExperienceQuery();
  const experience = experienceData?.data || [];

  const sortedExperience = [...experience].sort((a, b) => {
    if (a.isCurrent && !b.isCurrent) return -1;
    if (!a.isCurrent && b.isCurrent) return 1;
    return new Date(b.startDate || 0) - new Date(a.startDate || 0);
  });

  if (isLoading) {
    return (
      <div className="pt-24 sm:pt-28 min-h-screen bg-white">
        <div className="container-custom max-w-4xl mx-auto py-10">
          <div className="h-10 bg-slate-200 rounded w-64 mb-4 animate-pulse" />
          <div className="h-5 bg-slate-200 rounded w-96 mb-12 animate-pulse" />
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonExperience key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 sm:pt-28 bg-white">
        <div className="text-center">
          <div className="text-red-500 font-mono text-sm mb-4">Failed to load experience details</div>
          <button onClick={() => refetch()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return 'Present';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0 && remainingMonths > 0) {
      return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    }
  };

  return (
    <>
      <Helmet>
        <title>Engineering Experience & Track Record - Bishal Kumar Shaw</title>
        <meta
          name="description"
          content="9+ years of professional engineering leadership delivering high-concurrency systems, micro-frontends, and sub-second performance overhauls."
        />
      </Helmet>

      <div className="pt-24 sm:pt-28 min-h-screen bg-white pb-20">
        <div className="container-custom max-w-4xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-12 space-y-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500">
              Career Trajectory & Track Record
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Engineering Leadership & Experience
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              9+ years of hands-on technical leadership: scaling web architectures, micro-frontends, and high-concurrency systems for high-growth tech brands.
            </p>
          </div>

          {sortedExperience.length === 0 ? (
            <p className="text-sm text-slate-500 font-mono py-12 text-center">
              No experience records available.
            </p>
          ) : (
            /* Left-Anchored Continuous Linear Timeline */
            <div className="relative pl-6 sm:pl-8 space-y-10 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-px before:bg-slate-200">
              {sortedExperience.map((exp, index) => (
                <motion.div
                  key={exp._id || index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="relative group"
                >
                  {/* Timeline Node Indicator */}
                  <div
                    className={`absolute -left-[1.85rem] sm:-left-[2.35rem] top-1.5 w-3 h-3 rounded-full border-2 border-white transition-all ${
                      exp.isCurrent
                        ? 'bg-emerald-500 ring-4 ring-emerald-100'
                        : 'bg-slate-400 group-hover:bg-slate-900'
                    }`}
                  />

                  {/* Experience Card */}
                  <div className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-400 transition-colors duration-200 p-6 sm:p-7 shadow-2xs space-y-4">
                    {/* Position & Company Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          <Building2 size={13} className="text-slate-400" />
                          <span>{exp.company}</span>
                          {exp.location && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span className="text-slate-400 font-normal lowercase">{exp.location}</span>
                            </>
                          )}
                        </div>
                        <h2 className="text-xl font-bold text-slate-950 tracking-tight">
                          {exp.position}
                        </h2>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-500">
                        {exp.isCurrent && (
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-semibold uppercase tracking-wider">
                            Current Role
                          </span>
                        )}
                        <span className="px-2.5 py-1 bg-slate-100 rounded text-slate-700 flex items-center gap-1.5">
                          <Calendar size={12} className="text-slate-400" />
                          <span>
                            {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                          </span>
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          ({calculateDuration(exp.startDate, exp.endDate)})
                        </span>
                      </div>
                    </div>

                    {/* Role Description */}
                    {exp.description && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {exp.description}
                      </p>
                    )}

                    {/* Key Responsibilities & Contributions */}
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                          Key Deliverables & Architectural Impact:
                        </div>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 leading-relaxed">
                              <CheckCircle2 size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Featured Projects in Role (if available) */}
                    {exp.keyProjects && exp.keyProjects.length > 0 && (
                      <div className="space-y-2.5 pt-2">
                        <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                          Highlighted Projects:
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {exp.keyProjects.map((proj, pIdx) => (
                            <div key={pIdx} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                              <div className="text-xs font-bold text-slate-900">{proj.name}</div>
                              {proj.description && (
                                <p className="text-[11px] text-slate-600 leading-normal">{proj.description}</p>
                              )}
                              {proj.impact && (
                                <div className="text-[11px] font-mono text-emerald-700 flex items-center gap-1 mt-1">
                                  <Sparkles size={11} className="text-emerald-600" />
                                  <span>{proj.impact}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies & Tools */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mr-1">
                          Stack:
                        </span>
                        {exp.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Bottom Conversion Prompt */}
          <div className="mt-14 p-6 sm:p-7 rounded-xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-5 border border-slate-800">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-bold text-white">
                Looking for senior frontend architecture leadership?
              </h3>
              <p className="text-xs text-slate-400 font-normal">
                Available for high-velocity 2-week performance overhauls, 4-week MVP sprints, or fractional advisory.
              </p>
            </div>
            <Link
              to="/contact?service=audit"
              className="inline-flex items-center px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              <span>Book 15-Min Audit</span>
              <ArrowRight size={13} className="ml-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;
