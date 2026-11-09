import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const CtaSection = () => (
  <section className="section-padding bg-gradient-to-br from-slate-900 via-primary-950 to-indigo-950 text-white relative overflow-hidden">
    {/* Subtle gradient glow */}
    <div className="absolute inset-0 bg-radial-gradient from-primary-600/15 via-transparent to-transparent pointer-events-none" />

    <div className="container-custom text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto space-y-6"
      >
        <div className="inline-flex items-center space-x-2 bg-primary-500/20 border border-primary-400/30 px-4 py-1.5 rounded-full text-primary-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck size={14} className="text-primary-400" />
          <span>Zero-Risk Architecture Consultation</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          Ready to Eliminate UI Lag & Accelerate Your Product Roadmap?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
          Book a 15-minute, zero-sales-pressure architecture audit. We'll inspect your live URL, pinpoint Core Web Vitals bottlenecks, and outline a concrete 2-week or 4-week fix.
        </p>

        {/* High-Contrast CTAs */}
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Link
            to="/contact?service=audit"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-400 hover:to-indigo-500 shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 transform hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <Calendar size={18} className="mr-2 text-primary-200" />
            <span>Book a 15-Min Architecture Audit</span>
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#packages"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-sm sm:text-base text-slate-200 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-300"
          >
            Explore Sprints & Packages
          </a>
        </div>

        {/* Reassurance points */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span>15-Minute Dedicated Technical Review</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span>Actionable CWV & Bundle Diagnostic</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span>Direct Access to Senior Architect</span>
          </span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
