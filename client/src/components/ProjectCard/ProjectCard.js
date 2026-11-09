import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-400 transition-colors duration-200 shadow-2xs overflow-hidden flex flex-col justify-between group h-full">
      {/* Top Preview / Window Header */}
      <div>
        <div className="bg-slate-950 p-4 border-b border-slate-800 text-slate-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="text-[10px] font-mono text-slate-500 ml-2">
                {project.category || 'architecture'}
              </span>
            </div>
            <span
              className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                project.status === 'completed'
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/80'
                  : 'bg-amber-950/80 text-amber-400 border border-amber-800/80'
              }`}
            >
              {project.status || 'production'}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-slate-100 font-bold text-base tracking-tight font-sans line-clamp-1 group-hover:text-slate-200 transition-colors">
              {project.title}
            </div>
            {project.role && (
              <div className="text-[11px] text-slate-400 font-mono">
                Role: {project.role}
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
            {project.shortDescription || project.description}
          </p>

          {/* Technologies Stack Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies?.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-mono"
              >
                {tech}
              </span>
            ))}
            {(project.technologies?.length || 0) > 4 && (
              <span className="px-2 py-0.5 bg-slate-50 text-slate-400 rounded text-[11px] font-mono">
                +{(project.technologies?.length || 0) - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={`/projects/${project._id}`}
          className="text-xs font-semibold text-slate-900 hover:text-slate-600 flex items-center gap-1 transition-colors group/link"
        >
          <span>Architecture Details</span>
          <ArrowRight size={13} className="text-slate-400 group-hover/link:text-slate-900 transition-colors" />
        </Link>

        <div className="flex items-center space-x-1.5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors rounded"
              title="GitHub Repository"
            >
              <Github size={15} />
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors rounded"
              title="Live Demo"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
