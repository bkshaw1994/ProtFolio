import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  Trash2,
  Sparkles,
  ShieldCheck,
  Minimize2,
  RefreshCw
} from 'lucide-react';
import {
  useSendChatMessageMutation,
  useGetSuggestedQuestionsQuery
} from '../../features/api/apiSlice';
import './Chatbot.css';

const DEFAULT_SUGGESTIONS = [
  'What are Bishal\'s core skills?',
  'Tell me about his experience at Cognizant',
  'What key projects has Bishal built?',
  'How can I contact Bishal?'
];

const INITIAL_MESSAGE = {
  id: 'welcome',
  sender: 'bot',
  text: 'Hello! 👋 I am **Bishal\'s AI Portfolio Assistant**.\n\nHow can I help you explore Bishal\'s technical skills, experience, and projects today?',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

/**
 * Formats simple markdown syntax (bold, bullet points, links) into JSX
 */
const renderFormattedText = (text) => {
  if (!text) return null;

  // Split into lines
  const lines = text.split('\n');

  return lines.map((line, lineIdx) => {
    // Process markdown link format [label](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      parts.push(
        <a
          key={`link-${lineIdx}-${match.index}`}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 underline font-medium"
        >
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    // Process bold formatting **text**
    const content = parts.map((part, pIdx) => {
      if (typeof part !== 'string') return part;

      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**')) {
          return (
            <strong key={`b-${lineIdx}-${pIdx}-${bIdx}`} className="font-semibold text-white">
              {bPart.slice(2, -2)}
            </strong>
          );
        }
        return bPart;
      });
    });

    return (
      <div key={`line-${lineIdx}`} className={lineIdx > 0 ? 'mt-1.5' : ''}>
        {content}
      </div>
    );
  });
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef(null);

  const [sendChatMessage, { isLoading: isSending }] = useSendChatMessageMutation();
  const { data: suggestionsData } = useGetSuggestedQuestionsQuery();

  const suggestions = suggestionsData?.data || DEFAULT_SUGGESTIONS;

  // Auto-scroll to bottom of message list
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isSending]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  const handleSendMessage = async (textToSend) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || isSending) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    try {
      // Pass recent user-bot chat history for contextual awareness
      const history = messages.slice(-6).map((m) => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await sendChatMessage({ message: queryText, history }).unwrap();

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: res?.data?.reply || 'I\'m sorry, I couldn\'t process your request right now. Please try again.',
        isGuardrailTriggered: res?.data?.isGuardrailTriggered || false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errorMsg = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: 'I am having trouble connecting to the server. Please check your internet connection or try again shortly.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <div className="chatbot-container" data-testid="chatbot-container">
      {/* Trigger Button */}
      {!isOpen && (
        <motion.button
          onClick={toggleChat}
          className="chatbot-trigger-btn"
          aria-label="Open AI Assistant Chatbot"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white" />
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 border-2 border-slate-900 rounded-full animate-ping" />
            )}
          </div>
          <span className="font-semibold text-sm tracking-wide hidden sm:inline">
            Chat with AI
          </span>
          <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse hidden sm:inline" />
        </motion.button>
      )}

      {/* Chatbot Floating Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            role="dialog"
            aria-label="AI Portfolio Assistant Window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="flex items-center gap-3">
                <div className="relative p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-md">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
                    Bishal's AI Assistant
                    <ShieldCheck className="w-4 h-4 text-cyan-400" title="Privacy Guardrails Enabled" />
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    Online & Ready
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  title="Clear conversation"
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Clear Chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleChat}
                  title="Minimize chat"
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Minimize Chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="chatbot-messages-area" data-testid="chat-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chatbot-message-bubble ${
                    msg.sender === 'user'
                      ? 'chatbot-message-user'
                      : 'chatbot-message-bot'
                  }`}
                >
                  {msg.isGuardrailTriggered && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-1.5 pb-1 border-b border-amber-500/20">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Privacy Guardrail Active
                    </div>
                  )}
                  {renderFormattedText(msg.text)}
                  <span className="block text-[10px] text-right mt-1 opacity-70">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing Indicator */}
              {isSending && (
                <div className="chatbot-message-bubble chatbot-message-bot flex items-center gap-1.5 py-3">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Suggestion Chips */}
            {messages.length < 5 && (
              <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800/80 overflow-x-auto flex items-center gap-2 no-scrollbar">
                {suggestions.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(s)}
                    className="chatbot-suggestion-chip"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about skills, projects, contact info..."
                className="flex-1 bg-slate-800/90 text-slate-100 text-sm rounded-xl px-3.5 py-2.5 border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-400"
                disabled={isSending}
              />
              <motion.button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isSending}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
                aria-label="Send message"
              >
                {isSending ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
