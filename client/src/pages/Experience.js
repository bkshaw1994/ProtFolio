import { Helmet } from 'react-helmet-async';
import { useGetExperienceQuery } from '../features/api/apiSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const Experience = () => {
  const { data: experienceResponse, isLoading, isError, refetch } = useGetExperienceQuery();
  const experience = Array.isArray(experienceResponse)
    ? experienceResponse
    : (experienceResponse?.data || []);

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

  return (
    <>
      <Helmet>
        <title>Experience - Portfolio</title>
        <meta name="description" content="My work experience and career journey" />
      </Helmet>
      <div className="pt-20 min-h-screen">
        <section className="section-padding">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold text-secondary-900 mb-6">
              Work Experience
            </h1>
            {/* Render experience data here */}
            {experience.length === 0 ? (
              <p className="text-lg text-secondary-600">No experience data available.</p>
            ) : (
              <ul className="space-y-6">
                {experience.map((exp) => (
                  <li key={exp._id} className="card p-6 text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div className="font-bold text-lg text-primary-700">{exp.position}</div>
                      <div className="text-secondary-500 text-sm">
                        {exp.company} &middot; {exp.location}
                      </div>
                    </div>
                    <div className="text-secondary-700 mb-2">{exp.description}</div>
                    <div className="flex flex-wrap gap-2 text-xs text-secondary-500">
                      {exp.technologies?.map((tech, idx) => (
                        <span key={idx} className="badge badge-secondary">{tech}</span>
                      ))}
                    </div>
                    <div className="text-xs text-secondary-400 mt-2">
                      {new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Experience;
