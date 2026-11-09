import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetSkillsQuery } from '../../features/api/apiSlice';
import SkillBadge from '../../components/SkillBadge';
import { SkeletonSkill } from '../../components/Skeleton';
import { Code2, Layers, Cpu } from 'lucide-react';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('all');
  const {
    data: skillsResponse,
    isLoading,
    isError,
    refetch
  } = useGetSkillsQuery();

  const skills = skillsResponse?.data || {};
  const skillCategories = Object.keys(skills);

  const totalSkillsCount = skillCategories.reduce((acc, cat) => {
    return acc + (Array.isArray(skills[cat]) ? skills[cat].length : 0);
  }, 0);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Skills - Technical Expertise</title>
          <meta
            name="description"
            content="Technical skills and architecture capabilities"
          />
        </Helmet>
        <div className="pt-24 sm:pt-28 min-h-screen bg-white">
          <div className="container-custom max-w-6xl mx-auto py-10">
            <div className="h-10 bg-slate-200 rounded w-64 mb-4 animate-pulse" />
            <div className="h-5 bg-slate-200 rounded w-96 mb-12 animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonSkill key={index} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 sm:pt-28 bg-white">
        <div className="text-center">
          <div className="text-red-500 mb-4 font-mono text-sm">Error loading technical skills</div>
          <button onClick={() => refetch()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const filteredCategories = activeTab === 'all'
    ? skillCategories
    : skillCategories.filter((cat) => cat.toLowerCase() === activeTab.toLowerCase());

  return (
    <>
      <Helmet>
        <title>Technical Skills & Architecture Stack - Bishal Kumar Shaw</title>
        <meta
          name="description"
          content="Production-tested technical skills: Next.js, React, TypeScript, Redis, Puppeteer, Node.js, and CI/CD testing frameworks."
        />
      </Helmet>

      <div className="pt-24 sm:pt-28 min-h-screen bg-white pb-20">
        <div className="container-custom max-w-6xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono text-xs text-slate-700 mb-3">
              <Cpu size={14} className="text-slate-900" />
              <span>TECHNICAL ARSENAL & ARCHITECTURE SPECS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
              Architecture Capabilities & Stack
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Production-tested frameworks, state management engines, distributed caching systems, and automated test suites architected for sub-second Core Web Vitals.
            </p>
          </div>

          {/* Minimalist Category Filter Tabs */}
          <div className="mb-10 overflow-x-auto scrollbar-none pb-2">
            <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200/80">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Layers size={13} />
                <span>All Technologies</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {totalSkillsCount}
                </span>
              </button>

              {skillCategories.map((category) => {
                const count = Array.isArray(skills[category]) ? skills[category].length : 0;
                const isSelected = activeTab.toLowerCase() === category.toLowerCase();
                return (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium capitalize transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <Code2 size={13} />
                    <span>{category.replace('-', ' ')}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skills Grid by Category */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-10"
            >
              {filteredCategories.map((category) => (
                <div key={category} className="space-y-4">
                  {/* Category Title */}
                  {activeTab === 'all' && (
                    <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
                      <Cpu size={16} className="text-slate-500" />
                      <h2 className="text-base font-bold text-slate-900 capitalize">
                        {category.replace('-', ' ')}
                      </h2>
                      <span className="text-[11px] font-mono text-slate-400">
                        ({Array.isArray(skills[category]) ? skills[category].length : 0} tools)
                      </span>
                    </div>
                  )}

                  {/* Responsive Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {Array.isArray(skills[category]) && skills[category].length > 0 ? (
                      skills[category].map((skill, idx) => (
                        <motion.div
                          key={skill._id || skill.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2, delay: idx * 0.02 }}
                          className="h-full flex flex-col"
                        >
                          <SkillBadge skill={{ ...skill, category }} />
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-slate-400 col-span-full py-6 text-center text-xs font-mono">
                        No skills listed in this category.
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Skills;
