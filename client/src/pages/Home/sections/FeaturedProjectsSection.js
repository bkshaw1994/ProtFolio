import React from 'react';
import CaseStudiesSection from './CaseStudiesSection';

// Backwards-compatible wrapper delegating to the new high-converting CaseStudiesSection
const FeaturedProjectsSection = () => {
  return <CaseStudiesSection />;
};

export default FeaturedProjectsSection;
