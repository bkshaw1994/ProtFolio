import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetProjectsQuery } from '../../features/api/apiSlice';
import ProjectCard from '../../components/ProjectCard';
import GitHubProjects from '../../components/GitHubProjects';
import { SkeletonProject } from '../../components/Skeleton';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' or 'github'
  const {
    data: projectsData = { data: [] },
    isLoading,
    isError,
    refetch
  } = useGetProjectsQuery();
  const projects = projectsData.data || [];

  const tabs = [
    {
      id: 'portfolio',
      label: 'Portfolio Projects',
      icon: '💼',
      description: 'Curated projects showcasing my skills'
    },
    {
      id: 'github',
      label: 'GitHub Projects',
      icon: '🐙',
      description: 'Open source repositories and contributions'
    }
  ];

  if (isLoading && activeTab === 'portfolio') {
    return (
      <>
        <Helmet>
          <title>Projects - Portfolio</title>
          <meta
            name="description"
            content="Browse my portfolio of projects and work"
          />
        </Helmet>
        <div className="pt-20 min-h-screen bg-gray-50">
          <section className="section-padding">
            <div className="container-custom">
              <div className="text-center mb-12">
                <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonProject key={index} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  if (isError && activeTab === 'portfolio') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-red-500 mb-4">Error loading projects</div>
          <button onClick={() => refetch()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Projects - Portfolio</title>
        <meta
          name="description"
          content="Browse my portfolio of projects and work"
        />
      </Helmet>
      <div className="pt-20 min-h-screen bg-gray-50">
        <section className="section-padding">
          <div className="container-custom">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
                My Projects
              </h1>
              <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
                Explore my portfolio projects and GitHub repositories showcasing
                my development journey
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 inline-flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 rounded-md transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md transform scale-105'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg mr-2">{tab.icon}</span>
                    <div className="text-left">
                      <div className="font-medium">{tab.label}</div>
                      <div
                        className={`text-xs ${activeTab === tab.id ? 'text-blue-100' : 'text-gray-500'}`}
                      >
                        {tab.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto">
              {activeTab === 'portfolio' && (
                <div>
                  {projects.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="text-gray-400 text-8xl mb-4">💼</div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No portfolio projects found
                      </h3>
                      <p className="text-gray-500">
                        Projects will appear here once they're added to the
                        portfolio.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {projects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'github' && <GitHubProjects />}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;
