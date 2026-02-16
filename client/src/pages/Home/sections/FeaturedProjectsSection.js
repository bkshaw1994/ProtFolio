import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '../../../components/ProjectCard';

const FeaturedProjectsSection = ({ allFeaturedProjects }) => (
  <section className="section-padding bg-secondary-50">
    <div className="container-custom">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
          Featured Projects
        </h2>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          A showcase of my portfolio projects and open-source contributions
        </p>
      </div>

      {allFeaturedProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🚀</div>
          <p className="text-gray-600">Featured projects will appear here soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allFeaturedProjects.map((project, index) => (
            <ProjectCard
              key={project._id || project.githubUrl || index}
              project={project}
            />
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link to="/projects" className="btn-primary">
          View All Projects
          <ArrowRight size={20} className="ml-2" />
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturedProjectsSection;
