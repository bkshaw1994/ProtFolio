import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useGetExperienceQuery } from '../../features/api/apiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const Experience = () => {
  const { data: experienceResponse, isLoading, isError, refetch } = useGetExperienceQuery();
  const experience = Array.isArray(experienceResponse)
    ? experienceResponse
    : (experienceResponse?.data || []);

  const [selectedExperience, setSelectedExperience] = useState(null);

  // Sort experiences by start date (newest first)
  const sortedExperience = [...experience].sort((a, b) =>
    new Date(b.startDate) - new Date(a.startDate)
  );

  if (isLoading) {
    return <LoadingSpinner size="lg" message="Loading experience..." />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-red-500 mb-4">Error loading experience</div>
          <button onClick={() => refetch()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return 'Present';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0 && remainingMonths > 0) {
      return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    }
  };

  return (
    <>
      <Helmet>
        <title>Experience - Portfolio</title>
        <meta name="description" content="My work experience and career journey" />
      </Helmet>
      <div className="pt-20 min-h-screen bg-gradient-to-b from-secondary-50 to-white">
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
                Work Experience
              </h1>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                My professional journey showcasing {experience.length}+ roles across various organizations
              </p>
            </div>

            {experience.length === 0 ? (
              <p className="text-lg text-secondary-600 text-center">No experience data available.</p>
            ) : (
              <div className="max-w-4xl mx-auto">
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-primary-300"></div>

                  {sortedExperience.map((exp, index) => (
                    <div key={exp._id} className="relative mb-8 last:mb-0">
                      {/* Timeline dot */}
                      <div className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-4 border-white shadow-md transform -translate-x-1/2 z-10 ${
                        exp.isCurrent ? 'bg-primary-600 animate-pulse' : 'bg-primary-500'
                      }`}>
                        {exp.isCurrent && (
                          <span className="absolute inset-0 rounded-full bg-primary-600 animate-ping"></span>
                        )}
                      </div>

                      {/* Mini Card */}
                      <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${
                        index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                      }`}>
                        <button
                          onClick={() => setSelectedExperience(exp)}
                          className="w-full card p-4 hover:shadow-xl transition-all duration-300 group cursor-pointer text-left hover:scale-105 transform"
                        >
                          {/* Mini card content */}
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
                                {exp.position}
                              </h3>
                              <p className="text-primary-600 font-semibold">
                                {exp.company}
                              </p>
                            </div>
                            {exp.isCurrent && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                Current
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-secondary-600 mb-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
                            <span className="text-secondary-400">•</span>
                            <span className="font-medium text-primary-600">
                              {calculateDuration(exp.startDate, exp.endDate)}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-sm text-secondary-500 mb-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{exp.location}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {exp.technologies?.slice(0, 3).map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 bg-primary-50 text-primary-700 text-xs font-medium rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                              {exp.technologies?.length > 3 && (
                                <span className="px-2 py-0.5 bg-secondary-100 text-secondary-600 text-xs font-medium rounded-full">
                                  +{exp.technologies.length - 3}
                                </span>
                              )}
                            </div>
                            <span className="text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                              View →
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Modal/Popup for full details */}
        {selectedExperience && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedExperience(null)}
          >
            <div
              className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="sticky top-0 bg-white border-b border-secondary-200 p-6 flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-secondary-900 mb-1">
                    {selectedExperience.position}
                  </h2>
                  <p className="text-xl text-primary-600 font-semibold">
                    {selectedExperience.company}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="ml-4 p-2 hover:bg-secondary-100 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal content */}
              <div className="p-6">
                {/* Date and duration */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-secondary-600 mb-4">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formatDate(selectedExperience.startDate)} - {formatDate(selectedExperience.endDate)}</span>
                  </div>
                  <span className="text-secondary-400">•</span>
                  <span className="font-medium text-primary-600">
                    {calculateDuration(selectedExperience.startDate, selectedExperience.endDate)}
                  </span>
                  {selectedExperience.isCurrent && (
                    <>
                      <span className="text-secondary-400">•</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Current Role
                      </span>
                    </>
                  )}
                </div>

                {/* Location and work mode */}
                <div className="flex flex-wrap items-center gap-2 text-sm text-secondary-500 mb-4 pb-4 border-b border-secondary-200">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{selectedExperience.location}</span>
                  </div>
                  {selectedExperience.workMode && (
                    <>
                      <span className="text-secondary-400">•</span>
                      <span className="capitalize">{selectedExperience.workMode}</span>
                    </>
                  )}
                  {selectedExperience.employmentType && (
                    <>
                      <span className="text-secondary-400">•</span>
                      <span className="capitalize">{selectedExperience.employmentType}</span>
                    </>
                  )}
                  {selectedExperience.teamSize && (
                    <>
                      <span className="text-secondary-400">•</span>
                      <span>Team size: {selectedExperience.teamSize}</span>
                    </>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">About the Role</h3>
                  <p className="text-secondary-700">{selectedExperience.description}</p>
                </div>

                {/* Responsibilities */}
                {selectedExperience.responsibilities && selectedExperience.responsibilities.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">Key Responsibilities</h3>
                    <ul className="space-y-2">
                      {selectedExperience.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-secondary-600 flex items-start gap-3">
                          <span className="text-primary-500 mt-1 text-lg">▹</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {selectedExperience.technologies && selectedExperience.technologies.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedExperience.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-full hover:bg-primary-100 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Projects */}
                {selectedExperience.keyProjects && selectedExperience.keyProjects.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">Key Projects</h3>
                    <div className="space-y-4">
                      {selectedExperience.keyProjects.map((project, idx) => (
                        <div key={idx} className="bg-secondary-50 rounded-lg p-4">
                          <h4 className="font-semibold text-secondary-900 mb-1">{project.name}</h4>
                          <p className="text-sm text-secondary-600 mb-2">{project.description}</p>
                          {project.technologies && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {project.technologies.map((tech, techIdx) => (
                                <span key={techIdx} className="text-xs px-2 py-1 bg-white text-secondary-700 rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          {project.impact && (
                            <p className="text-sm text-primary-600 flex items-start gap-2">
                              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span><strong>Impact:</strong> {project.impact}</span>
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Experience;
