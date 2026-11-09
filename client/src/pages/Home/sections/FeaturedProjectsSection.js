import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FolderOpen } from 'lucide-react';
import ProjectCard from '../../../components/ProjectCard';

const FeaturedProjectsSection = ({ allFeaturedProjects }) => (
  <section className="section-padding bg-white border-t border-slate-100">
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2">
          Selected Works
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 mb-3 tracking-tight">
          Featured Projects
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          A showcase of my portfolio projects and open-source contributions
        </p>
      </motion.div>

      {allFeaturedProjects.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-xl max-w-md mx-auto shadow-2xs">
          <FolderOpen size={48} className="mx-auto text-slate-400 mb-3" />
          <p className="text-slate-600 text-sm font-medium">Featured projects will appear here soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {allFeaturedProjects.map((project, index) => (
            <motion.div
              key={project._id || project.githubUrl || index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mt-12"
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
