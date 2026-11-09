import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Github,
  Linkedin,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  ArrowRight
} from 'lucide-react';
import {
  useSubmitContactMutation,
  useGetProfileQuery
} from '../../features/api/apiSlice';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getFileUrl } from '../../utils/apiUrl';

const PROJECT_PRESETS = [
  {
    id: 'architecture-audit',
    label: '15-Min Audit',
    badge: 'Free for Founders',
    subject: '15-Min Architecture Audit Request',
    timeline: 'asap',
    message:
      'Hi Bishal,\n\nI would like to request a 15-minute architecture audit for our application.\n- Production / Staging URL: \n- Primary Tech Stack (e.g. Next.js, React, Node.js): \n- Key Performance Bottlenecks (LCP, INP, Hydration lag, Bundle size): '
  },
  {
    id: 'performance-overhaul',
    label: 'CWV Overhaul (2-Wk)',
    badge: 'Fixed-Price Sprint',
    subject: 'Core Web Vitals & Performance Overhaul Sprint Inquiry',
    timeline: 'asap',
    message:
      'Hi Bishal,\n\nWe need a 2-week performance sprint to eliminate render lag and achieve 95+ Core Web Vitals.\n- Live URL: \n- Framework & Hosting (e.g. Next.js on Vercel): \n- High-Traffic / Critical Conversion Pages: '
  },
  {
    id: 'mvp-sprint',
    label: 'MVP Launchpad (4-Wk)',
    badge: 'Full-Stack Build',
    subject: 'Full-Stack MVP Launchpad (4-Week Sprint) Inquiry',
    timeline: '1-month',
    message:
      'Hi Bishal,\n\nWe are looking to launch an MVP in the next 30 days and need end-to-end full-stack architecture execution.\n- Product Vision: \n- Target Launch Date: \n- Core Features & API Integrations: '
  },
  {
    id: 'fractional-retainer',
    label: 'Fractional Retainer',
    badge: 'Monthly Advisory',
    subject: 'Senior Fractional Engineering Retainer Inquiry',
    timeline: 'flexible',
    message:
      'Hi Bishal,\n\nOur engineering team is looking for senior fractional frontend architecture oversight and performance governance.\n- Engineering Team Size: \n- Core Focus (Architecture, Code Reviews, Performance Standards): '
  },
  {
    id: 'consultation',
    label: 'Custom Scope',
    badge: 'Advisory & Dev',
    subject: 'Custom Architecture Engagement Inquiry',
    timeline: 'flexible',
    message:
      'Hi Bishal,\n\nWe would like to discuss a custom architectural engagement tailored to our infrastructure.'
  }
];

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' }
];

const Contact = () => {
  const { data: profile, isLoading: loadingProfile } = useGetProfileQuery();
  const profileData = profile?.data || profile;
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    company: '',
    projectType: 'architecture-audit',
    budget: '',
    currency: 'USD',
    timeline: 'asap'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitContact, { isLoading: isSubmitting }] =
    useSubmitContactMutation();
  const hasInitializedRef = useRef(false);

  // Prepopulate from URL params or default to audit
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');

    let matchingPreset = null;
    if (service === 'audit') {
      matchingPreset = PROJECT_PRESETS.find((p) => p.id === 'architecture-audit');
    } else if (service === 'mvp') {
      matchingPreset = PROJECT_PRESETS.find((p) => p.id === 'mvp-sprint');
    } else if (service === 'retainer') {
      matchingPreset = PROJECT_PRESETS.find((p) => p.id === 'fractional-retainer');
    } else if (service === 'custom') {
      matchingPreset = PROJECT_PRESETS.find((p) => p.id === 'consultation');
    } else if (service === 'performance' || service === 'cwv') {
      matchingPreset = PROJECT_PRESETS.find((p) => p.id === 'performance-overhaul');
    }

    if (matchingPreset) {
      setFormData((prev) => ({
        ...prev,
        projectType: matchingPreset.id,
        subject: matchingPreset.subject,
        timeline: matchingPreset.timeline,
        message: matchingPreset.message
      }));
    } else if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      const defaultPreset = PROJECT_PRESETS[0];
      setFormData((prev) => ({
        ...prev,
        projectType: defaultPreset.id,
        subject: defaultPreset.subject,
        timeline: defaultPreset.timeline,
        message: defaultPreset.message
      }));
    }
  }, [location.search]);

  const selectPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      projectType: preset.id,
      subject: preset.subject,
      timeline: preset.timeline,
      message: preset.message
    }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCopyEmail = (email) => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    toast.success('Email copied to clipboard');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitContact(formData).unwrap();
      toast.success(response.message || 'Inquiry submitted successfully!');
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: '',
        company: '',
        projectType: 'architecture-audit',
        budget: '',
        currency: 'USD',
        timeline: 'asap'
      });
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to transmit inquiry. Please email directly.');
    }
  };

  if (loadingProfile) {
    return <LoadingSpinner />;
  }

  const contactEmail = profileData?.email || 'bkshaw1994@gmail.com';

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Inquiry Received · Bishal Shaw</title>
        </Helmet>

        <div className="pt-24 sm:pt-28 pb-20 min-h-screen bg-white flex items-center justify-center px-4">
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 text-center shadow-2xs">
            <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-5 text-slate-900">
              <CheckCircle size={28} className="text-emerald-600" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              SPECIFICATION TRANSMITTED
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight mb-3">
              Inquiry Received
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Thank you for reaching out. Your project specifications have been sent directly to Lead Architect Bishal Shaw. You will receive an initial technical diagnosis and response within 24 hours.
            </p>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-left text-xs space-y-2 mb-6">
              <div className="font-mono text-slate-500 uppercase tracking-wider text-[11px]">Next Steps Protocol:</div>
              <div className="text-slate-700">1. Async review of your app URL, tech stack, and performance metrics.</div>
              <div className="text-slate-700">2. 15-minute technical strategy sync with Lead Engineer.</div>
              <div className="text-slate-700">3. Fixed-fee sprint proposal with guaranteed deliverables.</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-secondary flex-1 text-xs font-mono py-2.5"
              >
                Send Another Note
              </button>
              <Link
                to="/"
                className="btn-primary flex-1 text-xs font-mono py-2.5 inline-flex items-center justify-center gap-1"
              >
                Return to Overview <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book an Architecture Audit or Sprint · Bishal Shaw</title>
        <meta
          name="description"
          content="Book a 15-minute architecture audit, Core Web Vitals overhaul, or full-stack MVP sprint with Lead Architect Bishal Shaw. Direct 1-on-1 engineering collaboration."
        />
      </Helmet>

      <div className="pt-24 sm:pt-28 pb-20 min-h-screen bg-white text-slate-900">
        <div className="container-custom max-w-6xl">
          {/* Header */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 font-mono text-xs text-slate-700 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              DIRECT ARCHITECTURE ENGAGEMENT
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
              Book an Architecture Audit or Sprint
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Direct technical collaboration with Lead Full-Stack Architect Bishal Shaw. Review bottlenecks, plan 2-to-4 week fixed-scope sprints, or establish fractional governance. No sales reps.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Direct Channels & SLA (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Access Card */}
              <div className="p-6 bg-slate-50/70 border border-slate-200 rounded-xl space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
                    Direct Channel
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Available for Sprints
                  </span>
                </div>

                {/* Email with copy */}
                <div>
                  <div className="text-xs text-slate-500 mb-1 font-mono">Lead Engineer Email</div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200">
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-xs sm:text-sm font-mono text-slate-900 hover:underline flex items-center gap-2 truncate"
                    >
                      <Mail size={16} className="text-slate-500 shrink-0" />
                      <span className="truncate">{contactEmail}</span>
                    </a>
                    <button
                      onClick={() => handleCopyEmail(contactEmail)}
                      className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors shrink-0"
                      title="Copy email address"
                    >
                      {copiedEmail ? (
                        <Check size={14} className="text-emerald-600" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Phone if available */}
                {profileData?.phone && (
                  <div>
                    <div className="text-xs text-slate-500 mb-1 font-mono">Direct Phone / WhatsApp</div>
                    <a
                      href={`tel:${profileData.phone}`}
                      className="flex items-center gap-2 p-3 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm font-mono text-slate-900 hover:underline"
                    >
                      <Phone size={16} className="text-slate-500 shrink-0" />
                      <span>{profileData.phone}</span>
                    </a>
                  </div>
                )}

                {/* Location */}
                <div className="flex items-center gap-2 text-xs text-slate-600 font-mono pt-1">
                  <MapPin size={15} className="text-slate-400 shrink-0" />
                  <span>{profileData?.location || 'Bangalore, India'} · UTC+5:30 (Async Worldwide)</span>
                </div>

                {/* Resume Download & Social */}
                <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-2">
                  {profileData?.resume && (
                    <a
                      href={getFileUrl(profileData.resume)}
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 hover:border-slate-400 transition-colors shadow-2xs"
                    >
                      <Download size={13} />
                      <span>Download Resume (PDF)</span>
                    </a>
                  )}

                  {profileData?.socialLinks?.github && (
                    <a
                      href={profileData.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 hover:border-slate-400 transition-colors"
                    >
                      <Github size={13} />
                      <span>GitHub</span>
                    </a>
                  )}

                  {profileData?.socialLinks?.linkedin && (
                    <a
                      href={profileData.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-700 hover:border-slate-400 transition-colors"
                    >
                      <Linkedin size={13} />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Engagement Specification SLA Card */}
              <div className="p-6 bg-slate-50/70 border border-slate-200 rounded-xl space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-slate-900" />
                  Sprint Engagement SLA
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-white border border-slate-200">
                    <div className="text-slate-500 font-mono text-[11px] mb-0.5">Response Time</div>
                    <div className="font-semibold text-slate-950 flex items-center gap-1">
                      <Clock size={13} className="text-slate-500" /> &lt; 24h Guaranteed
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-slate-200">
                    <div className="text-slate-500 font-mono text-[11px] mb-0.5">Direct Access</div>
                    <div className="font-semibold text-slate-950">Lead Engineer 1-on-1</div>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-slate-200">
                    <div className="text-slate-500 font-mono text-[11px] mb-0.5">IP Ownership</div>
                    <div className="font-semibold text-slate-950">100% Client Owned</div>
                  </div>

                  <div className="p-3 rounded-lg bg-white border border-slate-200">
                    <div className="text-slate-500 font-mono text-[11px] mb-0.5">Confidentiality</div>
                    <div className="font-semibold text-slate-950">Mutual NDA Bound</div>
                  </div>
                </div>

                {/* 3-Step Protocol */}
                <div className="pt-2 text-xs text-slate-600 space-y-2 border-t border-slate-200">
                  <div className="font-mono text-slate-500 text-[11px] uppercase tracking-wider">How We Work Together:</div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-bold text-slate-900">01</span>
                    <span>Submit your application specs or Core Web Vitals problem.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-bold text-slate-900">02</span>
                    <span>15-min technical sync to pinpoint bottlenecks and review architecture.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-bold text-slate-900">03</span>
                    <span>Fixed-scope sprint proposal with guaranteed delivery milestones.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Intake Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-950 tracking-tight mb-1">
                    Sprint Intake & Scope Definition
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Select a package preset below or describe your custom engineering requirements:
                  </p>
                </div>

                {/* Quick Presets Pills */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                    Select Engagement Model
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_PRESETS.map((preset) => {
                      const isActive = formData.projectType === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => selectPreset(preset)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 border text-left ${
                            isActive
                              ? 'bg-slate-900 text-white border-slate-900 shadow-2xs font-semibold'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
                          }`}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Actual Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Alex Miller"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5"
                      >
                        Work Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="alex@company.com"
                      />
                    </div>
                  </div>

                  {/* Company & Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5"
                      >
                        Company / Project Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Acme Corp / Stealth Startup"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5"
                      >
                        Phone / Telegram (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  {/* Project Type & Timeline */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5"
                      >
                        Scope Category
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="architecture-audit">15-Min Architecture Audit (Free for Founders)</option>
                        <option value="performance-overhaul">Core Web Vitals & Performance Overhaul (2-Week Sprint)</option>
                        <option value="mvp-sprint">Full-Stack MVP Launchpad (4-Week Sprint)</option>
                        <option value="fractional-retainer">Senior Fractional Engineering Retainer</option>
                        <option value="web-development">Full-Stack Web Application Build</option>
                        <option value="consultation">Technical Consultation & Advisory</option>
                        <option value="freelance">Freelance Contract</option>
                        <option value="other">Other Scope</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="timeline"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5"
                      >
                        Target Kickoff / Delivery
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="asap">Immediate (Next 7 Days)</option>
                        <option value="1-month">Within 1 Month</option>
                        <option value="2-3-months">Next 2-3 Months</option>
                        <option value="flexible">Flexible / Exploring</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Allocation (conditionally shown or optional) */}
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5"
                    >
                      Estimated Budget / Capital Allocation (Optional)
                    </label>
                    <div className="flex gap-2">
                      <select
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="input-field w-28 shrink-0 font-mono text-xs cursor-pointer"
                      >
                        {CURRENCIES.map((curr) => (
                          <option key={curr.code} value={curr.code}>
                            {curr.code} ({curr.symbol})
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="input-field flex-1 font-mono text-sm"
                        placeholder="e.g. 5000"
                        min="0"
                        step="100"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5"
                    >
                      Subject Line *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="e.g. 15-Min Architecture Audit Request"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5"
                    >
                      Technical Overview & Key Bottlenecks *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="textarea-field font-mono text-xs leading-relaxed"
                      placeholder="Share your live URL, tech stack, Core Web Vitals pain points, or target sprint deliverables..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                          <span>Transmitting Specifications...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Inquiry to Lead Engineer</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <div className="mt-3 flex items-center justify-center gap-2 text-center text-[11px] font-mono text-slate-500">
                      <ShieldCheck size={13} className="text-slate-400" />
                      <span>Direct founder-to-engineer communication · Mutual NDA respected · 24h SLA</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
