import React from 'react';

const SectionDivider = ({ variant = 'gradient-line' }) => {
  if (variant === 'wave') {
    return (
      <div className="w-full overflow-hidden leading-none py-2 pointer-events-none select-none">
        <svg
          className="relative block w-full h-8 text-slate-200/60"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="container-custom py-6 flex items-center justify-center space-x-3 pointer-events-none select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
        <span className="w-2.5 h-2.5 rounded-full bg-primary-400"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
      </div>
    );
  }

  // Default: gradient-line with center glow dot
  return (
    <div className="container-custom py-6 sm:py-8 pointer-events-none select-none">
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-slate-200/80"></div>
        <div className="absolute px-4 bg-slate-50/50 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-indigo-500 ring-4 ring-primary-100/60 shadow-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
