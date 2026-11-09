import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Github } from 'lucide-react';
import { flagshipCaseStudies } from './CaseStudiesSection';

const CaseStudiesSnapshot = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-primary-100/80 border border-primary-200/80 px-3.5 py-1.5 rounded-full text-primary-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles size={14} className="text-primary-600" />
            <span>Featured Proof of Work</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Flagship Architectural Case Studies
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Real-world performance transformations delivering sub-second speeds, zero hydration debt, and measurable conversion uplifts.
          </p>
        </motion.div>

        {/* 3 Streamlined Showcase Cards */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-10">
          {flagshipCaseStudies.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-md hover:shadow-xl hover:border-primary-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-2.5 py-1 rounded-md border border-primary-200/60">
                    {project.badge}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    {project.role}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-primary-600 transition-colors">
                  {project.title.split(':')[0]}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.tagline}
                </p>

                {/* Top 2 Key Metrics */}
                <div className="grid grid-cols-2 gap-2.5 mb-6">
                  {project.metrics.slice(0, 2).map((metric) => (
                    <div
                      key={metric.label}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/70"
                    >
                      <div className="text-lg font-black text-slate-900 tracking-tight">
                        {metric.value}
                      </div>
                      <div className="text-[11px] font-bold text-primary-700 uppercase tracking-wider mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-slate-50 text-slate-500 rounded-md text-[11px] font-medium">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/case-studies#${project.id}`}
                  className="text-xs font-bold text-primary-600 hover:text-primary-700 uppercase tracking-wider flex items-center gap-1 group/link"
                >
                  <span>Explore SAR Breakdown</span>
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors"
                    title="View Source Code"
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Case Studies Button */}
        <div className="text-center">
          <Link
            to="/case-studies"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-slate-900 hover:bg-primary-600 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span>View All Detailed Case Studies (SAR Framework)</span>
            <ArrowRight size={15} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSnapshot;
