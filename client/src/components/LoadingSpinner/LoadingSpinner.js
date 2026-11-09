import React from 'react';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-7 w-7',
    lg: 'h-10 w-10',
    xl: 'h-14 w-14'
  };

  const containerClasses = {
    sm: 'py-6',
    md: 'py-10',
    lg: 'py-14',
    xl: 'py-20'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${containerClasses[size]}`}>
      <div className={`loader ${sizeClasses[size]}`}></div>
      {message && (
        <p className="mt-3 text-slate-500 font-mono text-xs">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
