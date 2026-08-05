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
    <section className="section-padding bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
            Certifications & Badges
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Professional certifications and recognized achievements
          </p>
        </motion.div>

        {/* Mobile Carousel / Desktop Container */}
        <div className="relative">
          {/* Left Edge Arrow & Fade Strip */}
          <div
            onClick={() => handleScroll('left')}
            className={`sm:hidden absolute -left-4 top-0 bottom-0 w-14 z-30 flex items-center justify-start bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent transition-opacity duration-300 ${
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
            className={`sm:hidden absolute -right-4 top-0 bottom-0 w-14 z-30 flex items-center justify-end bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent transition-opacity duration-300 ${
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

          {/* Scrollable Track / Desktop Flex */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex overflow-x-auto sm:overflow-x-visible sm:flex-wrap justify-start sm:justify-center items-center gap-6 sm:gap-8 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-proximity pl-4 pr-4 sm:px-0 py-3"
          >
            {filteredCerts.map((certification, idx) => (
              <motion.a
                key={certification._id || certification.verificationUrl || idx}
                href={certification.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="inline-block flex-shrink-0 snap-start"
              >
                <img
                  src={certification.badge}
                  alt={
                    certification.title
                      ? `${certification.title} Badge`
                      : 'Certification Badge'
                  }
                  className="w-40 h-40 sm:w-48 sm:h-48 hover:scale-110 transition-transform duration-300 drop-shadow-md object-contain"
                />
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8"
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
