import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Download,
  CheckCircle2,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { useGetProfileQuery } from '../../features/api/apiSlice';
import { SkeletonProfile } from '../../components/Skeleton';
import { getFileUrl } from '../../utils/apiUrl';

const About = () => {
  const {
    data: profileResponse,
    isLoading,
    isError,
    refetch
  } = useGetProfileQuery();

  const profile = profileResponse?.data || profileResponse;

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>About - Bishal Kumar Shaw</title>
          <meta
            name="description"
            content="Senior Frontend & Full-Stack Architect background and engineering philosophy"
          />
        </Helmet>
        <div className="pt-24 sm:pt-28 min-h-screen bg-slate-50/50 pb-16">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="flex justify-center mb-12">
              <SkeletonProfile />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-4 bg-slate-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isError || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 sm:pt-28">
        <div className="text-center">
          <div className="text-red-500 mb-4 font-mono text-sm">Error loading profile data</div>
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
        <title>About - Bishal Kumar Shaw | Senior Frontend Architect</title>
        <meta
          name="description"
          content="Senior Frontend & Full-Stack Architect with 9+ years experience delivering sub-second Core Web Vitals, Next.js architecture, and high-velocity MVP sprints for high-growth tech startups."
        />
      </Helmet>

      <div className="pt-24 sm:pt-28 min-h-screen bg-white pb-20">
        <div className="container-custom max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 space-y-2">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500">
              Biography & Background
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              About Bishal Kumar Shaw
            </h1>
            <p className="text-base text-slate-600 font-normal">
              Senior Frontend & Full-Stack Architect • Specialist in Next.js, Core Web Vitals & Production Sprints
            </p>
          </div>

          {/* Profile Identity Bar */}
          <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-900 text-white flex items-center justify-center font-bold text-2xl flex-shrink-0 border border-slate-300">
              {profile.profileImage ? (
                <img
                  src={getFileUrl(profile.profileImage)}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                  width="96"
                  height="96"
                />
              ) : (
                'B'
              )}
            </div>

            <div className="space-y-2 text-center sm:text-left flex-grow">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-lg font-bold text-slate-950">
                  {profile.name || 'Bishal Kumar Shaw'}
                </span>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Available for Contracts
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {profile.summary ||
                  'Specialized in architecting high-performance web applications, eliminating UI bottlenecks, and building resilient Next.js systems.'}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-1 font-mono">
                {profile.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-slate-400" />
                    <span>{profile.location}</span>
                  </span>
                )}
                {profile.email && (
                  <span className="flex items-center gap-1">
                    <Mail size={13} className="text-slate-400" />
                    <span>{profile.email}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Executive Proof Metrics (Replacing Junior Counters) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <div className="text-2xl font-bold font-mono text-slate-950">
                {profile.yearsOfExperience || 9}+ Yrs
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-1">
                Lead Architecture
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <div className="text-2xl font-bold font-mono text-slate-950">
                &lt; 1.2s
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-1">
                Target LCP Guarantee
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <div className="text-2xl font-bold font-mono text-slate-950">
                $10M+
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-1">
                Scale Supported
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <div className="text-2xl font-bold font-mono text-slate-950">
                98+
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mt-1">
                Lighthouse Standard
              </div>
            </div>
          </div>

          {/* Detailed Biography Text */}
          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal mb-12">
            {profile.aboutParagraphs && profile.aboutParagraphs.length > 0 ? (
              profile.aboutParagraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))
            ) : (
              <>
                <p>
                  I am a Senior Frontend and Full-Stack Architect with over 9 years of hands-on experience building, scaling, and optimizing web applications for Seed-to-Series-A venture-backed startups and high-growth brands.
                </p>
                <p>
                  My engineering focus centers on high-impact performance governance: eliminating client-side hydration bottlenecks, implementing streaming server-side architectures with Next.js App Router, and architecting resilient microservices that scale under heavy traffic.
                </p>
                <p>
                  As an active creator in the open-source performance ecosystem, I authored <strong>AuditPulse</strong>—a headless Core Web Vitals and SPA SEO monitoring engine that gives engineering teams real-time visibility into synthetic performance regressions.
                </p>
              </>
            )}
          </div>

          {/* Core Competencies */}
          {profile.competencies && profile.competencies.length > 0 && (
            <div className="mb-12 pt-8 border-t border-slate-200">
              <h2 className="text-xl font-bold text-slate-950 tracking-tight mb-6">
                Architectural Competencies
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {profile.competencies.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                      <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                      <span>{comp.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-5 font-normal">
                      {comp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Card */}
          <div className="p-6 rounded-xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-sm font-bold text-white">
                Interested in working together?
              </div>
              <div className="text-xs text-slate-400">
                Available for 2-week performance sprints, 4-week MVP launches, or monthly advisory.
              </div>
            </div>

            <div className="flex items-center gap-3">
              {profile.resume && (
                <a
                  href={getFileUrl(profile.resume)}
                  download
                  className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-slate-900 hover:text-white border border-slate-800 transition-colors"
                >
                  <Download size={13} className="mr-1.5" />
                  <span>Resume</span>
                </a>
              )}

              <Link
                to="/contact?service=audit"
                className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 transition-colors"
              >
                <Calendar size={13} className="mr-1.5" />
                <span>Book Audit</span>
                <ArrowRight size={13} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
