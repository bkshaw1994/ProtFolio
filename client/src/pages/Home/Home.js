import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  Download,
  Code,
  Palette,
  Database,
  Zap,
  Mail,
  MapPin,
} from "lucide-react";
import {
  useGetProfileQuery,
  useGetFeaturedProjectsQuery,
  useGetCoreSkillsQuery,
  useGetFeaturedGitHubReposQuery,
} from "../../features/api/apiSlice";

// Components
import ProjectCard from "../../components/ProjectCard";
import SkillBadge from "../../components/SkillBadge";
import {
  SkeletonProject,
  SkeletonSkill,
  SkeletonProfile,
} from "../../components/Skeleton";
import { getFileUrl } from "../../utils/apiUrl";

const Home = () => {
  const { data: profile, isLoading: loadingProfile } = useGetProfileQuery();
  const { data: featuredProjectsResponse, isLoading: loadingProjects } =
    useGetFeaturedProjectsQuery();
  const featuredProjects = Array.isArray(featuredProjectsResponse)
    ? featuredProjectsResponse
    : featuredProjectsResponse?.data || [];
  const { data: coreSkillsResponse, isLoading: loadingSkills } =
    useGetCoreSkillsQuery();
  const coreSkills = Array.isArray(coreSkillsResponse)
    ? coreSkillsResponse
    : coreSkillsResponse?.data || [];
  const { data: githubReposResponse } = useGetFeaturedGitHubReposQuery();
  const githubRepos = githubReposResponse?.data || [];

  // Extract profile data - handle both direct data and nested data structure
  const profileData = profile?.data || profile;

  // Combine portfolio projects and GitHub repos for featured section
  const allFeaturedProjects = [
    ...featuredProjects.slice(0, 3), // Top 3 portfolio projects
    ...githubRepos.slice(0, 3), // Top 3 GitHub repos
  ].slice(0, 6); // Show max 6 featured projects

  // Loading states for different sections
  const renderHeroSkeleton = () => (
    <section className="section-padding min-h-screen flex items-center bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <SkeletonProfile />
            <div className="h-8 w-3/4 bg-secondary-200 rounded animate-pulse" />
            <div className="space-y-3">
              <div className="h-4 bg-secondary-200 rounded animate-pulse" />
              <div className="h-4 bg-secondary-200 rounded animate-pulse w-5/6" />
            </div>
            <div className="flex gap-4">
              <div className="h-12 w-32 bg-secondary-200 rounded-lg animate-pulse" />
              <div className="h-12 w-32 bg-secondary-200 rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="h-96 bg-secondary-200 rounded-lg animate-pulse" />
        </div>
      </div>
    </section>
  );

  if (loadingProfile) {
    return renderHeroSkeleton();
  }

  return (
    <>
      <Helmet>
        <title>
          {profileData?.name
            ? `${profileData.name} - Freelance MERN Stack Developer | Available for Hire`
            : "Freelance Full Stack Developer | MERN Stack Expert for Hire"}
        </title>
        <meta
          name="description"
          content={
            profileData?.summary ||
            "Professional freelance MERN stack developer with 9+ years experience. Available for hire for React, Node.js, MongoDB web development projects. Contact for custom web solutions."
          }
        />
        <meta
          name="keywords"
          content="freelance developer, hire MERN developer, React developer for hire, Node.js freelancer, MongoDB expert, full stack developer available, web developer Bangalore, freelance programmer"
        />
        <meta
          name="keywords"
          content="full stack developer, MERN stack, React, Node.js, MongoDB, Express"
        />
        <meta
          property="og:title"
          content={`${profile?.name || "Portfolio"} - Full Stack Developer`}
        />
        <meta
          property="og:description"
          content={
            profile?.summary ||
            "Professional portfolio showcasing development experience"
          }
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {profileData?.name
                      ? profileData.name.charAt(0).toUpperCase()
                      : "H"}
                  </div>
                  <div className="badge badge-primary">Available for work</div>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 leading-tight">
                  Hi, I'm{" "}
                  <span className="text-gradient">{profileData?.name}</span>
                </h1>

                <h2 className="text-xl sm:text-2xl text-secondary-600 font-medium">
                  {profileData?.title}
                </h2>
              </div>

              <p className="text-lg text-secondary-700 leading-relaxed max-w-2xl">
                {profileData?.summary}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600">
                    {profileData?.yearsOfExperience}+
                  </div>
                  <div className="text-sm text-secondary-600">
                    Years Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600">
                    {featuredProjects.length}+
                  </div>
                  <div className="text-sm text-secondary-600">
                    Projects Done
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600">
                    100%
                  </div>
                  <div className="text-sm text-secondary-600">
                    Client Satisfaction
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link to="/projects" className="btn-primary group">
                  View My Work
                  <ArrowRight
                    size={20}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <Link to="/contact" className="btn-outline">
                  Get In Touch
                </Link>

                {profileData?.resume && (
                  <a
                    href={getFileUrl(profileData.resume)}
                    download
                    className="btn-secondary group"
                  >
                    <Download
                      size={20}
                      className="mr-2 group-hover:-translate-y-1 transition-transform"
                    />
                    Download CV
                  </a>
                )}
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-6 text-sm text-secondary-600">
                {profileData?.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{profileData.location}</span>
                  </div>
                )}
                {profileData?.email && (
                  <div className="flex items-center space-x-2">
                    <Mail size={16} />
                    <a
                      href={`mailto:${profileData.email}`}
                      className="hover:text-primary-600 transition-colors"
                    >
                      {profileData.email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Right Content - Profile Image */}
            <div className="relative animate-slide-up">
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary-200 via-primary-100 to-secondary-100 rounded-full overflow-hidden shadow-custom-xl">
                  {profileData?.profileImage ? (
                    <img
                      src={getFileUrl(profileData.profileImage)}
                      alt={profileData.name || "Profile"}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        console.error("Home page image failed:", {
                          src: e.target.src,
                          profileImage: profileData.profileImage,
                          constructedUrl: getFileUrl(profileData.profileImage),
                        });
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-primary-600">
                      {profileData?.name
                        ? profileData.name.charAt(0).toUpperCase()
                        : "P"}
                    </div>
                  )}
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white shadow-lg animate-pulse-slow">
                  <Code size={24} />
                </div>

                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-700 rounded-lg flex items-center justify-center text-white shadow-lg animate-pulse-slow">
                  <Database size={20} />
                </div>

                <div className="absolute top-1/2 -left-8 w-14 h-14 bg-gradient-to-br from-success-500 to-success-700 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse-slow">
                  <Zap size={22} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Skills Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              Core Skills
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {loadingSkills
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonSkill key={index} />
                ))
              : coreSkills.map((skill, index) => (
                  <SkillBadge key={index} skill={skill} />
                ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/skills" className="btn-outline">
              View All Skills
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              A showcase of my portfolio projects and open-source contributions
            </p>
          </div>

          {loadingProjects ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonProject key={index} />
              ))}
            </div>
          ) : allFeaturedProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🚀</div>
              <p className="text-gray-600">
                Featured projects will appear here soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allFeaturedProjects.map((project, index) => (
                <ProjectCard
                  key={project._id || project.githubUrl || index}
                  project={project}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/projects" className="btn-primary">
              View All Projects
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              Why Choose Me
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              What makes me different from other developers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6 card-hover text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                <Code size={32} />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                Clean Code
              </h3>
              <p className="text-secondary-600">
                Writing maintainable, scalable, and well-documented code
                following industry best practices.
              </p>
            </div>

            <div className="card p-6 card-hover text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-700 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                Fast Delivery
              </h3>
              <p className="text-secondary-600">
                Efficient development process with timely delivery without
                compromising on quality.
              </p>
            </div>

            <div className="card p-6 card-hover text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                <Palette size={32} />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                Modern Design
              </h3>
              <p className="text-secondary-600">
                Creating beautiful, responsive, and user-friendly interfaces
                with modern design principles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Let's work together to bring your ideas to life with cutting-edge
              technology and creative solutions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Start a Project
              </Link>
              <Link
                to="/about"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Learn More About Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
