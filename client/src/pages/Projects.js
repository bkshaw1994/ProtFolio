import { Helmet } from 'react-helmet-async';
import { useGetProjectsQuery } from '../features/api/apiSlice';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Projects = () => {
  const { data: projectsData = { data: [] }, isLoading, isError, refetch } = useGetProjectsQuery();
  const projects = projectsData.data || [];

  if (isLoading) {
    return <LoadingSpinner size="lg" message="Loading projects..." />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-red-500 mb-4">Error loading projects</div>
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
        <title>Projects - Portfolio</title>
        <meta name="description" content="Browse my portfolio of projects and work" />
      </Helmet>
      <div className="pt-20 min-h-screen">
        <section className="section-padding">
          <div className="container-custom">
            <h1 className="text-4xl font-bold text-secondary-900 mb-6 text-center">
              My Projects
            </h1>
            {projects.length === 0 ? (
              <p className="text-lg text-secondary-600 text-center">No projects available.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;
