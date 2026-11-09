import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const technologies = [
  { name: 'Next.js (App Router)', role: 'Core Framework' },
  { name: 'React 18 / RSC', role: 'Server Components' },
  { name: 'TypeScript', role: 'Strict Typing' },
  { name: 'Puppeteer', role: 'Headless CWV Auditing' },
  { name: 'Redis & BullMQ', role: 'Distributed Caching' },
  { name: 'Node.js & Express', role: 'Backend Microservices' },
  { name: 'PostgreSQL & MongoDB', role: 'Data Layer' },
  { name: 'Playwright & Jest', role: 'Automated Testing' },
  { name: 'Tailwind CSS', role: 'Zero-Runtime Design System' },
  { name: 'Vercel & GCP', role: 'Edge & Cloud Infrastructure' },
  { name: 'Docker & CI/CD', role: 'Containerized Pipelines' }
];

const TrustBanner = () => {
  return (
    <section className="bg-slate-900 text-white py-10 border-y border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-radial-gradient from-primary-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary-600/20 border border-primary-500/40 flex items-center justify-center text-primary-400">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary-400">
                Production-Grade Standards
              </div>
              <div className="text-sm font-semibold text-slate-200">
                Architected for Seed-to-Series-A Startups & High-Growth SaaS
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>Core Web Vitals Guarantee</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>90%+ Automated Test Coverage</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>Zero Technical Debt Sprints</span>
            </span>
          </div>
        </div>

        {/* Technology Pill Stream */}
        <div className="pt-6">
          <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800/90 border border-slate-700 hover:border-primary-500/50 hover:bg-slate-800 transition-all text-xs font-medium text-slate-200 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400 group-hover:scale-125 transition-transform" />
                <span className="font-semibold text-white">{tech.name}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider hidden sm:inline">
                  • {tech.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
