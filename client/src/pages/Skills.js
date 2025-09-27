import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetSkillsQuery } from '../features/api/apiSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import SkillBadge from '../components/SkillBadge';

const Skills = () => {
  const { data: skillsResponse, isLoading, isError, refetch } = useGetSkillsQuery();
  
  // Extract the actual skills data from the API response
  const skills = skillsResponse?.data || {};
  const skillCategories = Object.keys(skills);

  console.log('Skills Response:', skillsResponse);
  console.log('Skills Data:', skills);
  console.log('Skill Categories:', skillCategories);

  if (isLoading) {
    return <LoadingSpinner size="lg" message="Loading skills..." />;
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

  return (
    <>
      <Helmet>
        <title>Skills - Portfolio</title>
        <meta name="description" content="My technical skills and expertise in various technologies" />
      </Helmet>

      <div className="pt-20">
        {/* Header */}
        <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-custom text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6">
              My Skills
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Technologies and tools I use to create amazing digital experiences
            </p>
          </div>
        </section>

        {/* Skills by Category */}
        <section className="section-padding">
          <div className="container-custom">
            {skillCategories.map((category) => (
              <div key={category} className="mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-8 capitalize">
                  {category.replace('-', ' ')} Skills
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {Array.isArray(skills[category]) ? skills[category].map((skill) => (
                    <SkillBadge key={skill._id} skill={skill} />
                  )) : (
                    <div className="text-gray-500">No skills in this category</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Skills;
