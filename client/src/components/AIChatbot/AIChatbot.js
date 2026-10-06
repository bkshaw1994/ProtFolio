import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, RefreshCw, ChevronDown } from 'lucide-react';
import { useGetProfileQuery, useGetCoreSkillsQuery, useGetFeaturedProjectsQuery } from '../../features/api/apiSlice';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hi there! 👋 I am Bishal\'s AI Portfolio Assistant. Ask me anything about Bishal\'s experience, tech stack, or top projects!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);
  const { data: profile } = useGetProfileQuery();
  const { data: skillsResponse } = useGetCoreSkillsQuery();
  const { data: projectsResponse } = useGetFeaturedProjectsQuery();

  const profileData = profile?.data || profile;
  const coreSkills = Array.isArray(skillsResponse) ? skillsResponse : skillsResponse?.data || [];
  const projects = Array.isArray(projectsResponse) ? projectsResponse : projectsResponse?.data || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const quickPrompts = [
    'Top MERN Stack Projects?',
    'Years of experience?',
    'Core technical skills?',
    'Contact & Resume details?'
  ];

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('project') || q.includes('work') || q.includes('portfolio')) {
      const topProjects = projects.slice(0, 3).map(p => `• ${p.title} (${p.category || 'Full Stack'})`).join('\n');
      return `Bishal has built scalable full-stack applications! Here are some top featured projects:\n\n${topProjects || '• E-Commerce Platform\n• Realtime Analytics Dashboard\n• AI Code Assistant'}\n\nYou can explore all projects under the Projects section!`;
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('react') || q.includes('node')) {
      const skillNames = coreSkills.map(s => s.name).join(', ');
      return `Bishal specializes in the MERN Stack & Cloud Architecture! Key skills include:\n\n${skillNames || 'React.js, Node.js, Express, MongoDB, TypeScript, Next.js, Redux, Docker, AWS'}.\n\nWith over ${profileData?.experienceYears || 9} years of experience, he builds high-performance web applications.`;
    }

    if (q.includes('experience') || q.includes('year') || q.includes('background') || q.includes('history')) {
      return `Bishal has ${profileData?.experienceYears || 9}+ years of professional engineering experience as a ${profileData?.title || 'Full Stack Developer'}. He has led architecture, optimized database queries, and built microservices for enterprise and startup clients.`;
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('resume') || q.includes('phone')) {
      return `You can reach Bishal directly:\n\n📧 Email: ${profileData?.email || 'contact@bishal.dev'}\n📞 Phone: ${profileData?.phone || '+91 9876543210'}\n📍 Location: ${profileData?.location || 'Kolkata, India'}\n\nYou can also download his resume using the Resume button in the header!`;
    }

    return `Bishal is a Senior Full Stack Developer (${profileData?.experienceYears || 9}+ yrs exp) specializing in React, Node.js, and Cloud Infrastructure. Feel free to ask about his projects, skills, or contact info!`;
  };

  const handleSendMessage = (textToSend) => {
    const queryText = textToSend || input;
    if (!queryText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReplyText = generateAIResponse(queryText);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-primary-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-primary-500/25 flex items-center justify-center border border-white/20 transition-all duration-300"
          title="Bishal's AI Portfolio Assistant"
        >
          {isOpen ? <X size={24} /> : <Bot size={26} className="animate-pulse" />}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
        </motion.button>
      </div>

      {/* Chat Popover Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 w-[90vw] sm:w-[380px] h-[520px] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-primary-600 to-indigo-600 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Sparkles size={20} className="text-yellow-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">AI Recruiter Assistant</h3>
                  <div className="flex items-center gap-1.5 text-xs text-primary-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Online & Ready
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ChevronDown size={20} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                      msg.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-primary-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[10px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-primary-200' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-2 text-slate-400 text-xs pl-9">
                  <RefreshCw size={14} className="animate-spin text-primary-500" />
                  <span>AI is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 bg-white border-t border-slate-200/60 flex gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 hover:bg-primary-50 hover:text-primary-600 whitespace-nowrap transition-colors border border-slate-200/50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask AI about Bishal..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-100 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
