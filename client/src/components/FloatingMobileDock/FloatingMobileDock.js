import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  FolderGit2,
  Cpu,
  Briefcase,
  BookOpen,
  User
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/projects', label: 'Projects', icon: FolderGit2 },
  { path: '/skills', label: 'Skills', icon: Cpu },
  { path: '/blogs', label: 'Blogs', icon: BookOpen },
  { path: '/experience', label: 'Experience', icon: Briefcase },
  { path: '/about', label: 'About', icon: User }
];

const FloatingMobileDock = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden max-w-[95vw] flex justify-center">
      <div className="relative flex items-center bg-white/75 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-slate-900/15 rounded-full px-3.5 py-2 text-slate-800 select-none">

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
                className={`relative ${
                  active ? 'px-3.5 py-2' : 'p-2.5'
                } rounded-full flex items-center space-x-1.5 transition-all duration-300 group select-none`}
              >
                {/* Active Indicator Pill */}
                {active && (
                  <motion.div
                    layoutId="activeDockPill"
                    className="absolute inset-0 bg-white shadow-md shadow-slate-300/80 border border-slate-200/90 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}

                <IconComponent
                  size={19}
                  className={`transition-transform duration-200 flex-shrink-0 ${
                    active ? 'text-primary-600' : 'text-slate-600 group-hover:text-slate-900 group-active:scale-90'
                  }`}
                />

                {/* Visible Label text next to icon when selected */}
                {active && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-bold tracking-wide text-primary-600 whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}

                {/* Subtle Tooltip Label on Hover/Focus for inactive icons */}
                {!active && (
                  <span className="absolute -top-8 px-2 py-0.5 bg-slate-900/90 text-white text-[10px] font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-md">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FloatingMobileDock);
