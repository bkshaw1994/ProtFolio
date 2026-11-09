import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetProfileQuery } from '../features/api/apiSlice';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import HeroSection from './Home/sections/HeroSection';
import TrustBanner from './Home/sections/TrustBanner';
import CaseStudiesSnapshot from './Home/sections/CaseStudiesSnapshot';
import ServicesSnapshot from './Home/sections/ServicesSnapshot';
import EngineeringCredibilitySection from './Home/sections/EngineeringCredibilitySection';
import CtaSection from './Home/sections/CtaSection';

const Home = () => {
  const { data: profile, isLoading: loadingProfile } = useGetProfileQuery();

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

      {/* 1. HERO SECTION (The 3-Second Hook) */}
      <HeroSection profileData={profileData} />

      {/* 2. PRODUCTION TECH STACK & CREDIBILITY MARQUEE */}
      <TrustBanner />

      {/* 3. FLAGSHIP PROOF-OF-WORK SNAPSHOT */}
      <CaseStudiesSnapshot />

      {/* 4. FIXED-SCOPE PACKAGES & SPRINTS SNAPSHOT */}
      <ServicesSnapshot />

      {/* 5. SENIOR ARCHITECTURAL STANDARDS & CREDIBILITY */}
      <EngineeringCredibilitySection />

      {/* 6. CONVERSION CLOSER CTA */}
      <CtaSection />
    </>
  );
};

export default Home;
