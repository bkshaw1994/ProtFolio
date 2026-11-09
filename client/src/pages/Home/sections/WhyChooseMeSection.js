import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const WhyChooseMeSection = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const features = [
    {
      icon: Code,
      title: 'Clean Architecture',
      desc: 'Writing maintainable, robust, and well-documented code following industry best practices and design patterns.'
    },
    {
      icon: Zap,
      title: 'Fast Execution',
      desc: 'Optimized development workflow ensuring rapid turnaround and high performance without compromising quality.'
    },
    {
      icon: Palette,
      title: 'Modern UI / UX',
      desc: 'Crafting pixel-perfect, responsive, and intuitive interfaces with modern aesthetic design systems.'
    }
  ];

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
  }, []);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
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
          className="text-center mb-16"
        >
          <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2">
            Engineering Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 mb-3 tracking-tight">
            Why Choose Me
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            Delivering high-quality engineering with clean architecture, speed, and modern user experience.
          </p>
        </motion.div>

        {/* Mobile Carousel / Desktop Grid Container */}
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

          {/* Scrollable Track / Desktop Grid */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex sm:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto sm:overflow-x-visible scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-proximity pl-4 pr-4 sm:px-0 py-2 items-stretch"
          >
            {features.map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-xl border border-slate-200 hover:border-slate-400 p-6 sm:p-8 text-center group hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 shadow-2xs flex-shrink-0 w-[270px] sm:w-auto snap-start flex flex-col justify-between min-h-[250px] cursor-pointer"
                >
                  <div>
                    <div className="w-12 h-12 bg-slate-950 border border-slate-800 text-slate-200 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-slate-900 transition-colors">
                      <IconComp size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-950 mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm font-normal">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMeSection;
