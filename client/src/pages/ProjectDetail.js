import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useGetProjectByIdQuery } from '../features/api/apiSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading, isError, refetch } = useGetProjectByIdQuery(id);

  if (isLoading) {
    return <LoadingSpinner size="lg" message="Loading project..." />;
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-red-500 mb-4">Error loading project</div>
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
        <title>{project.title} - Project Details</title>
        <meta name="description" content={project.shortDescription || 'Project details and information'} />
      </Helmet>
      <div className="pt-20 min-h-screen">
        <section className="section-padding">
          <div className="container-custom">
            <h1 className="text-4xl font-bold text-secondary-900 mb-6 text-center">
              {project.title}
            </h1>
            <div className="text-secondary-700 mb-4 text-center">
              {project.description}
            </div>
            {/* Add more detailed project info here as needed */}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectDetail;
