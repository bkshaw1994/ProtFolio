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

  const skeletonClasses = `bg-slate-100 animate-pulse ${getVariantClasses()} ${className}`;

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

export const SkeletonCard = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-2xs">
    <Skeleton variant="rectangular" height="180px" />
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="80%" />
    <Skeleton variant="text" width="40%" />
  </div>
);

export const SkeletonProfile = () => (
  <div className="flex items-center space-x-4 p-4 rounded-xl border border-slate-200 bg-white">
    <Skeleton variant="circular" width="56px" height="56px" />
    <div className="flex-1 space-y-2">
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="text" width="60%" />
    </div>
  </div>
);

export const SkeletonProject = () => (
  <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
    <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
      </div>
      <Skeleton variant="rectangular" width="80px" height="18px" />
    </div>
    <div className="p-6 space-y-3">
      <Skeleton variant="text" width="70%" height="22px" />
      <Skeleton variant="text" count={2} />
      <div className="flex gap-2 pt-3">
        <Skeleton variant="rectangular" width="70px" height="24px" />
        <Skeleton variant="rectangular" width="70px" height="24px" />
      </div>
    </div>
  </div>
);

export const SkeletonExperience = () => (
  <div className="border-l border-slate-200 pl-6 pb-8 relative">
    <div className="absolute left-[-4px] top-1 w-2 h-2 bg-slate-400 rounded-full" />
    <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-2xs">
      <Skeleton variant="text" width="40%" height="20px" />
      <Skeleton variant="text" width="60%" height="16px" />
      <Skeleton variant="text" count={3} />
    </div>
  </div>
);

export const SkeletonSkill = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 text-center space-y-3 shadow-2xs">
    <div className="flex justify-center">
      <Skeleton variant="circular" width="36px" height="36px" />
    </div>
    <Skeleton variant="text" width="60%" className="mx-auto" />
    <Skeleton variant="rectangular" height="6px" />
  </div>
);

export default Skeleton;
