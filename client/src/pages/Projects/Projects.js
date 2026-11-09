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

const defaultFlagshipProjects = [
  {
    _id: 'auditpulse-showcase',
    title: 'AuditPulse: Open-Source Core Web Vitals & SPA SEO Monitor',
    shortDescription:
      'Open-source Core Web Vitals & SPA SEO performance monitoring engine built with Next.js, Puppeteer, Redis, and MongoDB.',
    description:
      'Automated headless performance profiling engine built with Next.js, Puppeteer, Redis, and MongoDB to eliminate SPA SEO crawl drops and detect rendering regressions before staging deployments.',
    technologies: ['Next.js', 'Puppeteer', 'Redis', 'MongoDB', 'WebSockets', 'Tailwind CSS'],
    category: 'fullstack',
    isFeatured: true,
    status: 'completed',
    role: 'Creator & Core Architect',
    githubUrl: 'https://github.com/bkshaw1994/AuditPulse',
    liveUrl: 'https://bishal-portfolio-chi.vercel.app/projects'
  },
  {
    _id: 'ecommerce-showcase',
    title: 'High-Performance E-Commerce & SaaS Architecture Platform',
    shortDescription:
      'Sub-second LCP (720ms), multi-tier ISR caching, and zero hydration debt storefront handling high-concurrency scale.',
    description:
      'Enterprise e-commerce and SaaS architecture featuring Next.js App Router, React Server Components, tiered ISR caching, and atomic state management for high-concurrency scale events.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Redis', 'Tailwind CSS', 'Zustand'],
    category: 'fullstack',
    isFeatured: true,
    status: 'completed',
    role: 'Lead Frontend Architect',
    githubUrl: 'https://github.com/bkshaw1994',
    liveUrl: 'https://bishal-portfolio-chi.vercel.app/projects'
  },
  {
    _id: 'microfrontend-showcase',
    title: 'Enterprise Micro-Frontend & Scalable Component System',
    shortDescription:
      'Monorepo design system architecture with strict TypeScript, Playwright CI, and 84% faster build pipelines.',
    description:
      'Turborepo monorepo design system with strictly typed TypeScript component packages, Module Federation, automated visual regression gates, and 84% faster CI/CD build pipelines.',
    technologies: ['TypeScript', 'Next.js', 'Turborepo', 'Playwright', 'Jest', 'Tailwind CSS'],
    category: 'fullstack',
    isFeatured: true,
    status: 'completed',
    role: 'Principal Frontend Architect',
    githubUrl: 'https://github.com/bkshaw1994',
    liveUrl: 'https://bishal-portfolio-chi.vercel.app/projects'
  }
];

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

  const projects = useMemo(() => {
    const raw = projectsData?.data || [];
    if (raw.length > 0) return raw;
    return defaultFlagshipProjects;
  }, [projectsData]);

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
        <div className="pt-24 sm:pt-28 min-h-screen bg-slate-50/50 bg-grid-pattern pb-20">
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
        </div>
      </>
    );
  }

  if (isError && activeTab === 'portfolio') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 sm:pt-28 bg-slate-50/50 bg-grid-pattern">
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

      <div className="pt-24 sm:pt-28 min-h-screen bg-white pb-24">
        <div className="container-custom">
          {/* Hero Header */}
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Engineering Showcases & Repositories
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
              Production Projects & Open Source
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Curated portfolio projects, client architecture overhauls, and open-source systems developed with Next.js, TypeScript, and modern distributed tooling.
            </p>
          </div>

          {/* Main Tabs Navigation */}
          <div className="flex justify-start mb-8">
            <div className="bg-slate-100 p-1 rounded-lg border border-slate-200/80 inline-flex flex-wrap sm:flex-nowrap gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-md transition-colors font-mono text-xs ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-white' : 'text-slate-500'} />
                    <span>{tab.label}</span>
                    {tab.count !== null && tab.count !== undefined && (
                      <span
                        className={`px-1.5 py-0.2 text-[10px] rounded font-mono ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Portfolio Tab Content & Controls */}
          {activeTab === 'portfolio' && (
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Search & Category Filter Controls */}
              <div className="bg-slate-50/50 p-3.5 sm:p-4 rounded-xl border border-slate-200/90 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Search by title, architecture stack..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-9 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 text-xs font-mono focus:outline-none focus:border-slate-500 transition-colors"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Category Filter Pills */}
                {categories.length > 1 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
                    <SlidersHorizontal size={14} className="text-slate-400 flex-shrink-0 hidden lg:block mr-1" />
                    {categories.map((cat) => {
                      const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors whitespace-nowrap ${
                            isSelected
                              ? 'bg-slate-900 text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-600 hover:text-slate-950'
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
                    className="bg-white rounded-xl border border-slate-200 text-center py-16 px-6 max-w-xl mx-auto"
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
      </div>
    </>
  );
};

export default Projects;
