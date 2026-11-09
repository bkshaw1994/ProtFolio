import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Terminal } from 'lucide-react';
import ParticleNetwork from '../ParticleNetwork';

const InitialLoader = ({ name = 'Bishal Kumar Shaw', isDataLoading = false }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = [
    'Initializing MERN Core...',
    'Loading Experience & Projects...',
    'Rendering Linear Design System...',
    'Welcome!'
  ];

  useEffect(() => {
    // Smooth progress counter responding to actual data loading status
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (isDataLoading) {
          // If data is still loading from APIs, advance smoothly up to 92%
          if (prev < 92) return prev + 2;
          return 92;
        } else {
          // All data loaded! Fill remaining to 100%
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return Math.min(100, prev + 5);
        }
      });
    }, 25);

    return () => clearInterval(interval);
  }, [isDataLoading]);

  useEffect(() => {
    // Cycle status messages
    const messageInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 350);

    return () => clearInterval(messageInterval);
  }, [statusMessages.length]);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02, transition: { duration: 0.4, ease: 'easeOut' } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl text-slate-950 select-none overflow-hidden"
    >
      {/* Particle Network Canvas Background */}
      <ParticleNetwork />

      <div className="relative flex flex-col items-center z-10 space-y-8 w-80 sm:w-96 px-4">
        {/* Animated Frame */}
        <div className="relative flex items-center justify-center w-24 h-24">
          <div className="absolute inset-0 rounded-full border border-slate-200 border-t-slate-950 animate-spin [animation-duration:1.2s]" />

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.02, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-14 h-14 bg-slate-950 rounded-xl flex items-center justify-center text-white border border-slate-800 shadow-xl"
          >
            <Code2 size={26} />
          </motion.div>
        </div>

        {/* User Name & Status */}
        <div className="text-center space-y-3 w-full flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
            {name}
          </h2>

          {/* Code Terminal Line */}
          <div className="w-full flex items-center justify-center space-x-2 bg-slate-950 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-mono shadow-md border border-slate-800">
            <Terminal size={14} className="text-slate-400 flex-shrink-0" />
            <span className="text-emerald-500 flex-shrink-0">$</span>
            <span className="text-slate-300 truncate">{statusMessages[statusIndex]}</span>
          </div>
        </div>

        {/* Minimal Progress Line & Counter */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-medium text-slate-500 uppercase tracking-wider px-1">
            <span className="flex items-center gap-1.5">
              <Sparkles size={12} className="text-slate-700" /> Loading
            </span>
            <span className="text-slate-950 font-bold">{progress}%</span>
          </div>

          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-slate-950 rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InitialLoader;
