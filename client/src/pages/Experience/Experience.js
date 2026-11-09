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
        <div className="container-custom max-w-5xl mx-auto py-10">
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

  const calculateTenureSpacing = (exp) => {
    if (!exp?.startDate) return 48;
    const start = new Date(exp.startDate);
    const end = exp.endDate ? new Date(exp.endDate) : new Date();
    const months = Math.max(
      1,
      (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth())
    );

    // Spacing scales dynamically as per the tenure period:
    // Base spacing: 48px (< 6 months)
    // Scale up to 120px max for long tenures (3+ years)
    const baseSpacing = 48;
    const maxSpacing = 120;
    return baseSpacing + Math.min(maxSpacing - baseSpacing, Math.round(months * 1.8));
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
        <div className="container-custom max-w-5xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-14 space-y-2">
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
            /* Zigzag Timeline Container */
            <div className="relative">
              {sortedExperience.map((exp, index) => {
                const isEven = index % 2 === 0;
                const tenureSpacing = calculateTenureSpacing(exp);
                const isLast = index === sortedExperience.length - 1;

                return (
                  <motion.div
                    key={exp._id || index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    style={{ marginBottom: isLast ? 0 : `${tenureSpacing}px` }}
                    className="relative group"
                  >
                    {/* Spine Line Segments connecting dots exactly */}
                    {/* Incoming top segment from previous item */}
                    {index > 0 && (
                      <>
                        <div
                          className="hidden md:block absolute left-1/2 -translate-x-1/2 w-px bg-slate-200 z-0"
                          style={{ top: '0px', height: '36px' }}
                        />
                        <div
                          className="md:hidden absolute left-4 -translate-x-1/2 w-px bg-slate-200 z-0"
                          style={{ top: '0px', height: '36px' }}
                        />
                      </>
                    )}

                    {/* Outgoing downward segment to next item */}
                    {!isLast && (
                      <>
                        <div
                          className="hidden md:block absolute left-1/2 -translate-x-1/2 w-px bg-slate-200 z-0"
                          style={{ top: '36px', bottom: `-${tenureSpacing}px` }}
                        />
                        <div
                          className="md:hidden absolute left-4 -translate-x-1/2 w-px bg-slate-200 z-0"
                          style={{ top: '36px', bottom: `-${tenureSpacing}px` }}
                        />
                      </>
                    )}

                    {/* Horizontal Connectors from Dot to Card & Metadata */}
                    {isEven ? (
                      <>
                        {/* Desktop connector line from center dot to left card */}
                        <div
                          className="hidden md:block absolute right-1/2 w-10 h-px bg-slate-200 z-0"
                          style={{ top: '36px' }}
                        />
                        {/* Desktop connector line from center dot to right metadata */}
                        <div
                          className="hidden md:block absolute left-1/2 w-10 h-px bg-slate-200/60 z-0"
                          style={{ top: '36px' }}
                        />
                      </>
                    ) : (
                      <>
                        {/* Desktop connector line from center dot to left metadata */}
                        <div
                          className="hidden md:block absolute right-1/2 w-10 h-px bg-slate-200/60 z-0"
                          style={{ top: '36px' }}
                        />
                        {/* Desktop connector line from center dot to right card */}
                        <div
                          className="hidden md:block absolute left-1/2 w-10 h-px bg-slate-200 z-0"
                          style={{ top: '36px' }}
                        />
                      </>
                    )}

                    {/* Mobile horizontal connector line from left dot to card */}
                    <div
                      className="md:hidden absolute left-4 w-6 h-px bg-slate-200 z-0"
                      style={{ top: '36px' }}
                    />

                    {/* Central / Left Timeline Node Dot */}
                    <div
                      style={{ top: '28px' }}
                      className={`absolute z-10 w-4 h-4 rounded-full border-2 border-white transition-all flex items-center justify-center left-4 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 ${
                        exp.isCurrent
                          ? 'bg-emerald-500 ring-4 ring-emerald-100 shadow-xs'
                          : 'bg-slate-900 ring-4 ring-slate-100 group-hover:bg-slate-950 shadow-2xs'
                      }`}
                    >
                      {exp.isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      )}
                    </div>

                    {/* Row Grid: 2 Columns on Desktop, 1 Column on Mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-start">
                      {isEven ? (
                        <>
                          {/* Left Column: Experience Card */}
                          <div className="pl-10 md:pl-0 md:pr-10 w-full">
                            <div className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-400 transition-colors duration-200 p-6 sm:p-7 shadow-2xs space-y-4">
                              {/* Position & Company Header */}
                              <div className="border-b border-slate-100 pb-4">
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

                                {/* Mobile Date Display */}
                                <div className="md:hidden flex flex-wrap items-center gap-2 font-mono text-xs text-slate-500 mt-2.5">
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

                              {/* Featured Projects in Role */}
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
                          </div>

                          {/* Right Column: Time Period & Tenure Metadata on Desktop */}
                          <div className="hidden md:flex flex-col justify-start pt-7 pl-10 text-left space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/90 text-xs font-mono font-semibold text-slate-900 shadow-2xs w-fit">
                              <Calendar size={13} className="text-slate-500" />
                              <span>{formatDate(exp.startDate)} — {formatDate(exp.endDate)}</span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-white border border-slate-200/60 rounded-md px-2.5 py-1 w-fit">
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Tenure:</span>
                              <span className="font-semibold text-slate-900">{calculateDuration(exp.startDate, exp.endDate)}</span>
                            </div>
                            {(exp.location || exp.workMode) && (
                              <div className="text-[11px] font-mono text-slate-500 pt-0.5">
                                {exp.workMode && <span className="capitalize font-medium text-slate-700">{exp.workMode}</span>}
                                {exp.workMode && exp.location && <span className="text-slate-300 mx-1.5">•</span>}
                                {exp.location && <span>{exp.location}</span>}
                              </div>
                            )}
                            {exp.isCurrent && (
                              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5 mt-1 w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Active Engagement</span>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Left Column: Time Period & Tenure Metadata on Desktop */}
                          <div className="hidden md:flex flex-col justify-start items-end pt-7 pr-10 text-right space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/90 text-xs font-mono font-semibold text-slate-900 shadow-2xs w-fit">
                              <Calendar size={13} className="text-slate-500" />
                              <span>{formatDate(exp.startDate)} — {formatDate(exp.endDate)}</span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-white border border-slate-200/60 rounded-md px-2.5 py-1 w-fit">
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Tenure:</span>
                              <span className="font-semibold text-slate-900">{calculateDuration(exp.startDate, exp.endDate)}</span>
                            </div>
                            {(exp.location || exp.workMode) && (
                              <div className="text-[11px] font-mono text-slate-500 pt-0.5">
                                {exp.workMode && <span className="capitalize font-medium text-slate-700">{exp.workMode}</span>}
                                {exp.workMode && exp.location && <span className="text-slate-300 mx-1.5">•</span>}
                                {exp.location && <span>{exp.location}</span>}
                              </div>
                            )}
                            {exp.isCurrent && (
                              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5 mt-1 w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Active Engagement</span>
                              </div>
                            )}
                          </div>

                          {/* Right Column: Experience Card */}
                          <div className="pl-10 md:pl-10 md:pr-0 w-full">
                            <div className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-400 transition-colors duration-200 p-6 sm:p-7 shadow-2xs space-y-4">
                              {/* Position & Company Header */}
                              <div className="border-b border-slate-100 pb-4">
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

                                {/* Mobile Date Display */}
                                <div className="md:hidden flex flex-wrap items-center gap-2 font-mono text-xs text-slate-500 mt-2.5">
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

                              {/* Featured Projects in Role */}
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
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Bottom Conversion Prompt */}
          <div className="mt-16 p-6 sm:p-7 rounded-xl bg-slate-950 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-bold text-white">
                Looking for senior frontend architecture leadership?
              </h3>
              <p className="text-xs text-slate-300 font-normal">
                Available for high-velocity 2-week performance overhauls, 4-week MVP sprints, or fractional advisory.
              </p>
            </div>
            <Link
              to="/contact?service=audit"
              className="bg-white text-slate-950 hover:bg-slate-100 font-semibold text-xs py-2.5 px-4 rounded-lg whitespace-nowrap inline-flex items-center shadow-xs transition-colors"
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
