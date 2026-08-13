import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Github,
  Linkedin,
  Download,
  Sparkles,
  MessageSquare,
  Clock,
  Briefcase,
  User,
  Building,
  DollarSign
} from 'lucide-react';
import {
  useSubmitContactMutation,
  useGetProfileQuery
} from '../../features/api/apiSlice';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getFileUrl } from '../../utils/apiUrl';

// Medium Icon Component
const MediumIcon = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

const Contact = () => {
  const { data: profile, isLoading: loadingProfile } = useGetProfileQuery();
  const profileData = profile?.data || profile;
  const mediumUrl = profileData?.medium || profileData?.socialLinks?.medium || profileData?.mediumUrl;

  const currencies = [
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    company: '',
    projectType: 'other',
    budget: '',
    currency: 'INR',
    timeline: 'flexible'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitContact, { isLoading: isSubmitting }] = useSubmitContactMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitContact(formData).unwrap();
      toast.success(response.message || 'Message sent successfully!');
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: '',
        company: '',
        projectType: 'other',
        budget: '',
        currency: 'INR',
        timeline: 'flexible'
      });
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to send message');
    }
  };

  if (loadingProfile) {
    return <LoadingSpinner />;
  }

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Contact - Thank You</title>
        </Helmet>

        <div className="pt-24 sm:pt-28 pb-20 min-h-screen flex items-center justify-center bg-slate-50/50">
          <div className="container-custom max-w-lg text-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xl">
            <CheckCircle size={64} className="text-emerald-500 mx-auto mb-6 animate-bounce" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              Thank You!
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              Your message has been sent successfully. I'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {profileData?.name
            ? `Contact ${profileData.name} | MERN Stack Developer`
            : 'Contact Bishal Kumar Shaw'}
        </title>
        <meta
          name="description"
          content={`Get in touch with ${profileData?.name || 'Bishal Kumar Shaw'} for freelance web development projects and full stack consultation.`}
        />
      </Helmet>

      <div className="min-h-screen bg-slate-50/30 pb-20">
        {/* Header Hero */}
        <section className="pt-24 sm:pt-28 pb-10 sm:pb-12 bg-slate-50/50 bg-grid-pattern text-slate-900 border-b border-slate-200/60">
          <div className="container-custom text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/80 text-primary-800 border border-primary-200/60 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles size={14} />
              <span>Let's Connect</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Get In Touch
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-normal">
              Have a project in mind, a question, or want to collaborate? Send a message and let's start talking.
            </p>
          </div>
        </section>

        {/* Contact Content Container */}
        <section className="pt-8 sm:pt-12">
          <div className="container-custom max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Contact Cards & Info */}
              <div className="w-full space-y-6 order-2 lg:order-1">
                
                {/* Contact Information Card */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <MessageSquare className="text-primary-600" size={20} />
                      <span>Contact Details</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Direct communication channels</p>
                  </div>

                  <div className="space-y-4 text-sm">
                    {profileData?.email && (
                      <a
                        href={`mailto:${profileData.email}`}
                        className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-slate-50 hover:bg-primary-50/70 border border-slate-100 hover:border-primary-200 transition-all text-slate-700 hover:text-primary-600 group"
                      >
                        <div className="p-2.5 bg-white rounded-xl shadow-xs text-primary-600 group-hover:scale-105 transition-transform">
                          <Mail size={18} />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email</div>
                          <div className="font-semibold text-slate-800 group-hover:text-primary-600 truncate">{profileData.email}</div>
                        </div>
                      </a>
                    )}

                    {profileData?.phone && (
                      <a
                        href={`tel:${profileData.phone}`}
                        className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-slate-50 hover:bg-primary-50/70 border border-slate-100 hover:border-primary-200 transition-all text-slate-700 hover:text-primary-600 group"
                      >
                        <div className="p-2.5 bg-white rounded-xl shadow-xs text-primary-600 group-hover:scale-105 transition-transform">
                          <Phone size={18} />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone</div>
                          <div className="font-semibold text-slate-800 group-hover:text-primary-600">{profileData.phone}</div>
                        </div>
                      </a>
                    )}

                    {profileData?.location && (
                      <div className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700">
                        <div className="p-2.5 bg-white rounded-xl shadow-xs text-primary-600">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Location</div>
                          <div className="font-semibold text-slate-800">{profileData.location}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Response Guarantee Card */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-indigo-50 rounded-2xl text-primary-600 flex-shrink-0">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Quick Response</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      I typically reply within 24 hours. For urgent project requests, feel free to call directly.
                    </p>
                  </div>
                </div>

                {/* Resume Download Card */}
                {profileData?.resume && (
                  <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-3xl text-white shadow-md space-y-4">
                    <div>
                      <h4 className="font-extrabold text-base">Looking for my Resume?</h4>
                      <p className="text-xs text-slate-300 mt-1">Get a PDF breakdown of my experience and tech stack.</p>
                    </div>
                    <a
                      href={getFileUrl(profileData.resume)}
                      download
                      className="inline-flex items-center justify-center space-x-2 w-full py-3 px-4 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                    >
                      <Download size={16} />
                      <span>Download Resume</span>
                    </a>
                  </div>
                )}

                {/* Social Profiles */}
                {(profileData?.socialLinks?.github ||
                  profileData?.socialLinks?.linkedin ||
                  mediumUrl) && (
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                    <h4 className="font-bold text-slate-900 text-sm">Social Profiles</h4>
                    <div className="flex items-center gap-3">
                      {profileData?.socialLinks?.github && (
                        <a
                          href={profileData.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-11 h-11 bg-slate-100 hover:bg-primary-600 hover:text-white rounded-xl text-slate-700 transition-all"
                          title="GitHub"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {profileData?.socialLinks?.linkedin && (
                        <a
                          href={profileData.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-11 h-11 bg-slate-100 hover:bg-primary-600 hover:text-white rounded-xl text-slate-700 transition-all"
                          title="LinkedIn"
                        >
                          <Linkedin size={20} />
                        </a>
                      )}
                      {mediumUrl && (
                        <a
                          href={mediumUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-11 h-11 bg-slate-100 hover:bg-primary-600 hover:text-white rounded-xl text-slate-700 transition-all"
                          title="Medium Profile"
                        >
                          <MediumIcon size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Contact Form */}
              <div className="w-full lg:col-span-2 order-1 lg:order-2">
                <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40">
                  <div className="mb-8 border-b border-slate-100 pb-5">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Send Me a Message
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">
                      Fill out the form below and I'll get back to you shortly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5"
                        >
                          <User size={14} className="text-primary-600" />
                          <span>Name *</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-slate-900 bg-slate-50/70 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all placeholder:text-slate-400"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5"
                        >
                          <Mail size={14} className="text-primary-600" />
                          <span>Email *</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-slate-900 bg-slate-50/70 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all placeholder:text-slate-400"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Phone & Company Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5"
                        >
                          <Phone size={14} className="text-slate-400" />
                          <span>Phone (Optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-slate-900 bg-slate-50/70 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all placeholder:text-slate-400"
                          placeholder="Your phone number"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="company"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5"
                        >
                          <Building size={14} className="text-slate-400" />
                          <span>Company (Optional)</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-slate-900 bg-slate-50/70 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all placeholder:text-slate-400"
                          placeholder="Company name"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5"
                      >
                        <MessageSquare size={14} className="text-primary-600" />
                        <span>Subject *</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-slate-900 bg-slate-50/70 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all placeholder:text-slate-400"
                        placeholder="What is this regarding?"
                      />
                    </div>

                    {/* Project Type & Timeline Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label
                          htmlFor="projectType"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5"
                        >
                          <Briefcase size={14} className="text-slate-400" />
                          <span>Project Type</span>
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-slate-900 bg-slate-50/70 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all cursor-pointer"
                        >
                          <option value="web-development">Web Development</option>
                          <option value="mobile-app">Mobile App</option>
                          <option value="consultation">Consultation</option>
                          <option value="freelance">Freelance Project</option>
                          <option value="full-time">Full-time Opportunity</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="timeline"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5"
                        >
                          <Clock size={14} className="text-slate-400" />
                          <span>Expected Timeline</span>
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full px-4 py-3 text-slate-900 bg-slate-50/70 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all cursor-pointer"
                        >
                          <option value="asap">ASAP</option>
                          <option value="1-month">Within 1 Month</option>
                          <option value="2-3-months">2 - 3 Months</option>
                          <option value="3-6-months">3 - 6 Months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>

                    {/* Responsive Budget & Currency selector */}
                    {formData.projectType === 'freelance' && (
                      <div>
                        <label
                          htmlFor="budget"
                          className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5"
                        >
                          <DollarSign size={14} className="text-slate-400" />
                          <span>Estimated Budget</span>
                        </label>
                        <div className="flex flex-row items-center gap-3">
                          <select
                            id="currency"
                            name="currency"
                            value={formData.currency}
                            onChange={handleChange}
                            className="w-28 flex-shrink-0 px-3 py-3 text-slate-900 bg-slate-100 border border-slate-200 rounded-xl text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 cursor-pointer"
                          >
                            {currencies.map((curr) => (
                              <option key={curr.code} value={curr.code}>
                                {curr.symbol} {curr.code}
                              </option>
                            ))}
                          </select>
                          <input
                            type="number"
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-slate-900 bg-slate-50/70 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all placeholder:text-slate-400"
                            placeholder="e.g. 50000"
                            min="0"
                            step="0.01"
                          />
                        </div>
                      </div>
                    )}

                    {/* Message Area */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5"
                      >
                        <MessageSquare size={14} className="text-primary-600" />
                        <span>Message *</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-slate-900 bg-slate-50/70 border border-slate-200 rounded-xl text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all placeholder:text-slate-400 resize-y min-h-[130px]"
                        placeholder="Describe your project, goals, or timeline..."
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full py-4 rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg shadow-primary-500/20 group flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="loader mr-2"></div>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send
                            size={16}
                            className="ml-2 group-hover:translate-x-1 transition-transform"
                          />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
