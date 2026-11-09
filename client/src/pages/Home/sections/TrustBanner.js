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
  { name: 'Tailwind CSS', role: 'Zero-Runtime UI' },
  { name: 'Vercel & GCP', role: 'Edge & Cloud' },
  { name: 'Docker & CI/CD', role: 'Pipelines' }
];

const TrustBanner = () => {
  return (
    <section className="bg-slate-50/70 text-slate-900 py-6 border-b border-slate-200 relative">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-2xs">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-[11px] font-mono font-semibold uppercase tracking-widest text-slate-500">
                Production-Grade Engineering
              </div>
              <div className="text-xs font-semibold text-slate-900">
                Architected for Seed-to-Series-A Startups & Fast-Growing SaaS
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={13} className="text-emerald-600" />
              <span>Core Web Vitals Guarantee</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={13} className="text-emerald-600" />
              <span>90%+ Automated Test Coverage</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 size={13} className="text-emerald-600" />
              <span>Zero Technical Debt Sprints</span>
            </span>
          </div>
        </div>

        {/* Technology Pill Stream */}
        <div className="pt-4">
          <div className="flex flex-wrap justify-center items-center gap-2">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-200/90 hover:border-slate-400 transition-colors text-xs font-mono text-slate-700 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span className="font-semibold text-slate-900">{tech.name}</span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  / {tech.role}
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
