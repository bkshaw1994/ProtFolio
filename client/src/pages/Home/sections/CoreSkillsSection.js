import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SkillBadge from '../../../components/SkillBadge';

const CoreSkillsSection = ({ coreSkills }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 25);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);
  };

  useEffect(() => {
    setCanScrollLeft(false);
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
    const timer = setTimeout(checkScroll, 200);
    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScroll);
    };
  }, [coreSkills]);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
            Core Skills
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Mobile Carousel / Desktop Grid Container */}
        <div className="relative">
          {/* Left Edge Arrow & Fade Strip */}
          <div
            onClick={() => handleScroll('left')}
            className={`sm:hidden absolute -left-4 top-0 bottom-0 w-14 z-30 flex items-center justify-start bg-gradient-to-r from-white via-white/90 to-transparent transition-opacity duration-300 ${
              canScrollLeft
                ? 'opacity-100 pointer-events-auto cursor-pointer'
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll left"
          >
            <div className="text-slate-800 drop-shadow flex items-center justify-center pl-2">
              <ChevronLeft size={28} className="stroke-[2.5]" />
            </div>
          </div>

          {/* Right Edge Arrow & Fade Strip */}
          <div
            onClick={() => handleScroll('right')}
            className={`sm:hidden absolute -right-4 top-0 bottom-0 w-14 z-30 flex items-center justify-end bg-gradient-to-l from-white via-white/90 to-transparent transition-opacity duration-300 ${
              canScrollRight
                ? 'opacity-100 pointer-events-auto cursor-pointer'
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll right"
          >
            <div className="text-slate-800 drop-shadow flex items-center justify-center pr-2">
              <ChevronRight size={28} className="stroke-[2.5]" />
            </div>
          </div>

          {/* Scrollable Track / Desktop Grid */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 overflow-x-auto sm:overflow-x-visible scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-proximity pl-4 pr-4 sm:px-0 py-3"
          >
            {coreSkills.map((skill, index) => (
              <motion.div
                key={skill.id || skill._id || skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex-shrink-0 w-[165px] sm:w-auto snap-start h-full"
              >
                <SkillBadge skill={skill} size="sm" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link to="/skills" className="btn-outline group">
            View All Skills
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreSkillsSection;
