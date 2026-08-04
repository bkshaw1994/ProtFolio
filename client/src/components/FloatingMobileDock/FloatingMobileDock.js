import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  FolderGit2,
  Cpu,
  Briefcase,
  Award,
  User,
  Mail
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/projects', label: 'Projects', icon: FolderGit2 },
  { path: '/skills', label: 'Skills', icon: Cpu },
  { path: '/experience', label: 'Experience', icon: Briefcase },
  { path: '/certifications', label: 'Certifications', icon: Award },
  { path: '/about', label: 'About', icon: User },
  { path: '/contact', label: 'Contact', icon: Mail }
];

const FloatingMobileDock = () => {
  const location = useLocation();
  const constraintsRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  return (
    <div
      ref={constraintsRef}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden pointer-events-none max-w-[95vw] flex justify-center"
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: -80, right: 80 }}
        dragElastic={0.08}
        dragMomentum={false}
        whileDrag={{ scale: 1.03, cursor: 'grabbing' }}
        className="pointer-events-auto relative flex flex-col items-center bg-slate-900/90 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-slate-950/60 rounded-full px-3.5 py-2 text-white select-none transition-shadow"
      >
        {/* Subtle Grip Drag Handle Bar */}
        <div className="w-8 h-1 bg-white/30 rounded-full mb-1.5 opacity-60 hover:opacity-100 transition-opacity" />

        {/* Icon Items Row */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const IconComponent = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                aria-label={item.label}
                className={`relative p-2.5 rounded-full flex items-center justify-center transition-colors duration-200 group ${
                  active ? 'text-primary-400 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {/* Active Indicator Pill */}
                {active && (
                  <motion.div
                    layoutId="activeDockPill"
                    className="absolute inset-0 bg-white/15 rounded-full border border-white/25 -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}

                <IconComponent size={20} className="transition-transform duration-200 group-active:scale-90" />

                {/* Subtle Tooltip Label on Hover/Focus */}
                <span className="absolute -top-8 px-2 py-0.5 bg-slate-950/90 text-white text-[10px] font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-md">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default React.memo(FloatingMobileDock);
