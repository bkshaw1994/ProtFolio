import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useGetSkillsQuery } from '../../features/api/apiSlice';
import SkillBadge from '../../components/SkillBadge';
import { SkeletonSkill } from '../../components/Skeleton';
import { Sparkles, Code2, Layers, Cpu } from 'lucide-react';

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
        <div className="pt-20">
          <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
            <div className="container-custom text-center">
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-6 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
            </div>
          </section>
          <section className="section-padding">
            <div className="container-custom">
              {Array.from({ length: 3 }).map((_, categoryIndex) => (
                <div key={categoryIndex} className="mb-16">
                  <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
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
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-red-500 mb-4">Error loading skills</div>
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
        <title>Skills - Portfolio</title>
        <meta
          name="description"
          content="My technical skills and expertise in various technologies"
        />
      </Helmet>

      <div className="pt-20 sm:pt-24 min-h-screen pb-16">
        {/* Header Hero Banner */}
        <section className="py-10 sm:py-14 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)] pointer-events-none"></div>
          <div className="container-custom text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-primary-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-white/10"
            >
              <Sparkles size={13} />
              <span>Tech Stack & Capabilities</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 text-white"
            >
              Technical Expertise
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal"
            >
              Comprehensive breakdown of my skills, tools, and tech stack proficiency
            </motion.p>
          </div>
        </section>

        {/* Category Filter Tabs Section */}
        <section className="pt-6 pb-2">
          <div className="container-custom px-4 text-center">
            <div className="inline-flex items-center sm:justify-center overflow-x-auto scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-nowrap sm:flex-wrap gap-2 sm:gap-3 p-1.5 bg-slate-100/80 backdrop-blur-lg rounded-full w-fit max-w-full mx-auto border border-slate-200/80 shadow-inner">
              {/* 'All' Tab */}
              <button
                onClick={() => setActiveTab('all')}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 flex-shrink-0 ${
                  activeTab === 'all'
                    ? 'text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {activeTab === 'all' && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Layers size={14} />
                  <span>All Skills</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
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
                    className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold capitalize transition-all duration-300 flex items-center gap-2 flex-shrink-0 ${
                      isSelected
                        ? 'text-white shadow-md'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeSkillTab"
                        className="absolute inset-0 bg-gradient-to-r from-primary-600 to-indigo-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Code2 size={14} />
                      <span>{category.replace('-', ' ')}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
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
                        <div className="p-2 bg-primary-50 rounded-xl text-primary-600">
                          <Cpu size={20} />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 capitalize">
                          {category.replace('-', ' ')} Skills
                        </h2>
                        <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                          {Array.isArray(skills[category]) ? skills[category].length : 0} items
                        </span>
                      </div>
                    )}

                    {/* Responsive Grid: 2 cols on mobile, 3 on md, 4 on lg */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                      {Array.isArray(skills[category]) && skills[category].length > 0 ? (
                        skills[category].map((skill, idx) => (
                          <motion.div
                            key={skill._id || skill.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: idx * 0.04 }}
                            className="h-full flex flex-col"
                          >
                            <SkillBadge skill={{ ...skill, category }} />
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-slate-400 col-span-full py-8 text-center text-sm font-medium">
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
