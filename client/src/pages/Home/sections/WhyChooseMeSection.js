import React from 'react';
import EngineeringCredibilitySection from './EngineeringCredibilitySection';

// Backwards-compatible wrapper delegating to the new high-credibility EngineeringCredibilitySection
const WhyChooseMeSection = () => {
  return <EngineeringCredibilitySection />;
};

export default WhyChooseMeSection;
