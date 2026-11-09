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
      <div className="min-h-screen bg-slate-50/50 bg-grid-pattern pt-24 sm:pt-28 pb-16 flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading project details..." />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 sm:pt-28 bg-slate-50/50 bg-grid-pattern">
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

      <div className="pt-24 sm:pt-28 min-h-screen bg-white pb-20">
        <div className="container-custom max-w-5xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              to="/projects"
              className="inline-flex items-center text-xs font-mono font-semibold text-slate-600 hover:text-slate-950 transition-colors"
            >
              <ArrowLeft size={13} className="mr-1.5" />
              Back to Projects
            </Link>
          </div>

          {/* Header Hero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-50/50 p-6 sm:p-8 rounded-xl border border-slate-200/90 mb-8"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {project.category && (
                <span className="inline-flex items-center space-x-1.5 bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded text-[11px] font-mono">
                  <Tag size={11} />
                  <span>{project.category}</span>
                </span>
              )}
              {project.status && (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider ${
                    project.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {project.status}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
              {project.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-3xl mb-6">
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
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-2xs bg-white">
                <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
                    <span className="ml-2 text-xs font-mono text-slate-400 truncate max-w-xs sm:max-w-md">
                      {project.liveUrl}
                    </span>
                  </div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono transition-colors"
                  >
                    <span>Open in new tab</span>
                    <ExternalLink size={12} />
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
              <div className="rounded-xl p-4 overflow-hidden border border-slate-200 shadow-2xs bg-white">
                <div className="relative h-[350px] sm:h-[480px] rounded-lg overflow-hidden bg-slate-950 mb-3">
                  <img
                    src={getFileUrl(images[activeImageIndex])}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-contain"
                  />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative h-16 w-24 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${
                          activeImageIndex === idx
                            ? 'border-slate-900 ring-2 ring-slate-900/10'
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
              <div className="h-64 bg-slate-950 border border-slate-800 flex items-center justify-center text-white p-8 text-center rounded-xl">
                <div>
                  <Code2 size={40} className="mx-auto mb-3 opacity-60" />
                  <h3 className="text-xl font-bold font-mono">{project.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 font-mono">Frontend architecture project showcase</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Details Grid (Content & Sidebar) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Full Description */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-2xs">
                <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                  <Layers size={18} className="text-slate-700" />
                  Project Overview & Architecture
                </h2>
                <div className="text-slate-600 leading-relaxed space-y-4 text-sm font-normal">
                  {project.description}
                </div>
              </div>

              {/* Key Features (if available) */}
              {project.features && project.features.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-2xs">
                  <h2 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                    <Sparkles size={18} className="text-slate-700" />
                    Key Architectural Capabilities
                  </h2>
                  <div className="grid grid-cols-1 gap-2.5">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-lg border border-slate-200/80"
                      >
                        <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-xs font-normal leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar Column */}
            <div className="space-y-6">
              {/* Tech Stack Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-2xs">
                <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                  <Code2 size={16} className="text-slate-700" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metadata Sidebar Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-2xs">
                <h3 className="text-base font-bold text-slate-950 font-mono">Project Specs</h3>
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
      </div>
    </>
  );
};

export default ProjectDetail;
