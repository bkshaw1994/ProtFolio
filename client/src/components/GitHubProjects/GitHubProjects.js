import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  GitFork,
  Code2,
  Calendar,
  Github,
  ExternalLink,
  AlertTriangle,
  RefreshCw,
  FolderOpen,
  BookOpen
} from 'lucide-react';
import {
  useGetGitHubReposQuery,
  useGetFeaturedGitHubReposQuery,
  useGetGitHubStatsQuery
} from '../../features/api/apiSlice';
import LoadingSpinner from '../LoadingSpinner';

const GitHubProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-400 p-6 shadow-2xs hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between h-full cursor-pointer">
      <div>
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="text-lg font-bold text-slate-950 group-hover:text-slate-800 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <div className="flex space-x-2 text-xs font-mono flex-shrink-0">
            {project.stars > 0 && (
              <span className="flex items-center bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded">
                <Star size={12} className="mr-1 fill-amber-400 text-amber-500" /> {String(project.stars)}
              </span>
            )}
            {project.forks > 0 && (
              <span className="flex items-center bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded">
                <GitFork size={12} className="mr-1 text-slate-500" /> {String(project.forks)}
              </span>
            )}
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 min-h-[3rem]">
          {project.description}
        </p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="font-mono text-xs px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200/60"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="font-mono text-xs px-2 py-0.5 bg-slate-50 text-slate-600 rounded border border-slate-200">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {project.language && (
          <div className="mb-4">
            <span className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-semibold rounded">
              <Code2 size={12} className="mr-1 text-emerald-600" /> {project.language}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-mono text-slate-500">
        <div className="flex items-center">
          <Calendar size={12} className="mr-1 text-slate-400" />
          Updated {new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </div>

        <div className="flex space-x-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 bg-slate-950 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-xs"
          >
            <Github size={13} className="mr-1.5" />
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 bg-white border border-slate-200 text-slate-800 rounded-lg hover:bg-slate-50 transition-colors font-medium text-xs shadow-2xs"
            >
              <ExternalLink size={13} className="mr-1.5" />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const GitHubStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-400 p-5 text-center shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        <div className="text-3xl font-mono font-bold text-slate-950 mb-1">{stats.totalRepos}</div>
        <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500">Repositories</div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-400 p-5 text-center shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        <div className="text-3xl font-mono font-bold text-slate-950 mb-1">{stats.totalStars}</div>
        <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500">Total Stars</div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-400 p-5 text-center shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        <div className="text-3xl font-mono font-bold text-slate-950 mb-1">{stats.totalForks}</div>
        <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500">Total Forks</div>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-400 p-5 text-center shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        <div className="text-3xl font-mono font-bold text-slate-950 mb-1">
          {Object.keys(stats.languages || {}).length}
        </div>
        <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500">Languages</div>
      </div>
    </div>
  );
};

const GitHubProjects = () => {
  const [showAll, setShowAll] = useState(false);
  const {
    data: featuredRepos,
    isLoading: featuredLoading,
    isError: featuredError
  } = useGetFeaturedGitHubReposQuery();

  const {
    data: allRepos,
    isLoading: allLoading,
    isError: allError
  } = useGetGitHubReposQuery({ limit: 20 }, { skip: !showAll });

  const { data: statsData } = useGetGitHubStatsQuery();

  const repos = showAll ? allRepos?.data || [] : featuredRepos?.data || [];
  const isLoading = showAll ? allLoading : featuredLoading;
  const isError = showAll ? allError : featuredError;

  if (isLoading) {
    return <LoadingSpinner message="Fetching GitHub repositories..." />;
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="bg-white p-8 max-w-md mx-auto rounded-xl border border-rose-200 shadow-2xs">
          <AlertTriangle className="mx-auto text-rose-500 mb-4" size={40} />
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Error loading GitHub repositories
          </h3>
          <p className="text-slate-600 text-sm mb-6">
            Please check your network connection or API setup and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary text-xs"
          >
            <RefreshCw size={14} className="mr-2" /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* GitHub Stats Header */}
      {statsData?.data && <GitHubStats stats={statsData.data} />}

      {/* Header with Toggle Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
            {showAll ? 'All GitHub Repositories' : 'Featured GitHub Repositories'}
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            {showAll
              ? 'Comprehensive list of open source repositories and activity'
              : 'Highlighted open source projects with community engagement'}
          </p>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="btn-primary text-xs flex-shrink-0"
        >
          {showAll ? (
            <>
              <Star size={14} className="mr-2 fill-white" /> Show Featured Only
            </>
          ) : (
            <>
              <BookOpen size={14} className="mr-2" /> View All Repositories
            </>
          )}
        </button>
      </div>

      {/* Projects Grid */}
      {repos.length === 0 ? (
        <div className="bg-white text-center py-16 px-6 max-w-md mx-auto rounded-xl border border-slate-200 shadow-2xs">
          <FolderOpen className="mx-auto text-slate-400 mb-4" size={48} />
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            No GitHub repositories found
          </h3>
          <p className="text-slate-600 text-sm">
            {showAll
              ? 'No repositories available'
              : 'No featured repositories available currently.'}
          </p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {repos.map((project, index) => (
              <motion.div
                key={project._id || project.githubUrl || index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <GitHubProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Load More Banner */}
      {!showAll && featuredRepos?.data?.length > 0 && (
        <div className="text-center pt-4">
          <button
            onClick={() => setShowAll(true)}
            className="btn-secondary text-xs"
          >
            View all {allRepos?.data?.length || ''} repositories →
          </button>
        </div>
      )}
    </div>
  );
};

export default GitHubProjects;
