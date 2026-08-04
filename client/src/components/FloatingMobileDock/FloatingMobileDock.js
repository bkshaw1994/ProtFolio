import React from 'react';
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
                className={`relative p-2.5 rounded-full flex items-center justify-center transition-colors duration-200 group ${
                  active ? 'text-primary-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {/* Active Indicator Pill */}
                {active && (
                  <motion.div
                    layoutId="activeDockPill"
                    className="absolute inset-0 bg-white shadow-md shadow-slate-200/60 border border-slate-200/80 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}

                <IconComponent size={20} className="transition-transform duration-200 group-active:scale-90" />

                {/* Subtle Tooltip Label on Hover/Focus */}
                <span className="absolute -top-8 px-2 py-0.5 bg-slate-900/90 text-white text-[10px] font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-md">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FloatingMobileDock);
