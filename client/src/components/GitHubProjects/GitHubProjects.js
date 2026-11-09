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
    <div className="bg-white rounded-xl p-5 border border-slate-200/90 hover:border-slate-400 transition-colors duration-200 shadow-2xs flex flex-col justify-between h-full group">
      <div>
        <div className="flex justify-between items-start mb-2.5 gap-2">
          <h3 className="text-base font-bold text-slate-950 group-hover:text-slate-700 transition-colors line-clamp-1 font-mono">
            {project.title}
          </h3>
          <div className="flex items-center space-x-1.5 text-xs font-mono flex-shrink-0">
            {project.stars > 0 && (
              <span className="flex items-center bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                <Star size={11} className="mr-1 fill-amber-400 text-amber-500" /> {String(project.stars)}
              </span>
            )}
            {project.forks > 0 && (
              <span className="flex items-center bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                <GitFork size={11} className="mr-1 text-slate-500" /> {String(project.forks)}
              </span>
            )}
          </div>
        </div>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 font-normal">
          {project.description || 'Public GitHub repository and open source tooling.'}
        </p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-mono"
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
        )}

        {project.language && (
          <div className="mb-4">
            <span className="inline-flex items-center px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-mono rounded">
              <Code2 size={12} className="mr-1 text-slate-500" /> {project.language}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500 font-mono">
        <div className="flex items-center text-[11px]">
          <Calendar size={12} className="mr-1 text-slate-400" />
          {new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </div>

        <div className="flex items-center space-x-1.5">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2.5 py-1 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors font-sans text-xs font-semibold"
          >
            <Github size={12} className="mr-1" />
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-2.5 py-1 bg-white text-slate-900 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors font-sans text-xs font-semibold"
            >
              <ExternalLink size={12} className="mr-1" />
              Demo
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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      <div className="p-4 rounded-xl border border-slate-200 bg-white">
        <div className="text-2xl font-bold font-mono text-slate-950">{stats.totalRepos}</div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">Repositories</div>
      </div>
      <div className="p-4 rounded-xl border border-slate-200 bg-white">
        <div className="text-2xl font-bold font-mono text-slate-950">{stats.totalStars}</div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">Total Stars</div>
      </div>
      <div className="p-4 rounded-xl border border-slate-200 bg-white">
        <div className="text-2xl font-bold font-mono text-slate-950">{stats.totalForks}</div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">Total Forks</div>
      </div>
      <div className="p-4 rounded-xl border border-slate-200 bg-white">
        <div className="text-2xl font-bold font-mono text-slate-950">
          {Object.keys(stats.languages || {}).length}
        </div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">Languages</div>
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
        <div className="bg-white p-6 max-w-md mx-auto border border-slate-200 rounded-xl">
          <AlertTriangle className="mx-auto text-amber-500 mb-3" size={36} />
          <h3 className="text-base font-bold text-slate-900 mb-1 font-mono">
            Error loading GitHub repositories
          </h3>
          <p className="text-slate-600 text-xs mb-4">
            Please check your network connection or API setup and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary text-xs"
          >
            <RefreshCw size={13} className="mr-1.5" /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* GitHub Stats Header */}
      {statsData?.data && <GitHubStats stats={statsData.data} />}

      {/* Header with Toggle Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-50/50 p-5 rounded-xl border border-slate-200/90">
        <div>
          <h2 className="text-lg font-bold text-slate-950 tracking-tight">
            {showAll ? 'All GitHub Repositories' : 'Featured Open-Source Repositories'}
          </h2>
          <p className="text-slate-600 text-xs font-normal mt-0.5">
            {showAll
              ? 'Complete list of open-source repositories and experimental packages'
              : 'Selected open-source repositories with active community stars'}
          </p>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex-shrink-0"
        >
          {showAll ? (
            <>
              <Star size={13} className="mr-1.5 fill-white" /> Show Featured Only
            </>
          ) : (
            <>
              <BookOpen size={13} className="mr-1.5" /> View All Repositories
            </>
          )}
        </button>
      </div>

      {/* Projects Grid */}
      {repos.length === 0 ? (
        <div className="text-center py-12 px-6 max-w-md mx-auto rounded-xl border border-slate-200 bg-white">
          <FolderOpen className="mx-auto text-slate-400 mb-3" size={48} />
          <h3 className="text-base font-bold text-slate-900 mb-1">
            No GitHub repositories found
          </h3>
          <p className="text-slate-500 text-xs font-mono">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {repos.map((project, index) => (
              <motion.div
                key={project._id || project.githubUrl || index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
              >
                <GitHubProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Load More Banner */}
      {!showAll && featuredRepos?.data?.length > 0 && (
        <div className="text-center pt-2">
          <button
            onClick={() => setShowAll(true)}
            className="text-xs font-semibold text-slate-900 hover:text-slate-600 transition-colors font-mono"
          >
            View all {allRepos?.data?.length || ''} repositories →
          </button>
        </div>
      )}
    </div>
  );
};

export default GitHubProjects;
