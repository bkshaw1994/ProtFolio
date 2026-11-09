import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CtaSection = () => (
  <section className="section-padding bg-slate-950 text-white border-t border-slate-800">
    <div className="container-custom text-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-400 mb-3">
          Initiative & Delivery
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white">
          Ready to Start Your Next Project?
        </h2>
        <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed font-normal">
          Let's work together to bring your ideas to life with cutting-edge
          technology and creative solutions.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-white text-slate-950 hover:bg-slate-100 font-semibold px-6 py-3 rounded-lg text-sm shadow-xs transition-colors"
          >
            Start a Project
          </Link>
          <Link
            to="/about"
            className="border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            Learn More About Me
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
