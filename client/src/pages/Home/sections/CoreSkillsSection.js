import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SkillBadge from '../../../components/SkillBadge';

const CoreSkillsSection = ({ coreSkills }) => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
          Core Skills
        </h2>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          Technologies and tools I use to bring ideas to life
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {coreSkills.map((skill, index) => (
          <SkillBadge key={index} skill={skill} size="sm" />
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/skills" className="btn-outline">
          View All Skills
          <ArrowRight size={20} className="ml-2" />
        </Link>
      </div>
    </div>
  </section>
);

export default CoreSkillsSection;
