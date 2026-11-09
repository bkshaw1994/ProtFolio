import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const InitialLoader = ({ name = 'Bishal Kumar Shaw', isDataLoading = false }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = [
    'Initializing architecture specs...',
    'Connecting Edge APIs...',
    'Verifying Core Web Vitals...',
    'Ready.'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (isDataLoading) {
          if (prev < 92) return prev + 2;
          return 92;
        } else {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return Math.min(100, prev + 6);
        }
      });
    }, 25);

    return () => clearInterval(interval);
  }, [isDataLoading]);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 350);

    return () => clearInterval(messageInterval);
  }, [statusMessages.length]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white select-none overflow-hidden font-mono"
    >
      <div className="flex flex-col items-center space-y-6 w-80 px-4">
        {/* Minimalist Monogram */}
        <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white font-bold text-lg shadow-sm">
          {name.charAt(0)}
        </div>

        {/* Identity & Status */}
        <div className="text-center space-y-1.5">
          <div className="text-sm font-bold tracking-tight text-white">
            {name}
          </div>
          <div className="text-[11px] text-slate-500">
            Frontend Architecture
          </div>
        </div>

        {/* Terminal Line */}
        <div className="w-full flex items-center space-x-2 bg-slate-900/80 text-slate-300 px-3 py-2 rounded-lg text-xs border border-slate-800">
          <Terminal size={13} className="text-slate-500 flex-shrink-0" />
          <span className="text-slate-500 flex-shrink-0">$</span>
          <span className="truncate text-[11px] text-slate-300">
            {statusMessages[statusIndex]}
          </span>
        </div>

        {/* Minimalist Progress Bar */}
        <div className="w-full space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Loading</span>
            <span className="text-white font-semibold">{progress}%</span>
          </div>

          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InitialLoader;
