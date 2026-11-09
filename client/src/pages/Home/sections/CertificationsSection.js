import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const CertificationsSection = ({ certifications }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const filteredCerts = certifications?.filter((certification) => certification?.badge) || [];

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
  }, [certifications]);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="section-padding bg-white border-t border-slate-100 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Recognized Credentials
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 mb-3 tracking-tight">
            Certifications & Badges
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Professional certifications and recognized achievements
          </p>
        </motion.div>

        {/* Mobile Carousel / Desktop Container */}
        <div className="relative">
          {/* Left Edge Arrow */}
          <div
            onClick={() => handleScroll('left')}
            className={`sm:hidden absolute -left-2 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 shadow-2xs text-slate-800 transition-opacity duration-300 ${
              canScrollLeft
                ? 'opacity-100 pointer-events-auto cursor-pointer'
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} className="stroke-[2.5]" />
          </div>

          {/* Right Edge Arrow */}
          <div
            onClick={() => handleScroll('right')}
            className={`sm:hidden absolute -right-2 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 shadow-2xs text-slate-800 transition-opacity duration-300 ${
              canScrollRight
                ? 'opacity-100 pointer-events-auto cursor-pointer'
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} className="stroke-[2.5]" />
          </div>

          {/* Scrollable Track / Desktop Flex */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto sm:overflow-x-visible sm:flex-wrap justify-start sm:justify-center items-center gap-6 sm:gap-8 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-proximity pl-4 pr-4 sm:px-0 py-2"
          >
            {filteredCerts.map((certification, idx) => (
              <motion.a
                key={certification._id || certification.verificationUrl || idx}
                href={certification.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="inline-block flex-shrink-0 snap-start p-4 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-slate-400 transition-all duration-300"
              >
                <img
                  src={certification.badge}
                  alt={
                    certification.title
                      ? `${certification.title} Badge`
                      : 'Certification Badge'
                  }
                  className="w-36 h-36 sm:w-44 sm:h-44 hover:scale-105 transition-transform duration-300 object-contain mx-auto"
                />
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-10"
        >
          <Link to="/certifications" className="btn-outline group">
            View All Certifications
            <ArrowRight
              size={16}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
