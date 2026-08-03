import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="glass-card overflow-hidden group hover:-translate-y-2 transition-all duration-500 border border-slate-200/80 hover:border-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/10">
      {/* Project Preview/Image */}
      <div className="relative h-52 overflow-hidden bg-slate-900">
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
          </div>
        ) : project.images && project.images[0] ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-600 via-indigo-600 to-slate-900 flex items-center justify-center">
            <div className="text-white text-5xl font-black tracking-widest drop-shadow-md">
              {project.title.charAt(0)}
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`badge text-xs uppercase tracking-wider ${
              project.status === 'completed'
                ? 'badge-success'
                : project.status === 'in-progress'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-primary-600 mb-1">
            <Tag size={12} />
            <span>{project.category}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
          {project.shortDescription || project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="px-2.5 py-1 bg-slate-100/90 text-slate-700 rounded-lg text-xs font-medium border border-slate-200/60">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-semibold border border-primary-200/60">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Project Links & Meta */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            to={`/projects/${project._id}`}
            className="text-primary-600 hover:text-primary-700 font-semibold text-xs tracking-wider uppercase flex items-center space-x-1 group/link"
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
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
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
                className="p-2 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
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
  );
};

export default ProjectCard;
