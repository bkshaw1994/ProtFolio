import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Github, ArrowUpRight } from 'lucide-react';
import { flagshipCaseStudies } from './CaseStudiesSection';

const CaseStudiesSnapshot = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-100">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mb-12"
        >
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Selected Architectural Case Studies
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
            Proof of Work: Situation, Action, Result
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Real-world performance overhauls delivering sub-second speeds, zero hydration debt, and measurable business conversion lifts.
          </p>
        </motion.div>

        {/* 3 Minimalist Showcase Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch mb-10">
          {flagshipCaseStudies.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="bg-white rounded-xl p-6 border border-slate-200/90 hover:border-slate-400 transition-colors duration-200 flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {project.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {project.role}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-950 tracking-tight mb-2 group-hover:text-slate-700 transition-colors">
                  {project.title.split(':')[0]}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3 font-normal">
                  {project.tagline}
                </p>

                {/* Top 2 Key Metrics */}
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  {project.metrics.slice(0, 2).map((metric) => (
                    <div
                      key={metric.label}
                      className="p-3 rounded-lg bg-slate-50 border border-slate-200/80"
                    >
                      <div className="text-base font-bold font-mono text-slate-950 tracking-tight">
                        {metric.value}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 bg-slate-50 text-slate-400 rounded text-[11px] font-mono">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/case-studies#${project.id}`}
                  className="text-xs font-semibold text-slate-900 hover:text-slate-600 flex items-center gap-1 group/link transition-colors"
                >
                  <span>Read SAR Breakdown</span>
                  <ArrowUpRight size={13} className="text-slate-400 group-hover/link:text-slate-900 transition-colors" />
                </Link>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-slate-800 transition-colors"
                    title="View Source Code"
                  >
                    <Github size={15} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Case Studies Button */}
        <div>
          <Link
            to="/case-studies"
            className="inline-flex items-center text-xs font-semibold text-slate-900 hover:text-slate-600 gap-1.5 transition-colors font-mono"
          >
            <span>Explore all case studies with full architectural breakdowns</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSnapshot;
