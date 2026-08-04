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
    'Rendering Glassmorphic UI...',
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
      exit={{ opacity: 0, scale: 1.03, transition: { duration: 0.45, ease: 'easeOut' } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50/95 backdrop-blur-2xl text-slate-900 select-none overflow-hidden"
    >
      {/* Interactive Spider-Web / Constellation Canvas Background */}
      <ParticleNetwork />

      <div className="relative flex flex-col items-center z-10 space-y-8 max-w-sm px-4">
        {/* Animated Hex Orbit Logo Frame */}
        <div className="relative flex items-center justify-center w-28 h-28">
          {/* Outer Orbit Spinning Gradient Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-slate-200 border-t-primary-600 border-r-indigo-500 animate-spin [animation-duration:1.4s]" />
          
          {/* Outer Pulse Halo */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary-500/20 to-indigo-500/20 blur-md animate-pulse" />

          {/* Center Glass Card Icon */}
          <motion.div
            initial={{ scale: 0.85 }}
            animate={{ scale: [0.85, 1.02, 0.85] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 bg-gradient-to-tr from-primary-600 via-primary-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-extrabold shadow-xl shadow-primary-500/25 border border-white/40"
          >
            <Code2 size={32} />
          </motion.div>
        </div>

        {/* User Name & High-Tech Status */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            <span className="text-primary-700">{name}</span>
          </h2>

          {/* Interactive Code Terminal Line */}
          <div className="inline-flex items-center space-x-2 bg-slate-900 text-slate-200 px-4 py-2 rounded-xl text-xs font-mono shadow-md border border-slate-800">
            <Terminal size={14} className="text-primary-400" />
            <span className="text-emerald-400">$</span>
            <span className="text-slate-300">{statusMessages[statusIndex]}</span>
          </div>
        </div>

        {/* Minimal Progress Line & Counter */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            <span className="flex items-center gap-1">
              <Sparkles size={13} className="text-primary-600" /> Loading
            </span>
            <span className="text-primary-600 font-extrabold font-mono text-sm">{progress}%</span>
          </div>

          <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-slate-300/50">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-600 via-indigo-500 to-sky-400 rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InitialLoader;
