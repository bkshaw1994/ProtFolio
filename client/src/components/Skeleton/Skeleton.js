import React from 'react';

const Skeleton = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  count = 1
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'text':
        return 'rounded h-4';
      case 'rectangular':
      default:
        return 'rounded-lg';
    }
  };

  const skeletonClasses = `bg-gradient-to-r from-secondary-200 via-secondary-300 to-secondary-200 animate-pulse ${getVariantClasses()} ${className}`;

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '100%')
  };

  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className={skeletonClasses} style={style} />
        ))}
      </div>
    );
  }

  return <div className={skeletonClasses} style={style} />;
};

// Preset skeleton components
export const SkeletonCard = () => (
  <div className="card p-6 space-y-4">
    <Skeleton variant="rectangular" height="200px" />
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="80%" />
    <Skeleton variant="text" width="40%" />
  </div>
);

export const SkeletonProfile = () => (
  <div className="flex items-center space-x-4 p-4">
    <Skeleton variant="circular" width="60px" height="60px" />
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="text" width="60%" />
    </div>
  </div>
);

export const SkeletonProject = () => (
  <div className="card overflow-hidden">
    <Skeleton variant="rectangular" height="200px" className="rounded-none" />
    <div className="p-6 space-y-3">
      <Skeleton variant="text" width="70%" height="24px" />
      <Skeleton variant="text" count={2} />
      <div className="flex gap-2 mt-4">
        <Skeleton variant="rectangular" width="80px" height="32px" />
        <Skeleton variant="rectangular" width="80px" height="32px" />
      </div>
    </div>
  </div>
);

export const SkeletonExperience = () => (
  <div className="border-l-4 border-primary-500 pl-6 pb-8 relative">
    <div className="absolute left-[-8px] top-0 w-4 h-4 bg-secondary-300 rounded-full animate-pulse" />
    <div className="space-y-3">
      <Skeleton variant="text" width="50%" height="20px" />
      <Skeleton variant="text" width="40%" height="16px" />
      <Skeleton variant="text" count={2} />
    </div>
  </div>
);

export const SkeletonSkill = () => (
  <div className="card p-4 text-center space-y-3">
    <div className="flex justify-center">
      <Skeleton variant="circular" width="48px" height="48px" />
    </div>
    <Skeleton variant="text" width="60%" className="mx-auto" />
    <Skeleton variant="rectangular" height="8px" />
  </div>
);

export default Skeleton;
