import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection = () => (
  <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-800 text-white">
    <div className="container-custom text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Start Your Next Project?
        </h2>
        <p className="text-xl text-primary-100 mb-8">
          Let's work together to bring your ideas to life with cutting-edge
          technology and creative solutions.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Start a Project
          </Link>
          <Link
            to="/about"
            className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
          >
            Learn More About Me
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CtaSection;
