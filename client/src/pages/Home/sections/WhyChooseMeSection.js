import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap } from 'lucide-react';

const WhyChooseMeSection = () => (
  <section className="section-padding bg-slate-50/60 relative overflow-hidden">
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
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
        ].map((feature, idx) => {
          const IconComp = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`glass-card p-8 text-center group hover:-translate-y-2 transition-all duration-300 border border-slate-200/80 ${feature.border}`}
            >
              <div className={`w-16 h-16 bg-gradient-to-tr ${feature.gradient} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg ${feature.shadow} group-hover:scale-110 transition-transform`}>
                <IconComp size={30} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyChooseMeSection;
