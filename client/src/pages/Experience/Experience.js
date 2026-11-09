import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Briefcase,
  X,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Building2,
  Clock
} from 'lucide-react';
import { useGetExperienceQuery } from '../../features/api/apiSlice';
import { SkeletonExperience } from '../../components/Skeleton';

const Experience = () => {
  const {
    data: experienceResponse,
    isLoading,
    isError,
    refetch
  } = useGetExperienceQuery();
  const experience = Array.isArray(experienceResponse)
    ? experienceResponse
    : experienceResponse?.data || [];

  const [selectedExperience, setSelectedExperience] = useState(null);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (selectedExperience) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedExperience]);

  // Sort experiences by start date (newest first)
  const sortedExperience = [...experience].sort((a, b) => {
    if (a.isCurrent && !b.isCurrent) return -1;
    if (!a.isCurrent && b.isCurrent) return 1;
    return new Date(b.startDate || 0) - new Date(a.startDate || 0);
  });

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
    if (!exp?.startDate) return 24;
    const start = new Date(exp.startDate);
    const end = exp.endDate ? new Date(exp.endDate) : new Date();
    const months = Math.max(
      1,
      (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth())
    );
    const baseSpacing = 24;
    const maxSpacing = 48;
    return baseSpacing + Math.min(maxSpacing - baseSpacing, Math.round(months * 0.8));
  };

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Experience - Portfolio</title>
          <meta
            name="description"
            content="My work experience and career journey"
          />
        </Helmet>
        <div className="pt-20 sm:pt-24 min-h-screen bg-white bg-dot-pattern pb-16">
          <div className="container-custom max-w-5xl mx-auto py-8">
            <div className="h-10 bg-slate-200 rounded w-64 mb-4 animate-pulse" />
            <div className="h-5 bg-slate-200 rounded w-96 mb-8 animate-pulse" />
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonExperience key={index} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 sm:pt-24 bg-white">
        <div className="text-center bg-white p-8 rounded-xl shadow-2xs border border-slate-200">
          <div className="text-rose-500 font-mono text-sm mb-4 font-semibold">Failed to load experience details</div>
          <button onClick={() => refetch()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Experience - Portfolio</title>
        <meta
          name="description"
          content="My work experience and career journey"
        />
      </Helmet>

      <div className="pt-20 sm:pt-24 min-h-screen bg-white bg-dot-pattern pb-16">
        <div className="container-custom max-w-5xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-8 sm:mb-10 space-y-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Career Journey
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Work Experience
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              My professional career trajectory showcasing {experience.length}+ roles across tech organizations, client projects, and engineering teams.
            </p>
          </div>

          {experience.length === 0 ? (
            <p className="text-sm text-slate-500 font-mono py-12 text-center">
              No experience data available.
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
                            <motion.button
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => setSelectedExperience(exp)}
                              className="w-full text-left bg-white rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300 p-6 shadow-2xs space-y-4 cursor-pointer"
                            >
                              {/* Position & Company Header */}
                              <div className="border-b border-slate-100 pb-3">
                                <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                  <Building2 size={13} className="text-slate-400" />
                                  <span>{exp.company}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-950 tracking-tight leading-snug">
                                  {exp.position}
                                </h3>

                                {/* Mobile Date Display */}
                                <div className="md:hidden flex flex-wrap items-center gap-2 font-mono text-xs text-slate-500 mt-2">
                                  {exp.isCurrent && (
                                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-semibold uppercase tracking-wider">
                                      Current
                                    </span>
                                  )}
                                  <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 flex items-center gap-1.5 text-[11px]">
                                    <Calendar size={12} className="text-slate-400" />
                                    <span>
                                      {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                                    </span>
                                  </span>
                                </div>
                              </div>

                              {exp.location && (
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                                  <MapPin size={12} className="text-slate-400" />
                                  <span>{exp.location}</span>
                                </div>
                              )}

                              {exp.description && (
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                                  {exp.description}
                                </p>
                              )}

                              {/* Tech pills & Action CTA */}
                              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                <div className="flex flex-wrap gap-1.5">
                                  {exp.technologies?.slice(0, 3).map((tech, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-mono rounded"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                  {(exp.technologies?.length || 0) > 3 && (
                                    <span className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[11px] font-mono rounded">
                                      +{(exp.technologies?.length || 0) - 3}
                                    </span>
                                  )}
                                </div>

                                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-900 flex items-center gap-1">
                                  <span>Details</span>
                                  <ChevronRight size={13} className="text-slate-400" />
                                </span>
                              </div>
                            </motion.button>
                          </div>

                          {/* Right Column: Tenure Metadata on Desktop */}
                          <div className="hidden md:flex flex-col justify-start items-start pt-7 pl-10 text-left space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50/70 border border-slate-200 text-xs font-mono font-semibold text-slate-900 shadow-2xs w-fit">
                              <Calendar size={13} className="text-slate-500" />
                              <span>{formatDate(exp.startDate)} — {formatDate(exp.endDate)}</span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-white border border-slate-200 rounded-md px-2.5 py-1 w-fit">
                              <Clock size={12} className="text-slate-400" />
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Duration:</span>
                              <span className="font-semibold text-slate-900">{calculateDuration(exp.startDate, exp.endDate)}</span>
                            </div>
                            {exp.isCurrent && (
                              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5 mt-1 w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Current Role</span>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Left Column: Tenure Metadata on Desktop */}
                          <div className="hidden md:flex flex-col justify-start items-end pt-7 pr-10 text-right space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50/70 border border-slate-200 text-xs font-mono font-semibold text-slate-900 shadow-2xs w-fit">
                              <Calendar size={13} className="text-slate-500" />
                              <span>{formatDate(exp.startDate)} — {formatDate(exp.endDate)}</span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-white border border-slate-200 rounded-md px-2.5 py-1 w-fit">
                              <Clock size={12} className="text-slate-400" />
                              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Duration:</span>
                              <span className="font-semibold text-slate-900">{calculateDuration(exp.startDate, exp.endDate)}</span>
                            </div>
                            {exp.isCurrent && (
                              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5 mt-1 w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Current Role</span>
                              </div>
                            )}
                          </div>

                          {/* Right Column: Experience Card */}
                          <div className="pl-10 md:pl-10 md:pr-0 w-full">
                            <motion.button
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => setSelectedExperience(exp)}
                              className="w-full text-left bg-white rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300 p-6 shadow-2xs space-y-4 cursor-pointer"
                            >
                              {/* Position & Company Header */}
                              <div className="border-b border-slate-100 pb-3">
                                <div className="flex items-center space-x-2 text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                  <Building2 size={13} className="text-slate-400" />
                                  <span>{exp.company}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-950 tracking-tight leading-snug">
                                  {exp.position}
                                </h3>

                                {/* Mobile Date Display */}
                                <div className="md:hidden flex flex-wrap items-center gap-2 font-mono text-xs text-slate-500 mt-2">
                                  {exp.isCurrent && (
                                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-semibold uppercase tracking-wider">
                                      Current
                                    </span>
                                  )}
                                  <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 flex items-center gap-1.5 text-[11px]">
                                    <Calendar size={12} className="text-slate-400" />
                                    <span>
                                      {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                                    </span>
                                  </span>
                                </div>
                              </div>

                              {exp.location && (
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                                  <MapPin size={12} className="text-slate-400" />
                                  <span>{exp.location}</span>
                                </div>
                              )}

                              {exp.description && (
                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                                  {exp.description}
                                </p>
                              )}

                              {/* Tech pills & Action CTA */}
                              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                <div className="flex flex-wrap gap-1.5">
                                  {exp.technologies?.slice(0, 3).map((tech, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-mono rounded"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                  {(exp.technologies?.length || 0) > 3 && (
                                    <span className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[11px] font-mono rounded">
                                      +{(exp.technologies?.length || 0) - 3}
                                    </span>
                                  )}
                                </div>

                                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-900 flex items-center gap-1">
                                  <span>Details</span>
                                  <ChevronRight size={13} className="text-slate-400" />
                                </span>
                              </div>
                            </motion.button>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal / Popup with Linear / Vercel Aesthetic */}
        <AnimatePresence>
          {selectedExperience && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
              onClick={() => setSelectedExperience(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[88vh] flex flex-col overflow-hidden relative my-auto border border-slate-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-slate-950 text-white p-6 sm:p-7 border-b border-slate-800">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 pr-6">
                      <div className="flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                        <Building2 size={14} className="text-slate-400" />
                        <span>{selectedExperience.company}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                        {selectedExperience.position}
                      </h2>
                      {selectedExperience.location && (
                        <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono pt-1">
                          <MapPin size={13} className="text-slate-400 flex-shrink-0" />
                          <span>{selectedExperience.location}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedExperience(null)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors flex-shrink-0"
                      aria-label="Close modal"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Header Meta Pills */}
                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800 text-xs font-mono">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      <Calendar size={12} className="text-slate-400" />
                      <span>
                        {formatDate(selectedExperience.startDate)} - {formatDate(selectedExperience.endDate)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      <Clock size={12} className="text-slate-400" />
                      <span>{calculateDuration(selectedExperience.startDate, selectedExperience.endDate)}</span>
                    </div>

                    {selectedExperience.workMode && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 capitalize">
                        <Briefcase size={12} className="text-slate-400" />
                        <span>{selectedExperience.workMode}</span>
                      </div>
                    )}

                    {selectedExperience.isCurrent && (
                      <span className="px-2.5 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider rounded">
                        Current Role
                      </span>
                    )}
                  </div>
                </div>

                {/* Modal Body Content */}
                <div className="p-6 sm:p-7 space-y-5 overflow-y-auto flex-grow bg-white">
                  {/* Summary */}
                  {selectedExperience.description && (
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                      <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                        Overview
                      </h3>
                      <p className="text-slate-700 text-sm leading-relaxed font-normal">
                        {selectedExperience.description}
                      </p>
                    </div>
                  )}

                  {/* Key Responsibilities */}
                  {selectedExperience.responsibilities?.length > 0 && (
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
                      <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                        Key Responsibilities & Contributions
                      </h3>
                      <ul className="space-y-2">
                        {selectedExperience.responsibilities.map((resp) => (
                          <li key={resp} className="text-slate-700 text-xs sm:text-sm flex items-start gap-2.5 leading-relaxed">
                            <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies Used */}
                  {selectedExperience.technologies?.length > 0 && (
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2.5 shadow-2xs">
                      <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                        Technologies & Tools
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedExperience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-mono rounded border border-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Projects */}
                  {selectedExperience.keyProjects?.length > 0 && (
                    <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-2xs">
                      <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                        Featured Projects & Impact
                      </h3>
                      <div className="space-y-2.5">
                        {selectedExperience.keyProjects.map((project) => (
                          <div
                            key={project.name || project.id || project._id}
                            className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-200 space-y-1.5"
                          >
                            <h4 className="font-bold text-slate-950 text-sm">
                              {project.name}
                            </h4>
                            {project.description && (
                              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                {project.description}
                              </p>
                            )}
                            {project.technologies && (
                              <div className="flex flex-wrap gap-1 pt-1">
                                {project.technologies.map((tech, techIdx) => (
                                  <span
                                    key={techIdx}
                                    className="text-[11px] px-2 py-0.5 bg-white text-slate-700 font-mono rounded border border-slate-200"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                            {project.impact && (
                              <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-start gap-1.5 mt-2">
                                <Sparkles size={13} className="flex-shrink-0 mt-0.5 text-emerald-600" />
                                <span><strong>Impact:</strong> {project.impact}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Experience;
