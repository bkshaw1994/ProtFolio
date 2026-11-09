import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Tag,
  Sparkles,
  Code2
} from 'lucide-react';
import { getFileUrl } from '../../utils/apiUrl';

const ProjectCard = ({ project = {} }) => {
  const [imageError, setImageError] = useState(false);

  if (!project) return null;

  const projectLink = project._id ? `/projects/${project._id}` : '/projects';
  const hasImage = Boolean(project.images && project.images[0] && !imageError);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-lg hover:border-slate-400 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between h-full">
      {/* Top Window / Terminal Chrome Bar */}
      <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between select-none">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-800 group-hover:bg-rose-500/80 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-800 group-hover:bg-amber-500/80 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-800 group-hover:bg-emerald-500/80 transition-colors" />
        </div>

        <div className="flex items-center gap-2">
          {project.status ? (
            <span
              className={`inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider px-2 py-0.5 rounded border ${
                project.status.toLowerCase() === 'completed'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-900 text-slate-300 border-slate-700'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  project.status.toLowerCase() === 'completed'
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-slate-400'
                }`}
              />
              {project.status}
            </span>
          ) : project.category ? (
            <span className="font-mono text-2xs uppercase tracking-wider text-slate-400">
              {project.category}
            </span>
          ) : null}
        </div>
      </div>

      {/* Project Preview Area */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950 border-b border-slate-100 flex items-center justify-center">
        {hasImage ? (
          <Link
            to={projectLink}
            className="relative w-full h-full block overflow-hidden group/img"
            tabIndex={-1}
          >
            <img
              src={getFileUrl(project.images[0])}
              alt={project.title || 'Project preview'}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
          </Link>
        ) : (
          <Link
            to={projectLink}
            className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-950 bg-dot-pattern group/preview select-none"
            tabIndex={-1}
          >
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 group-hover:border-slate-700 transition-colors shadow-inner mb-3">
              <Code2 size={22} strokeWidth={1.75} />
            </div>
            <span className="font-mono text-xs font-semibold text-slate-200 tracking-wide truncate max-w-[220px]">
              {project.title || 'Untitled Project'}
            </span>
            <span className="font-mono text-2xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span className="text-emerald-500 font-bold">$</span>
              <span>{project.category || 'production build'}</span>
            </span>
          </Link>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2">
          {/* Eyebrow: Category & Featured Tag */}
          <div className="flex items-center justify-between gap-2">
            {project.category && (
              <div className="flex items-center space-x-1.5 text-xs font-mono font-medium text-slate-500">
                <Tag size={12} className="text-slate-400" />
                <span className="uppercase tracking-wider">{project.category}</span>
              </div>
            )}
            {project.featured && (
              <span className="inline-flex items-center gap-1 font-mono text-2xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded ml-auto">
                <Sparkles size={10} className="fill-amber-500 text-amber-500" />
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <Link to={projectLink} className="block group/title">
            <h3 className="text-lg font-bold text-slate-950 group-hover/title:text-emerald-600 transition-colors line-clamp-1 tracking-tight">
              {project.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
            {project.shortDescription || project.description}
          </p>
        </div>

        {/* Technologies & Action Footer */}
        <div className="space-y-4 pt-1">
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200/60 font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="font-mono text-xs px-2 py-0.5 bg-slate-50 text-slate-600 rounded border border-slate-200">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Project Links & Meta */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              to={projectLink}
              className="text-slate-950 hover:text-emerald-600 font-mono text-xs font-semibold tracking-wider uppercase flex items-center space-x-1.5 group/link transition-colors"
            >
              <span>View Project</span>
              <ArrowUpRight
                size={14}
                className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
              />
            </Link>

            <div className="flex items-center space-x-1">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-500 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                  onClick={(e) => e.stopPropagation()}
                  title="View Source Code"
                  aria-label="View Source Code"
                >
                  <Github size={16} />
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-200"
                  onClick={(e) => e.stopPropagation()}
                  title="Live Preview"
                  aria-label="Live Preview"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;