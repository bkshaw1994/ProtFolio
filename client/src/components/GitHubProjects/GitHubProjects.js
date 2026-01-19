import React, { useState } from "react";
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
  BookOpen,
} from "lucide-react";
import {
  useGetGitHubReposQuery,
  useGetFeaturedGitHubReposQuery,
  useGetGitHubStatsQuery,
} from "../../features/api/apiSlice";
import LoadingSpinner from "../LoadingSpinner";

const GitHubProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
          {project.title}
        </h3>
        <div className="flex space-x-3 text-sm text-gray-500">
          {project.stars > 0 && (
            <span className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
              <Star size={14} className="mr-1" /> {String(project.stars)}
            </span>
          )}
          {project.forks > 0 && (
            <span className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
              <GitFork size={14} className="mr-1" /> {String(project.forks)}
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3 min-h-[3rem]">
        {project.description}
      </p>

      {project.technologies && project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-sm rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
      )}

      {project.language && (
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-sm rounded-full font-medium">
            <Code2 size={14} className="mr-1" /> {project.language}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={14} className="mr-1" />
          Updated {new Date(project.updatedAt).toLocaleDateString()}
        </div>

        <div className="flex space-x-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Github size={16} className="mr-2" />
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              <ExternalLink size={16} className="mr-2" />
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
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center">
        <div className="text-2xl font-bold">{stats.totalRepos}</div>
        <div className="text-sm opacity-90">Repositories</div>
      </div>
      <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-4 rounded-lg text-center">
        <div className="text-2xl font-bold">{stats.totalStars}</div>
        <div className="text-sm opacity-90">Total Stars</div>
      </div>
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg text-center">
        <div className="text-2xl font-bold">{stats.totalForks}</div>
        <div className="text-sm opacity-90">Total Forks</div>
      </div>
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-lg text-center">
        <div className="text-2xl font-bold">
          {Object.keys(stats.languages || {}).length}
        </div>
        <div className="text-sm opacity-90">Languages</div>
      </div>
    </div>
  );
};

const GitHubProjects = () => {
  const [showAll, setShowAll] = useState(false);
  const {
    data: featuredRepos,
    isLoading: featuredLoading,
    isError: featuredError,
  } = useGetFeaturedGitHubReposQuery();

  const {
    data: allRepos,
    isLoading: allLoading,
    isError: allError,
  } = useGetGitHubReposQuery({ limit: 20 }, { skip: !showAll });

  const { data: statsData } = useGetGitHubStatsQuery();

  const repos = showAll ? allRepos?.data || [] : featuredRepos?.data || [];
  const isLoading = showAll ? allLoading : featuredLoading;
  const isError = showAll ? allError : featuredError;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <AlertTriangle className="mx-auto text-red-600 mb-4" size={64} />
          <p className="text-red-800 font-medium mb-4">
            Error loading GitHub repositories
          </p>
          <p className="text-red-600 text-sm mb-4">
            Please check your internet connection or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw size={16} className="mr-2" /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* GitHub Stats */}
      {statsData?.data && <GitHubStats stats={statsData.data} />}

      {/* Header with Toggle */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {showAll ? "All GitHub Projects" : "Featured GitHub Projects"}
          </h2>
          <p className="text-gray-600 mt-1">
            {showAll
              ? "Complete collection of my repositories"
              : "Highlighted projects with community engagement"}
          </p>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {showAll ? (
            <>
              <Star size={16} className="mr-2" /> Show Featured Only
            </>
          ) : (
            <>
              <BookOpen size={16} className="mr-2" /> View All Projects
            </>
          )}
        </button>
      </div>

      {/* Projects Grid */}
      {repos.length === 0 ? (
        <div className="text-center py-16">
          <FolderOpen className="mx-auto text-gray-400 mb-4" size={80} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No GitHub repositories found
          </h3>
          <p className="text-gray-500">
            {showAll
              ? "No repositories available"
              : "No featured repositories available"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((project, index) => (
            <GitHubProjectCard
              key={project._id || project.githubUrl || index}
              project={project}
            />
          ))}
        </div>
      )}

      {/* Load More Info */}
      {!showAll && featuredRepos?.data?.length > 0 && (
        <div className="text-center pt-8">
          <p className="text-gray-600 mb-4">
            Showing {featuredRepos.data.length} featured repositories
          </p>
          <button
            onClick={() => setShowAll(true)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View all repositories →
          </button>
        </div>
      )}
    </div>
  );
};

export default GitHubProjects;
