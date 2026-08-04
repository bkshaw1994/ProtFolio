import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CertificationsSection = ({ certifications }) => (
  <section className="section-padding bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-50">
    <div className="container-custom">
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

      <div className="flex flex-wrap justify-center gap-8">
        {certifications
          ?.filter((certification) => certification?.badge)
          .map((certification, idx) => (
            <motion.a
              key={certification._id || certification.verificationUrl || idx}
              href={certification.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="inline-block"
            >
              <img
                src={certification.badge}
                alt={
                  certification.title
                    ? `${certification.title} Badge`
                    : 'Certification Badge'
                }
                className="w-48 h-48 hover:scale-110 transition-transform duration-300 drop-shadow-md"
              />
            </motion.a>
          ))}
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

export default CertificationsSection;
