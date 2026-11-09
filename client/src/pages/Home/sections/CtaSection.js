import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

const CtaSection = () => (
  <section className="py-16 sm:py-24 bg-slate-950 text-white border-t border-slate-800 relative">
    <div className="container-custom text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto space-y-5"
      >
        <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-slate-300 text-xs font-mono uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Zero-Risk Technical Diagnostic</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Ready to Eliminate UI Lag & Ship High-Velocity Sprints?
        </h2>

        <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal max-w-xl mx-auto">
          Book a 15-minute, zero-sales-pressure architecture audit. We'll inspect your live application, pinpoint Core Web Vitals bottlenecks, and map out a concrete sprint plan.
        </p>

        {/* High-Contrast CTAs */}
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <Link
            to="/contact?service=audit"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-xs sm:text-sm text-slate-950 bg-white hover:bg-slate-100 transition-colors shadow-xs group"
          >
            <Calendar size={15} className="mr-2 text-slate-700" />
            <span>Book a 15-Min Architecture Audit</span>
            <ArrowRight size={15} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            to="/services"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-xs sm:text-sm text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            Explore Sprints & Packages
          </Link>
        </div>

        {/* Reassurance points */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-3 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>15-Minute Technical Review</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>Actionable CWV Diagnostic</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>Direct Architect Access</span>
          </span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
