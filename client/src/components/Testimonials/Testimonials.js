import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, Linkedin } from 'lucide-react';
import { useGetRecommendationsQuery } from '../../features/api/apiSlice';

const fallbackTestimonials = [
  {
    _id: '1',
    name: 'Sarah Jenkins',
    role: 'VP of Engineering',
    company: 'TechCorp Solutions',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    quote: 'Bishal is an exceptionally talented full-stack engineer. He single-handedly spearheaded our dashboard migration, improving page load speeds by 45% while delivering robust REST APIs.',
    rating: 5,
    linkedinUrl: 'https://linkedin.com'
  },
  {
    _id: '2',
    name: 'David Miller',
    role: 'Lead Architect',
    company: 'InnovateX Labs',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'Working with Bishal on high-throughput Node.js microservices was a pleasure. His mastery of MongoDB aggregation pipelines and system optimization is top tier.',
    rating: 5,
    linkedinUrl: 'https://linkedin.com'
  },
  {
    _id: '3',
    name: 'Elena Rostova',
    role: 'Product Manager',
    company: 'CloudSphere Inc',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: 'Bishal combines deep technical execution with outstanding UI intuition. He consistently turns complex feature specifications into slick, pixel-perfect user experiences.',
    rating: 5,
    linkedinUrl: 'https://linkedin.com'
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const { data: recommendationsResponse } = useGetRecommendationsQuery();

  const apiRecommendations = recommendationsResponse?.data;
  const list = (Array.isArray(apiRecommendations) && apiRecommendations.length > 0)
    ? apiRecommendations
    : fallbackTestimonials;

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % list.length);
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev - 1 + list.length) % list.length);
  };

  const activeItem = list[current] || list[0];

  return (
    <section className="py-16 bg-slate-100/70 relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
            LinkedIn Endorsements & Feedback
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
            What Engineering Leaders Say
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem._id || activeItem.id || current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xl relative"
            >
              <Quote className="absolute top-6 right-8 w-16 h-16 text-primary-500/10" />

              <div className="flex items-center space-x-1 mb-6">
                {[...Array(activeItem.rating || 5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-slate-700 text-base sm:text-lg italic leading-relaxed mb-8">
                "{activeItem.quote}"
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center space-x-4">
                  {activeItem.image ? (
                    <img
                      src={activeItem.image}
                      alt={activeItem.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary-500"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-lg flex items-center justify-center">
                      {activeItem.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {activeItem.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {activeItem.role} {activeItem.company && `• ${activeItem.company}`}
                    </p>
                    {activeItem.relationship && (
                      <span className="text-[10px] text-slate-400 font-medium block">
                        {activeItem.relationship}
                      </span>
                    )}
                  </div>
                </div>

                {activeItem.linkedinUrl && (
                  <a
                    href={activeItem.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-xl transition-colors text-xs font-semibold"
                    title="Verified LinkedIn Recommendation"
                  >
                    <Linkedin size={16} />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {list.length > 1 && (
            <div className="flex items-center justify-center space-x-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center space-x-2">
                {list.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      current === idx
                        ? 'w-8 bg-primary-600'
                        : 'w-2.5 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
