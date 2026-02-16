import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CertificationsSection = ({ certifications }) => (
  <section className="section-padding bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
    <div className="container-custom">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
          Certifications & Badges
        </h2>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          Professional certifications and recognized achievements
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {certifications
          ?.filter((certification) => certification?.badge)
          .map((certification) => (
            <a
              key={certification._id || certification.verificationUrl}
              href={certification.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src={certification.badge}
                alt={
                  certification.title
                    ? `${certification.title} Badge`
                    : 'Certification Badge'
                }
                className="w-48 h-48 hover:scale-110 transition-transform duration-300"
              />
            </a>
          ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/certifications" className="btn-outline group">
          View All Certifications
          <ArrowRight
            size={20}
            className="ml-2 group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  </section>
);

export default CertificationsSection;
