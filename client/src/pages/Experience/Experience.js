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
  const sortedExperience = [...experience].sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate)
  );

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
        <div className="pt-28 sm:pt-36 min-h-screen bg-slate-50/50">
          <section className="section-padding">
            <div className="container-custom">
              <div className="text-center mb-12">
                <div className="h-12 bg-slate-200 rounded-xl w-64 mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-slate-200 rounded-xl w-96 mx-auto animate-pulse"></div>
              </div>
              <div className="max-w-4xl mx-auto space-y-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonExperience key={index} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 sm:pt-36">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
          <div className="text-rose-500 font-semibold mb-4 text-lg">Failed to load experience details</div>
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
        <title>Experience - Portfolio</title>
        <meta
          name="description"
          content="My work experience and career journey"
        />
      </Helmet>
      <div className="pt-28 sm:pt-36 min-h-screen bg-slate-50/50 bg-grid-pattern pb-20">
        <section className="section-padding py-12">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-primary-100/80 text-primary-800 border border-primary-200/60 px-4 py-2 rounded-full mb-4 shadow-sm">
                <Briefcase size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Career Journey</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                Work Experience
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                My professional career trajectory showcasing {experience.length}+ roles across tech organizations, client projects, and engineering teams.
              </p>
            </div>

            {experience.length === 0 ? (
              <p className="text-lg text-slate-600 text-center">
                No experience data available.
              </p>
            ) : (
              <div className="max-w-4xl mx-auto">
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline gradient bar */}
                  <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-primary-500 via-indigo-500 to-sky-400 rounded-full transform -translate-x-1/2"></div>

                  {sortedExperience.map((exp, index) => (
                    <div key={exp._id} className="relative mb-12 last:mb-0">
                      {/* Timeline dot node */}
                      <div
                        className={`absolute left-8 md:left-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 z-10 flex items-center justify-center ${
                          exp.isCurrent
                            ? 'bg-emerald-500 ring-4 ring-emerald-500/20'
                            : 'bg-primary-600 ring-2 ring-primary-500/20'
                        }`}
                      >
                        {exp.isCurrent && (
                          <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></span>
                        )}
                      </div>

                      {/* Timeline Mini Card */}
                      <div
                        className={`ml-20 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                          index % 2 === 0
                            ? 'md:mr-auto'
                            : 'md:ml-auto'
                        }`}
                      >
                        <motion.button
                          whileHover={{ scale: 1.02, y: -4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedExperience(exp)}
                          className="w-full glass-card p-6 border border-slate-200/80 hover:border-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/15 transition-all duration-300 group text-left cursor-pointer relative overflow-hidden"
                        >
                          {/* Mini card header */}
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                              <div className="flex items-center space-x-2 text-primary-600 text-xs font-bold uppercase tracking-wider mb-1">
                                <Building2 size={13} />
                                <span>{exp.company}</span>
                              </div>
                              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors leading-snug">
                                {exp.position}
                              </h3>
                            </div>
                            {exp.isCurrent && (
                              <span className="px-2.5 py-1 bg-emerald-100/90 text-emerald-800 border border-emerald-200/60 text-[11px] font-extrabold uppercase tracking-wider rounded-full flex-shrink-0">
                                Current
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 mb-3">
                            <div className="flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1 rounded-md">
                              <Calendar size={13} className="text-slate-600" />
                              <span>
                                {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-primary-600 font-semibold bg-primary-50 px-2.5 py-1 rounded-md">
                              <Clock size={13} />
                              <span>{calculateDuration(exp.startDate, exp.endDate)}</span>
                            </div>
                          </div>

                          {exp.location && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 font-medium">
                              <MapPin size={13} className="text-slate-400" />
                              <span>{exp.location}</span>
                            </div>
                          )}

                          {/* Tech pills & Action CTA */}
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                            <div className="flex flex-wrap gap-1.5">
                              {exp.technologies?.slice(0, 3).map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-medium rounded-md border border-slate-200/50"
                                >
                                  {tech}
                                </span>
                              ))}
                              {exp.technologies?.length > 3 && (
                                <span className="px-2 py-0.5 bg-primary-50 text-primary-700 text-[11px] font-bold rounded-md">
                                  +{exp.technologies.length - 3}
                                </span>
                              )}
                            </div>

                            <span className="text-xs font-bold uppercase tracking-wider text-primary-600 flex items-center group-hover:translate-x-1 transition-transform">
                              Details
                              <ChevronRight size={14} className="ml-0.5" />
                            </span>
                          </div>
                        </motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Modal / Popup with Rich Framing */}
        <AnimatePresence>
          {selectedExperience && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
              onClick={() => setSelectedExperience(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
                className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[88vh] flex flex-col overflow-hidden relative my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Banner Header */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-8 relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 pr-6">
                      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-primary-400">
                        <Building2 size={15} />
                        <span>{selectedExperience.company}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                        {selectedExperience.position}
                      </h2>
                      {selectedExperience.location && (
                        <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-medium pt-1">
                          <MapPin size={14} className="text-primary-400 flex-shrink-0" />
                          <span>{selectedExperience.location}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedExperience(null)}
                      className="p-2.5 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white rounded-full transition-all flex-shrink-0"
                      aria-label="Close modal"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Header Meta Pills - Working Period, Work Mode, Type */}
                  <div className="flex flex-wrap items-center gap-2.5 mt-5 pt-3 border-t border-white/10 text-xs font-medium text-slate-200">
                    {/* Working Period */}
                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                      <Calendar size={13} className="text-primary-400" />
                      <span>
                        {formatDate(selectedExperience.startDate)} - {formatDate(selectedExperience.endDate)}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-primary-300 font-semibold">
                      <Clock size={13} />
                      <span>{calculateDuration(selectedExperience.startDate, selectedExperience.endDate)}</span>
                    </div>

                    {/* Work Mode */}
                    {selectedExperience.workMode && (
                      <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full capitalize">
                        <Briefcase size={13} className="text-primary-400" />
                        <span>{selectedExperience.workMode}</span>
                      </div>
                    )}

                    {/* Employment Type */}
                    {selectedExperience.employmentType && (
                      <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full capitalize">
                        <Sparkles size={13} className="text-primary-400" />
                        <span>{selectedExperience.employmentType}</span>
                      </div>
                    )}

                    {/* Current Badge */}
                    {selectedExperience.isCurrent && (
                      <span className="px-3 py-1.5 bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider rounded-full">
                        Current Role
                      </span>
                    )}
                  </div>
                </div>

                {/* Modal Body Content */}
                <div className="p-5 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar flex-grow bg-slate-50/40">
                  {/* Summary */}
                  {selectedExperience.description && (
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Overview
                      </h3>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {selectedExperience.description}
                      </p>
                    </div>
                  )}

                  {/* Key Responsibilities */}
                  {selectedExperience.responsibilities?.length > 0 && (
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Key Responsibilities & Contributions
                      </h3>
                      <ul className="space-y-2.5">
                        {selectedExperience.responsibilities.map((resp) => (
                          <li key={resp} className="text-slate-700 text-sm flex items-start gap-3 leading-relaxed">
                            <CheckCircle2 size={16} className="text-primary-600 flex-shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies Used */}
                  {selectedExperience.technologies?.length > 0 && (
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Technologies & Tools
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedExperience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-slate-100 text-slate-800 text-xs font-semibold rounded-xl border border-slate-200/80 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Projects */}
                  {selectedExperience.keyProjects?.length > 0 && (
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Featured Projects & Impact
                      </h3>
                      <div className="space-y-3">
                        {selectedExperience.keyProjects.map((project) => (
                          <div
                            key={project.name || project.id || project._id}
                            className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-2"
                          >
                            <h4 className="font-bold text-slate-900 text-sm">
                              {project.name}
                            </h4>
                            {project.description && (
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {project.description}
                              </p>
                            )}
                            {project.technologies && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {project.technologies.map((tech, techIdx) => (
                                  <span
                                    key={techIdx}
                                    className="text-[11px] px-2 py-0.5 bg-white text-slate-700 font-medium rounded border border-slate-200/60"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                            {project.impact && (
                              <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60 flex items-start gap-2 mt-2">
                                <Sparkles size={14} className="flex-shrink-0 mt-0.5 text-emerald-600" />
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
