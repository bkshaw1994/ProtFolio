import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Github,
  Search,
  X,
  FolderOpen,
  AlertCircle,
  SlidersHorizontal
} from 'lucide-react';
import { useGetProjectsQuery, useGetGitHubStatsQuery } from '../../features/api/apiSlice';
import ProjectCard from '../../components/ProjectCard';
import GitHubProjects from '../../components/GitHubProjects';
import { SkeletonProject } from '../../components/Skeleton';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' or 'github'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const {
    data: projectsData = { data: [] },
    isLoading,
    isError,
    refetch
  } = useGetProjectsQuery();

  const { data: githubStats } = useGetGitHubStatsQuery();

  const projects = useMemo(() => projectsData?.data || [], [projectsData]);

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(
        projects
          .map((p) => p.category)
          .filter(Boolean)
      )
    );
    return ['all', ...unique];
  }, [projects]);

  // Filter projects by search term and selected category
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        project.category?.toLowerCase() === selectedCategory.toLowerCase();

      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        project.title?.toLowerCase().includes(term) ||
        project.description?.toLowerCase().includes(term) ||
        project.shortDescription?.toLowerCase().includes(term) ||
        project.technologies?.some((tech) => tech.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchTerm]);

  const tabs = [
    {
      id: 'portfolio',
      label: 'Portfolio Projects',
      icon: Briefcase,
      count: projects.length,
      description: 'Curated full-stack engineering work'
    },
    {
      id: 'github',
      label: 'GitHub Repositories',
      icon: Github,
      count: githubStats?.data?.totalRepos || null,
      description: 'Open source projects & activity'
    }
  ];

  if (isLoading && activeTab === 'portfolio') {
    return (
      <>
        <Helmet>
          <title>Projects - Portfolio</title>
          <meta
            name="description"
            content="Browse my portfolio of projects and open source work"
          />
        </Helmet>
        <div className="pt-24 sm:pt-28 pb-20 min-h-screen bg-white bg-dot-pattern">
          <section className="section-padding py-10 sm:py-14">
            <div className="container-custom">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="h-6 bg-slate-100 rounded w-48 mx-auto mb-4 animate-pulse"></div>
                <div className="h-10 bg-slate-100 rounded w-72 sm:w-96 mx-auto mb-4 animate-pulse"></div>
                <div className="h-5 bg-slate-100 rounded w-full max-w-lg mx-auto animate-pulse"></div>
              </div>
              <div className="max-w-4xl mx-auto mb-10 h-12 bg-slate-100 rounded-xl animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
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
      <div className="min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-20 bg-white">
        <div className="text-center bg-white p-8 rounded-xl border border-slate-200 shadow-2xs max-w-md mx-auto">
          <AlertCircle className="mx-auto text-rose-500 mb-4" size={40} />
          <h3 className="text-lg font-bold text-slate-950 mb-2">Failed to load projects</h3>
          <p className="text-slate-600 text-sm mb-6">
            There was an error loading portfolio projects. Please try refreshing.
          </p>
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
        <title>Projects & Work - Portfolio</title>
        <meta
          name="description"
          content="Explore my portfolio of featured web applications, full-stack projects, and GitHub open-source repositories."
        />
        <meta
          name="keywords"
          content="full stack projects, MERN stack, React applications, Node.js backend, open source github"
        />
      </Helmet>

      <div className="pt-24 sm:pt-28 pb-20 min-h-screen bg-white bg-dot-pattern">
        <section className="section-padding py-10 sm:py-14">
          <div className="container-custom">
            {/* Hero Header */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2">
                Portfolio & Open Source
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight mb-4">
                Featured Projects
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                Explore my curated portfolio projects and GitHub repositories showcasing my full-stack development journey, technical architecture, and open-source work.
              </p>
            </div>

            {/* Main Tabs Navigation */}
            <div className="flex justify-center mb-10">
              <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 inline-flex flex-wrap sm:flex-nowrap gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center space-x-2.5 px-5 py-2.5 rounded-lg transition-colors font-mono text-xs font-semibold ${
                        isActive
                          ? 'text-white'
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabBadge"
                          className="absolute inset-0 bg-slate-950 rounded-lg shadow-xs"
                          transition={{ type: 'spring', duration: 0.4 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon size={16} />
                        <span>{tab.label}</span>
                        {tab.count !== null && tab.count !== undefined && (
                          <span
                            className={`px-1.5 py-0.5 text-2xs rounded font-bold ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {tab.count}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Portfolio Tab Content & Controls */}
            {activeTab === 'portfolio' && (
              <div className="max-w-7xl mx-auto space-y-8">
                {/* Search & Category Filter Controls */}
                <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
                  {/* Search Input */}
                  <div className="relative flex-1 max-w-md">
                    <Search
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      placeholder="Search by title, tech stack..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-400 transition-colors"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>

                  {/* Category Filter Pills */}
                  {categories.length > 1 && (
                    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                      <SlidersHorizontal size={15} className="text-slate-400 flex-shrink-0 hidden lg:block mr-1" />
                      {categories.map((cat) => {
                        const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                        return (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                              isSelected
                                ? 'bg-slate-950 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60'
                            }`}
                          >
                            {cat === 'all' ? 'All' : cat}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                  {filteredProjects.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white text-center py-16 px-6 max-w-xl mx-auto rounded-xl border border-slate-200 shadow-2xs"
                    >
                      <FolderOpen className="mx-auto text-slate-400 mb-4" size={48} />
                      <h3 className="text-lg font-bold text-slate-950 mb-2">
                        No portfolio projects found
                      </h3>
                      <p className="text-slate-600 text-sm mb-6">
                        {searchTerm || selectedCategory !== 'all'
                          ? 'No projects matched your search or category filter criteria. Try resetting your search.'
                          : 'Projects will appear here once added to the portfolio.'}
                      </p>
                      {(searchTerm || selectedCategory !== 'all') && (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('all');
                          }}
                          className="btn-primary text-xs"
                        >
                          Reset Search & Filters
                        </button>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                    >
                      {filteredProjects.map((project, index) => (
                        <motion.div
                          key={project._id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.04 }}
                        >
                          <ProjectCard project={project} />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* GitHub Tab Content */}
            {activeTab === 'github' && (
              <div className="max-w-7xl mx-auto">
                <GitHubProjects />
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;
