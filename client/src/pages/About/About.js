import { Helmet } from "react-helmet-async";
import { useGetProfileQuery } from "../../features/api/apiSlice";
import { SkeletonProfile } from "../../components/Skeleton";
import { getFileUrl } from "../../utils/apiUrl";

const About = () => {
  const {
    data: profileResponse,
    isLoading,
    isError,
    refetch,
  } = useGetProfileQuery();

  const profile = profileResponse?.data || profileResponse;

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>About - Portfolio</title>
          <meta
            name="description"
            content="Learn more about my background and experience"
          />
        </Helmet>
        <div className="pt-20 min-h-screen bg-gradient-to-b from-secondary-50 to-white">
          <section className="section-padding">
            <div className="container-custom max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="h-12 bg-gray-200 rounded w-48 mx-auto mb-6 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
              </div>
              <div className="flex justify-center mb-12">
                <SkeletonProfile />
              </div>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-4 bg-gray-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </>
    );
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
        <meta
          name="description"
          content="Learn more about my background and experience as a Senior MERN Stack Developer"
        />
      </Helmet>
      <div className="pt-20 min-h-screen bg-gradient-to-b from-secondary-50 to-white">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-custom max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
                About Me
              </h1>
              <p className="text-xl text-secondary-600">
                Senior MERN Stack Developer | Full-Stack Engineer
              </p>
            </div>

            {/* Profile Image */}
            {profile.profileImage && (
              <div className="flex justify-center mb-12">
                <div className="relative">
                  <img
                    src={getFileUrl(profile.profileImage)}
                    alt={profile.name}
                    className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-white"
                    crossOrigin="anonymous"
                    onError={(e) =>
                      console.error("About page image failed:", e.target.src)
                    }
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {profile.yearsOfExperience || 8}+ Years
                  </div>
                </div>
              </div>
            )}

            {/* About Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                {profile.aboutParagraphs &&
                profile.aboutParagraphs.length > 0 ? (
                  profile.aboutParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-lg text-secondary-700 leading-relaxed mb-6"
                    >
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-lg text-secondary-700 leading-relaxed mb-6">
                    {profile.bio}
                  </p>
                )}
              </div>

              {/* Key Highlights */}
              <div className="grid md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {profile.statistics?.yearsExperience ||
                      profile.yearsOfExperience ||
                      8}
                    +
                  </div>
                  <div className="text-sm text-secondary-600 font-medium">
                    Years Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {profile.statistics?.projectsCompleted || 50}+
                  </div>
                  <div className="text-sm text-secondary-600 font-medium">
                    Projects Completed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {profile.statistics?.technologiesMastered || 20}+
                  </div>
                  <div className="text-sm text-secondary-600 font-medium">
                    Technologies Mastered
                  </div>
                </div>
              </div>

              {/* Core Competencies */}
              {profile.competencies && profile.competencies.length > 0 && (
                <div className="mt-12 pt-12 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                    Core Competencies
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {profile.competencies.map((competency, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                          <svg
                            className="w-4 h-4 text-primary-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-secondary-900 mb-1">
                            {competency.title}
                          </h3>
                          <p className="text-sm text-secondary-600">
                            {competency.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Info */}
              {(profile.email || profile.location || profile.resume) && (
                <div className="mt-12 pt-12 border-t border-gray-200">
                  <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                    Get In Touch
                  </h2>
                  <div className="flex flex-wrap gap-6">
                    {profile.email && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-primary-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-secondary-500 font-medium">
                            Email
                          </div>
                          <a
                            href={`mailto:${profile.email}`}
                            className="text-secondary-900 hover:text-primary-600 transition-colors"
                          >
                            {profile.email}
                          </a>
                        </div>
                      </div>
                    )}
                    {profile.location && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-primary-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-secondary-500 font-medium">
                            Location
                          </div>
                          <div className="text-secondary-900">
                            {profile.location}
                          </div>
                        </div>
                      </div>
                    )}
                    {profile.resume && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-primary-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-secondary-500 font-medium">
                            Resume
                          </div>
                          <a
                            href={getFileUrl(profile.resume)}
                            download
                            className="text-secondary-900 hover:text-primary-600 transition-colors font-medium"
                          >
                            Download Resume
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
