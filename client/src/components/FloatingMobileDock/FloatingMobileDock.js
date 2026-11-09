import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  FolderGit2,
  Cpu,
  Briefcase,
  User
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/projects', label: 'Projects', icon: FolderGit2 },
  { path: '/skills', label: 'Skills', icon: Cpu },
  { path: '/experience', label: 'Experience', icon: Briefcase },
  { path: '/about', label: 'About', icon: User }
];

const FloatingMobileDock = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden max-w-[95vw] flex justify-center">
      <div className="relative flex items-center bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl rounded-full px-2.5 py-1.5 text-slate-800 select-none">
        {/* Icon Items Row */}
        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const IconComponent = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                aria-label={item.label}
                className={`relative ${
                  active ? 'px-3 py-1.5 text-white' : 'p-2 text-slate-600 hover:text-slate-950'
                } rounded-full flex items-center space-x-1.5 transition-all duration-200 group select-none`}
              >
                {/* Active Indicator Pill */}
                {active && (
                  <motion.div
                    layoutId="activeDockPill"
                    className="absolute inset-0 bg-slate-950 rounded-full -z-10 shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}

                <IconComponent
                  size={18}
                  className={`transition-transform duration-200 flex-shrink-0 ${
                    active ? 'text-white' : 'text-slate-600 group-hover:text-slate-950'
                  }`}
                />

                {/* Visible Label text next to icon when selected */}
                {active && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-mono font-medium text-white whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
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
