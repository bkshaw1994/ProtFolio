import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  useGetProfileQuery,
  useGetCoreSkillsQuery,
  useGetFeaturedCertificationsQuery
} from '../features/api/apiSlice';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import HeroSection from './Home/sections/HeroSection';
import TrustBanner from './Home/sections/TrustBanner';
import CaseStudiesSection from './Home/sections/CaseStudiesSection';
import OutcomePackagesSection from './Home/sections/OutcomePackagesSection';
import EngineeringCredibilitySection from './Home/sections/EngineeringCredibilitySection';
import CoreSkillsSection from './Home/sections/CoreSkillsSection';
import CertificationsSection from './Home/sections/CertificationsSection';
import CtaSection from './Home/sections/CtaSection';

const Home = () => {
  const { data: profile, isLoading: loadingProfile } = useGetProfileQuery();
  const { data: coreSkillsResponse } = useGetCoreSkillsQuery();
  const coreSkills = Array.isArray(coreSkillsResponse)
    ? coreSkillsResponse
    : coreSkillsResponse?.data || [];
  const { data: featuredCertificationsResponse } =
    useGetFeaturedCertificationsQuery();
  const featuredCertifications = Array.isArray(featuredCertificationsResponse)
    ? featuredCertificationsResponse
    : featuredCertificationsResponse?.data || [];

  // Extract profile data - handle both direct data and nested data structure
  const profileData = profile?.data || profile;

  if (loadingProfile && !profileData) {
    return <LoadingSpinner />;
  }

  const pageTitle = profileData?.name
    ? `${profileData.name} - Senior Frontend & Full-Stack Architect | Next.js & Performance`
    : 'Bishal Kumar Shaw - Senior Frontend & Full-Stack Architect | Next.js & Performance';

  const pageDescription =
    'Senior Frontend & Full-Stack Architect helping fast-growing SaaS and e-commerce brands eliminate UI lag, slash load times, and ship bulletproof Next.js applications.';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="Next.js architect, Core Web Vitals overhaul, frontend architect, hire Next.js developer, web performance consultant, MVP sprint, AuditPulse creator, React performance, full stack freelance architect"
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bishal-portfolio-chi.vercel.app/" />
      </Helmet>

      {/* 1. HERO SECTION REDESIGN (The 3-Second Hook) */}
      <HeroSection profileData={profileData} />

      {/* Trust & Production Stack Credibility Marquee */}
      <TrustBanner />

      {/* 2. ELITE PROOF-OF-WORK SECTION (SAR Framework Showcase) */}
      <CaseStudiesSection />

      {/* 3. OUTCOME-BASED PACKAGES & PRICING SECTION ("How We Can Work Together") */}
      <OutcomePackagesSection />

      {/* 4. TECHNICAL CREDIBILITY & RIGOROUS ENGINEERING STANDARDS */}
      <EngineeringCredibilitySection />

      {/* Core Technical Capabilities */}
      {coreSkills.length > 0 && <CoreSkillsSection coreSkills={coreSkills} />}

      {/* Verified Certifications */}
      {featuredCertifications.length > 0 && (
        <CertificationsSection certifications={featuredCertifications} />
      )}

      {/* Final High-Converting Conversion Closer CTA */}
      <CtaSection />
    </>
  );
};

export default Home;
