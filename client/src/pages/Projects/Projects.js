import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Github,
  FolderGit2,
  Search,
  X,
  Sparkles,
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

  const projects = projectsData.data || [];

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
        <div className="pt-28 sm:pt-36 min-h-screen bg-slate-50/50 bg-grid-pattern pb-20">
          <section className="section-padding py-12">
            <div className="container-custom">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="h-8 bg-slate-200 rounded-full w-48 mx-auto mb-4 animate-pulse"></div>
                <div className="h-12 bg-slate-200 rounded-xl w-72 sm:w-96 mx-auto mb-4 animate-pulse"></div>
                <div className="h-6 bg-slate-200 rounded-xl w-full max-w-lg mx-auto animate-pulse"></div>
              </div>
              <div className="max-w-4xl mx-auto mb-10 h-14 bg-slate-200 rounded-2xl animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
      <div className="min-h-screen flex items-center justify-center pt-28 sm:pt-36 bg-slate-50/50 bg-grid-pattern">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-md mx-auto">
          <AlertCircle className="mx-auto text-rose-500 mb-4" size={48} />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Failed to load projects</h3>
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

      <div className="pt-28 sm:pt-36 min-h-screen bg-slate-50/50 bg-grid-pattern pb-24">
        <section className="section-padding py-10 sm:py-14">
          <div className="container-custom">
            {/* Hero Header */}
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-primary-100/80 text-primary-800 border border-primary-200/60 px-4 py-2 rounded-full mb-4 shadow-sm">
                <FolderGit2 size={16} className="text-primary-600" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Portfolio & Open Source
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
                Featured Projects
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
                Explore my curated portfolio projects and GitHub repositories showcasing my full-stack development journey, technical architecture, and open-source work.
              </p>
            </div>

            {/* Main Tabs Navigation */}
            <div className="flex justify-center mb-10">
              <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-slate-200/80 inline-flex flex-wrap sm:flex-nowrap gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center space-x-3 px-5 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${
                        isActive
                          ? 'text-primary-700 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabBadge"
                          className="absolute inset-0 bg-primary-50 border border-primary-200/70 rounded-xl shadow-sm"
                          transition={{ type: 'spring', duration: 0.5 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon size={18} className={isActive ? 'text-primary-600' : 'text-slate-500'} />
                        <span>{tab.label}</span>
                        {tab.count !== null && tab.count !== undefined && (
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                              isActive
                                ? 'bg-primary-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
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
                <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-md space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
                  {/* Search Input */}
                  <div className="relative flex-1 max-w-md">
                    <Search
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      placeholder="Search by title, tech stack..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-all"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  {/* Category Filter Pills */}
                  {categories.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
                      <SlidersHorizontal size={16} className="text-slate-400 flex-shrink-0 hidden lg:block" />
                      {categories.map((cat) => {
                        const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                        return (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                              isSelected
                                ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60'
                            }`}
                          >
                            {cat === 'all' ? 'All Categories' : cat}
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
                      className="glass-card text-center py-16 px-6 max-w-xl mx-auto"
                    >
                      <FolderOpen className="mx-auto text-slate-400 mb-4" size={64} />
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
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
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                      {filteredProjects.map((project, index) => (
                        <motion.div
                          key={project._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
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
