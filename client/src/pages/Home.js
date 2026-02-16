import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  useGetProfileQuery,
  useGetFeaturedProjectsQuery,
  useGetCoreSkillsQuery,
  useGetFeaturedGitHubReposQuery,
  useGetFeaturedCertificationsQuery
} from '../features/api/apiSlice';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import HeroSection from './Home/sections/HeroSection';
import CoreSkillsSection from './Home/sections/CoreSkillsSection';
import FeaturedProjectsSection from './Home/sections/FeaturedProjectsSection';
import WhyChooseMeSection from './Home/sections/WhyChooseMeSection';
import CertificationsSection from './Home/sections/CertificationsSection';
import CtaSection from './Home/sections/CtaSection';

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
  const { data: featuredCertificationsResponse } =
    useGetFeaturedCertificationsQuery();
  const featuredCertifications = Array.isArray(featuredCertificationsResponse)
    ? featuredCertificationsResponse
    : featuredCertificationsResponse?.data || [];
  const primaryCertification = featuredCertifications[0];

  // Debug logging

  // Extract profile data - handle both direct data and nested data structure
  const profileData = profile?.data || profile;

  // Combine portfolio projects and GitHub repos for featured section
  const allFeaturedProjects = [
    ...featuredProjects.slice(0, 3), // Top 3 portfolio projects
    ...githubRepos.slice(0, 3) // Top 3 GitHub repos
  ].slice(0, 6); // Show max 6 featured projects

  if (loadingProfile || loadingProjects || loadingSkills) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>
          {profileData?.name
            ? `${profileData.name} - Full Stack Developer`
            : 'Portfolio - Full Stack Developer'}
        </title>
        <meta
          name="description"
          content={
            profileData?.summary ||
            'Professional portfolio showcasing 9 years of MERN stack development experience'
          }
        />
        <meta
          name="keywords"
          content="full stack developer, MERN stack, React, Node.js, MongoDB, Express"
        />
        <meta
          property="og:title"
          content={`${profile?.name || 'Portfolio'} - Full Stack Developer`}
        />
        <meta
          property="og:description"
          content={
            profile?.summary ||
            'Professional portfolio showcasing development experience'
          }
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <HeroSection
        profileData={profileData}
        featuredProjectsCount={featuredProjects.length}
      />
      <CoreSkillsSection coreSkills={coreSkills} />
      <FeaturedProjectsSection allFeaturedProjects={allFeaturedProjects} />
      <WhyChooseMeSection />
      <CertificationsSection certifications={featuredCertifications} />
      <CtaSection />
    </>
  );
};

export default Home;
