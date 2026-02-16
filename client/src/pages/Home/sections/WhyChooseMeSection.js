import React from 'react';
import { Code, Palette, Zap } from 'lucide-react';

const WhyChooseMeSection = () => (
  <section className="section-padding bg-white">
    <div className="container-custom">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
          Why Choose Me
        </h2>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          What makes me different from other developers
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="card p-6 card-hover text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
            <Code size={32} />
          </div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-3">
            Clean Code
          </h3>
          <p className="text-secondary-600">
            Writing maintainable, scalable, and well-documented code following
            industry best practices.
          </p>
        </div>

        <div className="card p-6 card-hover text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-700 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
            <Zap size={32} />
          </div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-3">
            Fast Delivery
          </h3>
          <p className="text-secondary-600">
            Efficient development process with timely delivery without
            compromising on quality.
          </p>
        </div>

        <div className="card p-6 card-hover text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
            <Palette size={32} />
          </div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-3">
            Modern Design
          </h3>
          <p className="text-secondary-600">
            Creating beautiful, responsive, and user-friendly interfaces with
            modern design principles.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseMeSection;
