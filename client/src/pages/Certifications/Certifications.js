import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, Award } from 'lucide-react';
import { useGetCertificationsQuery } from '../../features/api/apiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const Certifications = () => {
  const { data: certificationsResponse, isLoading } = useGetCertificationsQuery();
  const allCertifications = Array.isArray(certificationsResponse)
    ? certificationsResponse
    : certificationsResponse?.data || [];

  const featuredCerts = allCertifications.filter(cert => cert.featured);
  const otherCerts = allCertifications.filter(cert => !cert.featured);

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
      <section className="min-h-screen bg-slate-50/50 bg-grid-pattern pt-24 sm:pt-28 pb-16">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-12 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-primary-100/80 text-primary-800 border border-primary-200/60 px-4 py-2 rounded-full mb-6 shadow-sm">
              <Award size={18} />
              <span className="text-sm font-semibold">Professional Certifications</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Certifications & Badges
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
              Professional credentials and recognized achievements demonstrating my commitment to excellence, continuous learning, and industry best practices.
            </p>
          </div>

          {/* Featured Certifications */}
          {featuredCerts.length > 0 && (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>

                  <div className="relative z-10">
                    {/* Badge Image */}
                    <div className="mb-8 flex justify-center">
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/badge relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur opacity-0 group-hover/badge:opacity-20 transition duration-300"></div>
                        <img
                          src={cert.badge}
                          alt={cert.title}
                          className="relative w-48 h-48 object-contain hover:scale-110 transition-transform duration-300"
                        />
                      </a>
                    </div>

                    {/* Content */}
                    <div className="text-center mb-6">
                      <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold mb-3">
                        {cert.issuer}
                      </div>

                      <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                        {cert.title}
                      </h3>

                      {cert.issueDate && (
                        <p className="text-secondary-600 font-medium mb-4">
                          Awarded {cert.issueDate}
                        </p>
                      )}

                      <p className="text-secondary-600 leading-relaxed mb-6">
                        {cert.description}
                      </p>

                      {cert.credentialDescription && (
                        <div className="mb-6 p-4 bg-secondary-50 rounded-lg">
                          <p className="text-secondary-600 leading-relaxed text-sm">
                            {cert.credentialDescription}
                          </p>
                        </div>
                      )}

                      {cert.learningObjectives && cert.learningObjectives.length > 0 && (
                        <div className="mb-6">
                          <p className="text-sm font-semibold text-secondary-900 mb-3">
                            Key Learning Objectives:
                          </p>
                          <ul className="space-y-2">
                            {cert.learningObjectives.map((objective, index) => (
                              <li key={index} className="flex items-start space-x-3">
                                <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                                  <span className="text-xs">✓</span>
                                </div>
                                <span className="text-secondary-600 text-sm">{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Skills */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-secondary-900 mb-3">
                          Key Skills:
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {cert.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Verification Link */}
                    <div className="flex justify-center">
                      <a
                        href={cert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:shadow-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 group/link"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink
                          size={18}
                          className="group-hover/link:translate-x-1 transition-transform"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* All Certifications Grid */}
          {otherCerts.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
                Additional Certifications
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherCerts.map((cert) => (
                  <div
                    key={cert.id}
                    className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>

                    <div className="relative z-10">
                      <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold mb-3">
                        {cert.issuer}
                      </div>

                      <h3 className="text-lg font-bold text-secondary-900 mb-2">
                        {cert.title}
                      </h3>

                      {cert.issueDate && (
                        <p className="text-sm text-secondary-600 font-medium mb-3">
                          {cert.issueDate}
                        </p>
                      )}

                      <p className="text-sm text-secondary-600 leading-relaxed mb-4">
                        {cert.description}
                      </p>

                      {cert.skills && cert.skills.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {cert.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {cert.verificationUrl && (
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold text-sm group/link"
                        >
                          <span>Verify</span>
                          <ExternalLink
                            size={14}
                            className="group-hover/link:translate-x-1 transition-transform"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          {/* <div className="mt-20 text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-4">
              Interested in Working Together?
            </h2>
            <p className="text-lg text-secondary-600 mb-8 max-w-2xl mx-auto">
              My certifications and commitment to excellence ensure high-quality solutions for your projects.
            </p>
            <Link to="/contact" className="btn-primary group inline-flex">
              Get In Touch
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Certifications;
