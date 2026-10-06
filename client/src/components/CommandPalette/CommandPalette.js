import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Home,
  Briefcase,
  Code,
  Award,
  User,
  Mail,
  Terminal,
  Download,
  X,
  FileText
} from 'lucide-react';
import { useGetProfileSummaryQuery } from '../../features/api/apiSlice';
import { getFileUrl } from '../../utils/apiUrl';

const CommandPalette = ({ isOpen, setIsOpen, onOpenTerminal }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { data: profile } = useGetProfileSummaryQuery();
  const profileData = profile?.data || profile;

  // Keybindings listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const items = [
    {
      category: 'Navigation',
      id: 'nav-home',
      label: 'Home Page',
      icon: Home,
      action: () => navigate('/')
    },
    {
      category: 'Navigation',
      id: 'nav-projects',
      label: 'Browse Projects',
      icon: Briefcase,
      action: () => navigate('/projects')
    },
    {
      category: 'Navigation',
      id: 'nav-skills',
      label: 'Technical Skills',
      icon: Code,
      action: () => navigate('/skills')
    },
    {
      category: 'Navigation',
      id: 'nav-experience',
      label: 'Work Experience',
      icon: FileText,
      action: () => navigate('/experience')
    },
    {
      category: 'Navigation',
      id: 'nav-certifications',
      label: 'Certifications',
      icon: Award,
      action: () => navigate('/certifications')
    },
    {
      category: 'Navigation',
      id: 'nav-about',
      label: 'About Me',
      icon: User,
      action: () => navigate('/about')
    },
    {
      category: 'Navigation',
      id: 'nav-contact',
      label: 'Contact & Hire',
      icon: Mail,
      action: () => navigate('/contact')
    },
    {
      category: 'Actions & Utilities',
      id: 'act-terminal',
      label: 'Open Developer Terminal Mode',
      icon: Terminal,
      action: () => {
        if (onOpenTerminal) onOpenTerminal();
      }
    }
  ];

  if (profileData?.resume) {
    items.push({
      category: 'Actions & Utilities',
      id: 'act-resume',
      label: 'Download PDF Resume',
      icon: Download,
      action: () => {
        window.open(getFileUrl(profileData.resume), '_blank');
      }
    });
  }

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation inside list
  const handleKeyDownInMenu = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', duration: 0.25 }}
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-200">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDownInMenu}
                placeholder="Type a command or search sections..."
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  No commands or pages found for "{query}"
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm transition-all duration-150 ${
                        isSelected
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected
                              ? 'bg-primary-100 text-primary-600'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <Icon size={16} />
                        </div>
                        <span>{item.label}</span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        {item.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Shortcut Helper */}
            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center space-x-3">
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-200 font-mono text-[10px]">
                    ↑
                  </kbd>{' '}
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-200 font-mono text-[10px]">
                    ↓
                  </kbd>{' '}
                  Navigate
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-200 font-mono text-[10px]">
                    ↵
                  </kbd>{' '}
                  Select
                </span>
              </div>
              <div>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-200 font-mono text-[10px]">
                  ESC
                </kbd>{' '}
                Close
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
