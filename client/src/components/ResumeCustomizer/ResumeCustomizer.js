import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle, Sliders, UserCheck } from 'lucide-react';
import { useGetProfileQuery } from '../../features/api/apiSlice';
import { getFileUrl } from '../../utils/apiUrl';

const ResumeCustomizer = () => {
  const [roleFocus, setRoleFocus] = useState('fullstack');
  const [includeProjects, setIncludeProjects] = useState(true);
  const [includeCertifications, setIncludeCertifications] = useState(true);

  const { data: profile } = useGetProfileQuery();
  const profileData = profile?.data || profile;

  const roleHighlights = {
    fullstack: {
      title: 'Full Stack Engineer Focus',
      highlights: [
        'End-to-End MERN Stack Architecture & Design',
        'RESTful & GraphQL API Development with Node.js/Express',
        'Database Optimization & MongoDB Aggregation Pipelines',
        'Frontend State Management with Redux Toolkit & React'
      ]
    },
    frontend: {
      title: 'Frontend Specialist Focus',
      highlights: [
        'Modern React 18, Next.js, and TypeScript Web Interfaces',
        'TailwindCSS, Dynamic Animations (Framer Motion) & Glassmorphism',
        'Web Vitals & Performance Optimization (Core Web Vitals 95+)',
        'Responsive & Mobile-First Component Architecture'
      ]
    },
    backend: {
      title: 'Backend & Cloud Systems Focus',
      highlights: [
        'Scalable Node.js Microservices & Event-Driven Architecture',
        'Database Modeling, Indexing & Query Tuning (MongoDB, PostgreSQL)',
        'Authentication, Security (JWT, OAuth, Rate Limiting), CI/CD',
        'Docker Containerization, AWS Deployment & Cloud Infrastructure'
      ]
    }
  };

  const currentRole = roleHighlights[roleFocus];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1">
            <Sliders size={14} />
            <span>Interactive Recruiter Tool</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Tailored Resume Customizer
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Select your target hiring role to filter relevant engineering highlights
          </p>
        </div>

        {profileData?.resume && (
          <a
            href={getFileUrl(profileData.resume)}
            download
            className="btn-primary !py-2.5 !px-5 text-xs font-semibold flex items-center justify-center gap-2 shadow-md shrink-0"
          >
            <Download size={16} />
            <span>Download Official Resume</span>
          </a>
        )}
      </div>

      {/* Role Selector Tabs */}
      <div className="mt-6 flex flex-wrap gap-2.5">
        {[
          { key: 'fullstack', label: 'Full-Stack Developer' },
          { key: 'frontend', label: 'Frontend Specialist' },
          { key: 'backend', label: 'Backend Architect' }
        ].map((role) => (
          <button
            key={role.key}
            onClick={() => setRoleFocus(role.key)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
              roleFocus === role.key
                ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* Filtered Highlights Display Card */}
      <motion.div
        key={roleFocus}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200/80"
      >
        <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
          <UserCheck size={16} className="text-primary-600" />
          <span>{currentRole.title}</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentRole.highlights.map((point, index) => (
            <div key={index} className="flex items-start gap-2.5 text-xs text-slate-700">
              <CheckCircle size={15} className="text-emerald-500 shrink-0 mt-0.5" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Additional Options */}
      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-600">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeProjects}
            onChange={(e) => setIncludeProjects(e.target.checked)}
            className="rounded text-primary-600 focus:ring-primary-500"
          />
          <span>Include Featured Projects Summary</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeCertifications}
            onChange={(e) => setIncludeCertifications(e.target.checked)}
            className="rounded text-primary-600 focus:ring-primary-500"
          />
          <span>Include Verified Certifications</span>
        </label>
      </div>
    </div>
  );
};

export default ResumeCustomizer;
