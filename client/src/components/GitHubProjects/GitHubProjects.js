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
    <div className="glass-card p-6 border border-slate-200/80 hover:border-primary-500/40 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <div className="flex space-x-2 text-xs font-semibold flex-shrink-0">
            {project.stars > 0 && (
              <span className="flex items-center bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full">
                <Star size={13} className="mr-1 fill-amber-400 text-amber-500" /> {String(project.stars)}
              </span>
            )}
            {project.forks > 0 && (
              <span className="flex items-center bg-primary-50 text-primary-700 border border-primary-200 px-2.5 py-1 rounded-full">
                <GitFork size={13} className="mr-1" /> {String(project.forks)}
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
                className="px-2.5 py-1 bg-slate-100/90 text-slate-700 rounded-lg text-xs font-medium border border-slate-200/60"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2.5 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-semibold border border-primary-200/60">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        )}

        {project.language && (
          <div className="mb-4">
            <span className="inline-flex items-center px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-semibold rounded-lg">
              <Code2 size={13} className="mr-1 text-emerald-600" /> {project.language}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
        <div className="flex items-center">
          <Calendar size={13} className="mr-1 text-slate-400" />
          Updated {new Date(project.updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </div>

        <div className="flex space-x-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
          >
            <Github size={14} className="mr-1.5" />
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-xs"
            >
              <ExternalLink size={14} className="mr-1.5" />
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
      <div className="glass-card bg-gradient-to-br from-primary-600 to-indigo-700 text-white p-5 rounded-2xl text-center shadow-lg">
        <div className="text-3xl font-extrabold mb-1">{stats.totalRepos}</div>
        <div className="text-xs font-medium uppercase tracking-wider opacity-90">Repositories</div>
      </div>
      <div className="glass-card bg-gradient-to-br from-amber-500 to-orange-600 text-white p-5 rounded-2xl text-center shadow-lg">
        <div className="text-3xl font-extrabold mb-1">{stats.totalStars}</div>
        <div className="text-xs font-medium uppercase tracking-wider opacity-90">Total Stars</div>
      </div>
      <div className="glass-card bg-gradient-to-br from-emerald-500 to-teal-700 text-white p-5 rounded-2xl text-center shadow-lg">
        <div className="text-3xl font-extrabold mb-1">{stats.totalForks}</div>
        <div className="text-xs font-medium uppercase tracking-wider opacity-90">Total Forks</div>
      </div>
      <div className="glass-card bg-gradient-to-br from-purple-600 to-indigo-800 text-white p-5 rounded-2xl text-center shadow-lg">
        <div className="text-3xl font-extrabold mb-1">
          {Object.keys(stats.languages || {}).length}
        </div>
        <div className="text-xs font-medium uppercase tracking-wider opacity-90">Languages</div>
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
        <div className="glass-card bg-white p-8 max-w-md mx-auto border border-rose-200">
          <AlertTriangle className="mx-auto text-rose-500 mb-4" size={48} />
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
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
              <Star size={15} className="mr-2 fill-white" /> Show Featured Only
            </>
          ) : (
            <>
              <BookOpen size={15} className="mr-2" /> View All Repositories
            </>
          )}
        </button>
      </div>

      {/* Projects Grid */}
      {repos.length === 0 ? (
        <div className="glass-card text-center py-16 px-6 max-w-md mx-auto">
          <FolderOpen className="mx-auto text-slate-400 mb-4" size={64} />
          <h3 className="text-xl font-bold text-slate-800 mb-2">
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
