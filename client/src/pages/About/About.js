import { Helmet } from 'react-helmet-async';
import { useGetProfileQuery } from '../../features/api/apiSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

const About = () => {
  const { data: profile, isLoading, isError, refetch } = useGetProfileQuery();

  if (isLoading) {
    return <LoadingSpinner size="lg" message="Loading profile..." />;
  }

  if (isError || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-red-500 mb-4">Error loading profile</div>
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
        <title>About - Portfolio</title>
        <meta name="description" content="Learn more about my background and experience" />
      </Helmet>
      <div className="pt-20 min-h-screen">
        <section className="section-padding">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold text-secondary-900 mb-6">
              About Me
            </h1>
            <div className="text-lg text-secondary-600 max-w-2xl mx-auto">
              {profile.bio || 'No bio available.'}
            </div>
            {/* Add more profile details as needed */}
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
