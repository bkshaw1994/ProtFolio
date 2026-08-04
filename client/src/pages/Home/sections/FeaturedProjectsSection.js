import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '../../../components/ProjectCard';

const FeaturedProjectsSection = ({ allFeaturedProjects }) => (
  <section className="section-padding bg-secondary-50">
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
          Featured Projects
        </h2>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          A showcase of my portfolio projects and open-source contributions
        </p>
      </motion.div>

      {allFeaturedProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🚀</div>
          <p className="text-gray-600">Featured projects will appear here soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allFeaturedProjects.map((project, index) => (
            <motion.div
              key={project._id || project.githubUrl || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-10"
      >
        <Link to="/projects" className="btn-primary group">
          View All Projects
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default FeaturedProjectsSection;
