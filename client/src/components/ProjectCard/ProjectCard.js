import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="card overflow-hidden card-hover group">
      {/* Project Preview/Image */}
      <div className="relative h-48 overflow-hidden">
        {project.liveUrl ? (
          <div className="relative w-full h-full">
            <iframe
              src={project.liveUrl}
              title={project.title}
              className="w-full h-full border-0 pointer-events-none scale-[0.5] origin-top-left"
              style={{ width: '200%', height: '200%' }}
              loading="lazy"
              sandbox="allow-same-origin"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        ) : project.images && project.images[0] ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <div className="text-primary-600 text-4xl font-bold">
              {project.title.charAt(0)}
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`badge text-xs ${
              project.status === 'completed'
                ? 'badge-success'
                : project.status === 'in-progress'
                  ? 'bg-warning-100 text-warning-800'
                  : 'bg-secondary-100 text-secondary-800'
            }`}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-secondary-600 flex items-center space-x-2 mt-1">
              <Tag size={14} />
              <span className="capitalize">{project.category}</span>
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-secondary-700 mb-4 line-clamp-3">
          {project.shortDescription || project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="badge badge-secondary text-xs">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="badge bg-secondary-100 text-secondary-600 text-xs">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Project Links */}
        <div className="flex items-center justify-between">
          <Link
            to={`/projects/${project._id}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1 group/link"
          >
            <span>View Details</span>
            <ExternalLink
              size={14}
              className="group-hover/link:translate-x-0.5 transition-transform"
            />
          </Link>

          <div className="flex items-center space-x-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                onClick={(e) => e.stopPropagation()}
                title="View Code"
              >
                <Github size={16} />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-secondary-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                onClick={(e) => e.stopPropagation()}
                title="Live Demo"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Project Meta */}
        <div className="mt-4 pt-4 border-t border-secondary-100 flex items-center justify-between text-xs text-secondary-500">
          <div className="flex items-center space-x-2">
            <Calendar size={12} />
            <span>{new Date(project.startDate).getFullYear()}</span>
          </div>

          {project.client && (
            <span className="truncate max-w-24">{project.client}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
