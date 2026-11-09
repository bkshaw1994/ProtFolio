import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink } from 'lucide-react';
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
        <title>Certifications & Badges - Portfolio</title>
        <meta
          name="description"
          content="Professional certifications and recognized achievements in Six Sigma, process improvement, and quality management."
        />
        <meta
          name="keywords"
          content="certifications, Six Sigma, AIGPE, professional development, quality management"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="min-h-screen bg-white bg-dot-pattern pt-20 sm:pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Professional Certifications
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-950 tracking-tight leading-tight mb-4">
              Certifications & Badges
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Professional credentials and recognized achievements demonstrating my commitment to excellence, continuous learning, and industry best practices.
            </p>
          </div>

          {/* Featured Certifications - Borderless Cards */}
          {featuredCerts.length > 0 && (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {featuredCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-2xl bg-white shadow-xs hover:shadow-md transition-all duration-300 p-8 flex flex-col justify-between"
                >
                  <div>
                    {/* Badge Image */}
                    <div className="mb-8 flex justify-center">
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/badge relative"
                      >
                        <img
                          src={cert.badge}
                          alt={cert.title}
                          className="relative w-44 h-44 object-contain hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                        />
                      </a>
                    </div>

                    {/* Content */}
                    <div className="text-center mb-6">
                      <div className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-800 rounded font-mono text-xs font-semibold mb-3">
                        {cert.issuer}
                      </div>

                      <h3 className="text-2xl font-bold text-slate-950 mb-2">
                        {cert.title}
                      </h3>

                      {cert.issueDate && (
                        <p className="text-slate-500 font-mono text-xs mb-4">
                          Awarded {cert.issueDate}
                        </p>
                      )}

                      <p className="text-slate-600 leading-relaxed text-sm mb-6 font-normal">
                        {cert.description}
                      </p>

                      {cert.credentialDescription && (
                        <div className="mb-6 p-4 bg-slate-50 rounded-lg text-left">
                          <p className="text-slate-600 leading-relaxed text-sm">
                            {cert.credentialDescription}
                          </p>
                        </div>
                      )}

                      {cert.learningObjectives && cert.learningObjectives.length > 0 && (
                        <div className="mb-6 text-left">
                          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-3">
                            Key Learning Objectives:
                          </p>
                          <ul className="space-y-2">
                            {cert.learningObjectives.map((objective, index) => (
                              <li key={index} className="flex items-start space-x-2.5">
                                <span className="text-emerald-600 font-bold text-xs mt-0.5">✓</span>
                                <span className="text-slate-600 text-sm font-normal">{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Skills */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="mb-6">
                        <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-3 text-center">
                          Key Skills:
                        </p>
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {cert.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="font-mono text-xs px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Verification Link */}
                  <div className="flex justify-center pt-4 border-t border-slate-100">
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-5 py-2.5 bg-slate-950 text-white rounded-lg font-mono text-xs font-semibold hover:bg-slate-800 transition-colors group/link"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink
                        size={14}
                        className="group-hover/link:translate-x-0.5 transition-transform"
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* All Certifications Grid - Borderless Cards */}
          {otherCerts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-slate-950 mb-8 text-center tracking-tight">
                Additional Certifications
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherCerts.map((cert) => (
                  <div
                    key={cert.id}
                    className="rounded-xl bg-white shadow-xs hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-800 rounded font-mono text-xs font-semibold mb-3">
                        {cert.issuer}
                      </div>

                      <h3 className="text-lg font-bold text-slate-950 mb-2">
                        {cert.title}
                      </h3>

                      {cert.issueDate && (
                        <p className="text-xs font-mono text-slate-500 mb-3">
                          {cert.issueDate}
                        </p>
                      )}

                      <p className="text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                        {cert.description}
                      </p>

                      {cert.skills && cert.skills.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {cert.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="font-mono text-2xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {cert.verificationUrl && (
                      <div className="pt-4 border-t border-slate-100">
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 text-slate-950 hover:text-emerald-600 font-mono text-xs font-semibold uppercase tracking-wider group/link"
                        >
                          <span>Verify</span>
                          <ExternalLink
                            size={13}
                            className="group-hover/link:translate-x-0.5 transition-transform"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Certifications;
