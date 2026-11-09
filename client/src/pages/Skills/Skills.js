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

  // Extract the actual skills data from the API response
  const skills = skillsResponse?.data || {};
  const skillCategories = Object.keys(skills);

  // Calculate total count of all skills
  const totalSkillsCount = skillCategories.reduce((acc, cat) => {
    return acc + (Array.isArray(skills[cat]) ? skills[cat].length : 0);
  }, 0);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Skills - Portfolio</title>
          <meta
            name="description"
            content="My technical skills and expertise in various technologies"
          />
        </Helmet>
        <div className="pt-24 sm:pt-28 pb-20 min-h-screen bg-white">
          <section className="section-padding py-10 sm:py-14">
            <div className="container-custom text-center">
              <div className="h-6 bg-slate-100 rounded w-48 mx-auto mb-4 animate-pulse"></div>
              <div className="h-10 bg-slate-100 rounded w-64 mx-auto mb-4 animate-pulse"></div>
              <div className="h-5 bg-slate-100 rounded w-96 mx-auto animate-pulse"></div>
            </div>
          </section>
          <section className="section-padding py-4">
            <div className="container-custom">
              {Array.from({ length: 3 }).map((_, categoryIndex) => (
                <div key={categoryIndex} className="mb-14">
                  <div className="h-6 bg-slate-100 rounded w-48 mb-6 animate-pulse"></div>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <SkeletonSkill key={index} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-20 bg-white">
        <div className="text-center bg-white p-8 rounded-xl border border-slate-200 shadow-2xs max-w-md mx-auto">
          <div className="text-rose-500 font-semibold mb-4">Error loading skills</div>
          <button onClick={() => refetch()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const filteredCategories =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.toLowerCase() === activeTab.toLowerCase());

  return (
    <>
      <Helmet>
        <title>Skills - Portfolio</title>
        <meta
          name="description"
          content="My technical skills and expertise in various technologies"
        />
      </Helmet>

      <div className="pt-24 sm:pt-28 pb-20 min-h-screen bg-white">
        {/* Header Hero Banner */}
        <section className="py-10 sm:py-14 bg-white text-center">
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2"
            >
              Tech Stack & Capabilities
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-slate-950"
            >
              Technical Expertise
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-base text-slate-600 max-w-xl mx-auto font-normal"
            >
              Comprehensive breakdown of my skills, tools, and tech stack proficiency
            </motion.p>
          </div>
        </section>

        {/* Category Filter Tabs Section */}
        <section className="pt-2 pb-6">
          <div className="container-custom px-4 text-center">
            <div className="inline-flex items-center sm:justify-center overflow-x-auto scrollbar-none flex-nowrap sm:flex-wrap gap-1.5 p-1.5 bg-slate-50 rounded-xl border border-slate-200 w-fit max-w-full mx-auto">
              {/* 'All' Tab */}
              <button
                onClick={() => setActiveTab('all')}
                className={`relative px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-2 flex-shrink-0 ${
                  activeTab === 'all'
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                {activeTab === 'all' && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-slate-950 rounded-lg shadow-xs"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Layers size={13} />
                  <span>All Skills</span>
                  <span
                    className={`text-2xs px-1.5 py-0.5 rounded font-bold ${
                      activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {totalSkillsCount}
                  </span>
                </span>
              </button>

              {/* Category Tabs */}
              {skillCategories.map((category) => {
                const count = Array.isArray(skills[category]) ? skills[category].length : 0;
                const isSelected = activeTab.toLowerCase() === category.toLowerCase();
                return (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`relative px-4 py-2 rounded-lg text-xs font-mono font-semibold capitalize transition-colors flex items-center gap-2 flex-shrink-0 ${
                      isSelected
                        ? 'text-white'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeSkillTab"
                        className="absolute inset-0 bg-slate-950 rounded-lg shadow-xs"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Code2 size={13} />
                      <span>{category.replace('-', ' ')}</span>
                      <span
                        className={`text-2xs px-1.5 py-0.5 rounded font-bold ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Skills Grid by Category */}
        <section className="py-4">
          <div className="container-custom">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                {filteredCategories.map((category) => (
                  <div key={category} className="space-y-6">
                    {/* Category Title (visible when 'all' is selected) */}
                    {activeTab === 'all' && (
                      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                        <div className="p-1.5 bg-slate-100 rounded-lg text-slate-900 border border-slate-200">
                          <Cpu size={18} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-950 capitalize">
                          {category.replace('-', ' ')} Skills
                        </h2>
                        <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {Array.isArray(skills[category]) ? skills[category].length : 0} items
                        </span>
                      </div>
                    )}

                    {/* Responsive Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                      {Array.isArray(skills[category]) && skills[category].length > 0 ? (
                        skills[category].map((skill, idx) => (
                          <motion.div
                            key={skill._id || skill.name}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.03 }}
                            className="h-full flex flex-col"
                          >
                            <SkillBadge skill={{ ...skill, category }} />
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-slate-400 col-span-full py-8 text-center text-sm font-mono">
                          No skills found in this category.
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </>
  );
};

export default Skills;
