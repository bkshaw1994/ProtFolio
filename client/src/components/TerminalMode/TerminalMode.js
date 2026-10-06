import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Minimize2, Maximize2 } from 'lucide-react';
import { useGetProfileQuery, useGetCoreSkillsQuery, useGetFeaturedProjectsQuery } from '../../features/api/apiSlice';

const TerminalMode = ({ isOpen, setIsOpen }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Welcome to Bishal\'s Interactive Developer CLI Terminal v1.0.0'
    },
    {
      type: 'system',
      text: 'Type "help" to view available commands.'
    }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  const { data: profile } = useGetProfileQuery();
  const { data: skillsResponse } = useGetCoreSkillsQuery();
  const { data: projectsResponse } = useGetFeaturedProjectsQuery();

  const profileData = profile?.data || profile;
  const coreSkills = Array.isArray(skillsResponse) ? skillsResponse : skillsResponse?.data || [];
  const projects = Array.isArray(projectsResponse) ? projectsResponse : projectsResponse?.data || [];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    // Add command to output history
    const newHistory = [...history, { type: 'user', text: `guest@bishal-portfolio:~$ ${cmdStr}` }];
    setCommandHistory((prev) => [...prev, cmdStr]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `
Available Commands:
  help        - Show this menu
  about       - Summary of background and expertise
  skills      - List core technical skills
  projects    - List featured projects
  contact     - Display contact information
  clear       - Clear terminal output
  exit        - Close terminal
`
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `
Name: ${profileData?.name || 'Bishal Kumar Shaw'}
Role: ${profileData?.title || 'Full Stack MERN Developer'}
Experience: ${profileData?.experienceYears || 9}+ Years in Software Engineering
Location: ${profileData?.location || 'Kolkata, India'}
Summary: ${profileData?.summary || 'Specialized in React, Node.js, Cloud Architecture & Scalable Web Apps.'}
`
        });
        break;

      case 'skills':
        const skillList = coreSkills.length > 0
          ? coreSkills.map(s => `  • ${s.name} (${s.level || 'Advanced'})`).join('\n')
          : '  • React.js, Node.js, Express, MongoDB, TypeScript, Next.js, Redux, Docker, AWS';
        newHistory.push({
          type: 'output',
          text: `\nCore Technical Skills:\n${skillList}\n`
        });
        break;

      case 'projects':
        const projList = projects.length > 0
          ? projects.slice(0, 5).map(p => `  • ${p.title} - ${p.category || 'Web App'} [Stack: ${(p.technologies || []).join(', ')}]`).join('\n')
          : '  • E-Commerce Platform\n  • Realtime Analytics Dashboard\n  • AI Code Assistant Integration';
        newHistory.push({
          type: 'output',
          text: `\nFeatured Projects:\n${projList}\n`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `
Email:    ${profileData?.email || 'contact@bishal.dev'}
Phone:    ${profileData?.phone || '+91 9876543210'}
GitHub:   ${profileData?.socialLinks?.github || 'https://github.com/bkshaw1994'}
LinkedIn: ${profileData?.socialLinks?.linkedin || 'https://linkedin.com/in/bishalkumarshaw'}
`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        setIsOpen(false);
        setInput('');
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${cmd}". Type "help" for available commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full ${
              isMaximized ? 'h-[92vh] max-w-7xl' : 'h-[550px] max-w-3xl'
            } bg-slate-950 text-emerald-400 rounded-xl shadow-2xl border border-emerald-500/30 overflow-hidden flex flex-col font-mono text-sm z-10 transition-all duration-300`}
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-400 select-none">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 cursor-pointer" onClick={() => setIsOpen(false)} />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Terminal size={14} className="text-emerald-400" />
                  bishal@dev-portfolio:~
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
                >
                  {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Terminal Body Output */}
            <div
              className="flex-1 p-4 overflow-y-auto space-y-2 bg-slate-950/95"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((item, index) => (
                <div key={index} className="whitespace-pre-wrap leading-relaxed">
                  {item.type === 'user' && (
                    <span className="text-slate-200 font-semibold">{item.text}</span>
                  )}
                  {item.type === 'system' && (
                    <span className="text-cyan-400">{item.text}</span>
                  )}
                  {item.type === 'output' && (
                    <span className="text-emerald-300">{item.text}</span>
                  )}
                  {item.type === 'error' && (
                    <span className="text-rose-400">{item.text}</span>
                  )}
                </div>
              ))}

              {/* Current Input Prompt */}
              <div className="flex items-center space-x-2 pt-1">
                <span className="text-emerald-500 font-bold">guest@bishal-portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-slate-100 outline-none border-none font-mono caret-emerald-400"
                  autoFocus
                />
              </div>
              <div ref={terminalEndRef} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TerminalMode;
