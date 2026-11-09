import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, ShieldCheck, Check, Award } from 'lucide-react';
import { useGetCertificationsQuery } from '../../features/api/apiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const Certifications = () => {
  const { data: certificationsResponse, isLoading } = useGetCertificationsQuery();
  const allCertifications = Array.isArray(certificationsResponse)
    ? certificationsResponse
    : certificationsResponse?.data || [];

  const featuredCerts = allCertifications.filter((cert) => cert.featured);
  const otherCerts = allCertifications.filter((cert) => !cert.featured);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>Certifications & Quality Standards · Bishal Shaw</title>
        <meta
          name="description"
          content="Verified professional credentials in Six Sigma quality management, process optimization, and software engineering standards."
        />
        <meta
          name="keywords"
          content="Six Sigma certifications, quality management, software architecture standards, AIGPE, process optimization"
        />
      </Helmet>

      <div className="pt-24 sm:pt-28 pb-20 min-h-screen bg-white text-slate-900">
        <div className="container-custom max-w-6xl">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono text-xs text-slate-700 mb-3">
              <ShieldCheck size={14} className="text-slate-900" />
              <span>QUALITY GOVERNANCE & ENGINEERING ACCREDITATION</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
              Certifications & Standards Compliance
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Formal credentials and quality management certifications ensuring rigorous defect elimination, statistical process control (Six Sigma), and clean architectural governance.
            </p>
          </div>

          {/* Featured Certifications */}
          {featuredCerts.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-5">
                <span>Featured Credentials</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="text-slate-400 font-normal">Primary Governance</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {featuredCerts.map((cert) => (
                  <div
                    key={cert.id || cert._id || cert.title}
                    className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xs hover:border-slate-400 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Bar with Badge & Issuer */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="w-16 h-16 rounded-lg bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shrink-0">
                          {cert.badge ? (
                            <img
                              src={cert.badge}
                              alt={cert.title}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Award size={24} className="text-slate-400" />
                          )}
                        </div>

                        <div className="text-right">
                          <span className="inline-block px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[11px] font-semibold text-slate-700 uppercase">
                            {cert.issuer}
                          </span>
                          {cert.issueDate && (
                            <div className="text-[11px] font-mono text-slate-400 mt-1">
                              Awarded {cert.issueDate}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold text-slate-950 tracking-tight mb-2">
                        {cert.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                        {cert.description}
                      </p>

                      {cert.credentialDescription && (
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed mb-4">
                          {cert.credentialDescription}
                        </div>
                      )}

                      {/* Learning Objectives */}
                      {cert.learningObjectives && cert.learningObjectives.length > 0 && (
                        <div className="mb-4">
                          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                            Key Competencies Verified:
                          </div>
                          <ul className="space-y-1.5">
                            {cert.learningObjectives.map((obj, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                                <span>{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Skills Tags */}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                          {cert.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] border border-slate-200/80"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Verification Link */}
                    {cert.verificationUrl && (
                      <div className="pt-5 mt-4 border-t border-slate-100">
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary w-full py-2.5 text-xs font-mono inline-flex items-center justify-center gap-1.5"
                        >
                          <span>Verify Credential on Issuer Site</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Certifications Grid */}
          {otherCerts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-5">
                <span>Additional Accreditations</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="text-slate-400 font-normal">Continuing Education</span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {otherCerts.map((cert) => (
                  <div
                    key={cert.id || cert._id || cert.title}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-slate-400 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] font-semibold text-slate-700 uppercase">
                          {cert.issuer}
                        </span>
                        {cert.issueDate && (
                          <span className="text-[11px] font-mono text-slate-400">
                            {cert.issueDate}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-950 tracking-tight mb-2">
                        {cert.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed font-normal mb-3">
                        {cert.description}
                      </p>

                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {cert.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-[10px]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {cert.verificationUrl && (
                      <div className="pt-3 border-t border-slate-100">
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-slate-700 hover:text-slate-950 font-medium inline-flex items-center gap-1 hover:underline"
                        >
                          <span>Verify Credential</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Certifications;
