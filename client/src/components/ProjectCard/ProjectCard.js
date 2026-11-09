import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Tag } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-400 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between h-full cursor-pointer">
      {/* Project Preview/Image */}
      <div className="relative h-48 overflow-hidden bg-slate-950 border-b border-slate-100">
        {project.liveUrl ? (
          <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
            <iframe
              src={project.liveUrl}
              title={project.title}
              className="w-full h-full border-0 pointer-events-none scale-[0.5] origin-top-left opacity-90 group-hover:opacity-100 transition-opacity"
              style={{ width: '200%', height: '200%' }}
              loading="lazy"
              sandbox="allow-same-origin"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
          </div>
        ) : project.images && project.images[0] ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-slate-950 flex items-center justify-center">
            <div className="text-slate-200 font-mono text-4xl font-bold tracking-widest">
              {project.title.charAt(0)}
            </div>
          </div>
        )}

        {/* Status Badge */}
        {project.status && (
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`font-mono text-2xs uppercase tracking-wider px-2 py-0.5 rounded border ${
                project.status === 'completed'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {project.status}
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
        <div className="space-y-2">
          {/* Category */}
          {project.category && (
            <div className="flex items-center space-x-1.5 text-xs font-mono font-medium text-slate-500">
              <Tag size={12} />
              <span className="uppercase tracking-wider">{project.category}</span>
            </div>
          )}
          {/* Title */}
          <h3 className="text-lg font-bold text-slate-950 group-hover:text-slate-800 transition-colors line-clamp-1">
            {project.title}
          </h3>
          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
            {project.shortDescription || project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="space-y-4 pt-1">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies?.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200/60"
              >
                {tech}
              </span>
            ))}
            {(project.technologies?.length || 0) > 3 && (
              <span className="font-mono text-xs px-2 py-0.5 bg-slate-50 text-slate-600 rounded border border-slate-200">
                +{(project.technologies?.length || 0) - 3}
              </span>
            )}
          </div>

          {/* Project Links & Meta */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              to={`/projects/${project._id}`}
              className="text-slate-950 hover:text-emerald-600 font-mono text-xs font-semibold tracking-wider uppercase flex items-center space-x-1 group/link"
            >
              <span>View Project</span>
              <ExternalLink
                size={13}
                className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
              />
            </Link>

            <div className="flex items-center space-x-1">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-500 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  title="View Source Code"
                >
                  <Github size={16} />
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-500 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  title="Live Preview"
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
