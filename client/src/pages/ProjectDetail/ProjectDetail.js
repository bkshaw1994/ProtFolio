import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Tag,
  Layers,
  CheckCircle2,
  AlertCircle,
  Globe,
  Code2,
  Sparkles
} from 'lucide-react';
import { useGetProjectByIdQuery } from '../../features/api/apiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getFileUrl } from '../../utils/apiUrl';

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: projectResponse, isLoading, isError, refetch } = useGetProjectByIdQuery(id);
  const project = projectResponse?.data || projectResponse;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50/50 bg-grid-pattern pt-28 sm:pt-36 pb-20 flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading project details..." />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 sm:pt-36 bg-slate-50/50 bg-grid-pattern">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-md mx-auto">
          <AlertCircle className="mx-auto text-rose-500 mb-4" size={48} />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Project Not Found</h3>
          <p className="text-slate-600 text-sm mb-6">
            Unable to load the requested project details. It may have been removed or updated.
          </p>
          <div className="flex justify-center gap-3">
            <button onClick={() => refetch()} className="btn-secondary text-xs">
              Try Again
            </button>
            <Link to="/projects" className="btn-primary text-xs">
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const images = project.images && project.images.length > 0 ? project.images : [];

  return (
    <>
      <Helmet>
        <title>{project.title} - Project Case Study</title>
        <meta
          name="description"
          content={project.shortDescription || project.description?.slice(0, 160)}
        />
      </Helmet>

      <div className="pt-28 sm:pt-36 min-h-screen bg-slate-50/50 bg-grid-pattern pb-24">
        <section className="section-padding py-10 sm:py-14">
          <div className="container-custom max-w-6xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                to="/projects"
                className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-primary-600 transition-colors bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200/80 shadow-xs"
              >
                <ArrowLeft size={14} className="mr-2" />
                Back to Projects
              </Link>
            </motion.div>

            {/* Header Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 sm:p-10 mb-10 relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {project.category && (
                  <span className="inline-flex items-center space-x-1.5 bg-primary-100/80 text-primary-800 border border-primary-200/60 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    <Tag size={12} />
                    <span>{project.category}</span>
                  </span>
                )}
                {project.status && (
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                      project.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {project.status}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                {project.title}
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mb-8">
                {project.shortDescription || project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <Globe size={16} className="mr-2" />
                    Visit Live Application
                    <ExternalLink size={14} className="ml-2" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Github size={16} className="mr-2" />
                    View Source Code
                  </a>
                )}
              </div>
            </motion.div>

            {/* Media Showcase (Live Frame or Image Gallery) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              {project.liveUrl ? (
                <div className="glass-card overflow-hidden border border-slate-200/90 shadow-xl">
                  <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                      <span className="ml-2 text-xs font-mono text-slate-400 truncate max-w-xs sm:max-w-md">
                        {project.liveUrl}
                      </span>
                    </div>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 font-mono"
                    >
                      Open in new tab <ExternalLink size={12} />
                    </a>
                  </div>
                  <div className="relative h-[400px] sm:h-[500px] bg-slate-950">
                    <iframe
                      src={project.liveUrl}
                      title={project.title}
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  </div>
                </div>
              ) : images.length > 0 ? (
                <div className="glass-card p-4 overflow-hidden border border-slate-200/90 shadow-xl">
                  <div className="relative h-[350px] sm:h-[480px] rounded-xl overflow-hidden bg-slate-950 mb-4">
                    <img
                      src={getFileUrl(images[activeImageIndex])}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {images.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative h-20 w-32 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                            activeImageIndex === idx
                              ? 'border-primary-600 ring-2 ring-primary-500/30'
                              : 'border-slate-200 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={getFileUrl(img)}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="glass-card h-64 bg-gradient-to-br from-primary-600 via-indigo-600 to-slate-900 flex items-center justify-center text-white p-8 text-center rounded-2xl shadow-lg">
                  <div>
                    <Code2 size={48} className="mx-auto mb-3 opacity-80" />
                    <h3 className="text-2xl font-extrabold">{project.title}</h3>
                    <p className="text-sm opacity-80 mt-1">Full-stack software engineering project</p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Details Grid (Content & Sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Main Content Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Full Description */}
                <div className="glass-card p-6 sm:p-8 space-y-4">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Layers size={20} className="text-primary-600" />
                    Project Overview
                  </h2>
                  <div className="text-slate-600 leading-relaxed space-y-4 text-base">
                    {project.description}
                  </div>
                </div>

                {/* Key Features (if available) */}
                {project.features && project.features.length > 0 && (
                  <div className="glass-card p-6 sm:p-8 space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Sparkles size={20} className="text-amber-500" />
                      Key Features & Architecture
                    </h2>
                    <div className="grid grid-cols-1 gap-3">
                      {project.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/60"
                        >
                          <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar Column */}
              <div className="space-y-6">
                {/* Tech Stack Card */}
                <div className="glass-card p-6 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Code2 size={18} className="text-primary-600" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metadata Sidebar Card */}
                <div className="glass-card p-6 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Project Details</h3>
                  <div className="space-y-3 text-sm">
                    {project.category && (
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">Category</span>
                        <span className="text-slate-900 font-bold capitalize">{project.category}</span>
                      </div>
                    )}
                    {project.status && (
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">Status</span>
                        <span className="text-slate-900 font-bold capitalize">{project.status}</span>
                      </div>
                    )}
                    {project.startDate && (
                      <div className="flex justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-500 font-medium">Timeline</span>
                        <span className="text-slate-900 font-medium">
                          {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectDetail;
