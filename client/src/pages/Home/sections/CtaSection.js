import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CtaSection = () => (
  <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 text-white">
    <div className="container-custom text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
          Ready to Start Your Next Project?
        </h2>
        <p className="text-lg sm:text-xl text-primary-100 mb-8 leading-relaxed font-normal">
          Let's work together to bring your ideas to life with cutting-edge
          technology and creative solutions.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-white text-primary-700 px-8 py-3.5 rounded-xl font-bold hover:bg-primary-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Start a Project
          </Link>
          <Link
            to="/about"
            className="border-2 border-white/80 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
          >
            Learn More About Me
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
