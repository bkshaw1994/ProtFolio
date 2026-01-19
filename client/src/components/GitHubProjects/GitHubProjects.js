import React, { useState } from 'react';
import {
  useGetGitHubReposQuery,
  useGetFeaturedGitHubReposQuery,
  useGetGitHubStatsQuery
} from '../../features/api/apiSlice';
import LoadingSpinner from '../LoadingSpinner';

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
              ⭐ {project.stars}
            </span>
          )}
          {project.forks > 0 && (
            <span className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
              🍴 {project.forks}
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
            💻 {project.language}
          </span>
        </div>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          📅 Updated {new Date(project.updatedAt).toLocaleDateString()}
        </div>
        
        <div className="flex space-x-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
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
        <div className="text-2xl font-bold">{Object.keys(stats.languages || {}).length}</div>
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
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <p className="text-red-800 font-medium mb-4">Error loading GitHub repositories</p>
          <p className="text-red-600 text-sm mb-4">
            Please check your internet connection or try again later.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            🔄 Retry
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
            {showAll ? 'All GitHub Projects' : 'Featured GitHub Projects'}
          </h2>
          <p className="text-gray-600 mt-1">
            {showAll ? 'Complete collection of my repositories' : 'Highlighted projects with community engagement'}
          </p>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {showAll ? '⭐ Show Featured Only' : '📚 View All Projects'}
        </button>
      </div>
      
      {/* Projects Grid */}
      {repos.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-gray-400 text-8xl mb-4">📂</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No GitHub repositories found</h3>
          <p className="text-gray-500">
            {showAll ? 'No repositories available' : 'No featured repositories available'}
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