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
      gradient: 'from-primary-600 to-sky-400',
      shadow: 'shadow-primary-500/25',
      border: 'hover:border-primary-500/30',
      title: 'Clean Architecture',
      desc: 'Writing maintainable, robust, and well-documented code following industry best practices and design patterns.'
    },
    {
      icon: Zap,
      gradient: 'from-emerald-600 to-teal-400',
      shadow: 'shadow-emerald-500/25',
      border: 'hover:border-emerald-500/30',
      title: 'Fast Execution',
      desc: 'Optimized development workflow ensuring rapid turnaround and high performance without compromising quality.'
    },
    {
      icon: Palette,
      gradient: 'from-indigo-600 to-purple-400',
      shadow: 'shadow-indigo-500/25',
      border: 'hover:border-indigo-500/30',
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
    <section className="section-padding bg-slate-50/70 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Why Choose Me
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            Delivering high-quality engineering with clean architecture, speed, and modern user experience.
          </p>
        </motion.div>

        {/* Mobile Carousel / Desktop Grid Container */}
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

          {/* Scrollable Track / Desktop Grid */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex sm:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto sm:overflow-x-visible scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-proximity pl-4 pr-4 sm:px-0 py-3 items-stretch"
          >
            {features.map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`glass-card p-6 sm:p-8 text-center group hover:-translate-y-1 transition-all duration-300 border border-slate-200/80 ${feature.border} flex-shrink-0 w-[270px] sm:w-auto snap-start flex flex-col justify-between min-h-[250px]`}
                >
                  <div>
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-tr ${feature.gradient} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg ${feature.shadow} group-hover:scale-110 transition-transform`}>
                      <IconComp size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
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
