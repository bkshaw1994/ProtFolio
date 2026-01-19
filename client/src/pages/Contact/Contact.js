import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Github,
  Linkedin,
  ExternalLink,
  Download,
} from "lucide-react";
import {
  useSubmitContactMutation,
  useGetProfileQuery,
} from "../../features/api/apiSlice";
import toast from "react-hot-toast";
import LoadingSpinner from "../../components/LoadingSpinner";
import { getFileUrl } from "../../utils/apiUrl";

const Contact = () => {
  // Fetch profile data for contact information
  const { data: profile, isLoading: loadingProfile } = useGetProfileQuery();
  const profileData = profile?.data || profile;

  // Get list of common currencies using Intl API
  const currencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
    { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
    { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    company: "",
    projectType: "other",
    budget: "",
    currency: "INR",
    timeline: "flexible",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitContact, { isLoading: isSubmitting }] =
    useSubmitContactMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitContact(formData).unwrap();
      toast.success(response.message || "Message sent successfully!");
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
        company: "",
        projectType: "other",
        budget: "",
        currency: "INR",
        timeline: "flexible",
      });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send message");
    }
  };

  // Show loading spinner while fetching profile data
  if (loadingProfile) {
    return <LoadingSpinner />;
  }

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Contact - Thank You</title>
        </Helmet>

        <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-success-50 to-primary-50">
          <div className="container-custom text-center">
            <CheckCircle size={64} className="text-success-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-secondary-900 mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-secondary-600 mb-8">
              Your message has been sent successfully. I'll get back to you
              within 24-48 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary"
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
            ? `Hire ${profileData.name} - Contact Freelance Developer`
            : "Hire Freelance MERN Stack Developer - Contact"}
        </title>
        <meta
          name="description"
          content={`Contact ${profileData?.name || "me"} for freelance web development projects. ${profileData?.title ? `Expert in ${profileData.title.toLowerCase()}.` : "Specializing in MERN stack development."} Available for hire - Get a quote today!`}
        />
        <meta
          name="keywords"
          content="hire freelance developer, contact MERN developer, freelance web developer, get quote, hire React developer, Node.js developer for hire, freelance programmer contact"
        />
      </Helmet>

      <div className="pt-20">
        {/* Header */}
        <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-custom text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6">
              Get In Touch
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Let's discuss your next project and bring your ideas to life.
              {profileData?.name && ` I'm ${profileData.name}, `}
              ready to help you create amazing digital experiences.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    {profileData?.email && (
                      <div className="flex items-center space-x-3">
                        <Mail className="text-primary-600" size={20} />
                        <a
                          href={`mailto:${profileData.email}`}
                          className="text-secondary-700 hover:text-primary-600"
                        >
                          {profileData.email}
                        </a>
                      </div>
                    )}
                    {profileData?.phone && (
                      <div className="flex items-center space-x-3">
                        <Phone className="text-primary-600" size={20} />
                        <a
                          href={`tel:${profileData.phone}`}
                          className="text-secondary-700 hover:text-primary-600"
                        >
                          {profileData.phone}
                        </a>
                      </div>
                    )}
                    {profileData?.location && (
                      <div className="flex items-center space-x-3">
                        <MapPin className="text-primary-600" size={20} />
                        <span className="text-secondary-700">
                          {profileData.location}
                        </span>
                      </div>
                    )}
                    {!profileData?.email &&
                      !profileData?.phone &&
                      !profileData?.location && (
                        <div className="text-secondary-600">
                          Please use the contact form to get in touch.
                        </div>
                      )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                    Response Time
                  </h3>
                  <p className="text-secondary-600">
                    I typically respond to all inquiries within 24-48 hours.
                    {profileData?.phone &&
                      " For urgent matters, please call directly."}
                    Looking forward to discussing your project!
                  </p>
                </div>

                {/* Resume Download */}
                {profileData?.resume && (
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                      Download Resume
                    </h3>
                    <a
                      href={getFileUrl(profileData.resume)}
                      download
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
                    >
                      <Download size={20} />
                      <span>Download Resume</span>
                    </a>
                  </div>
                )}

                {/* Social Links */}
                {(profileData?.socialLinks?.github ||
                  profileData?.socialLinks?.linkedin ||
                  profileData?.socialLinks?.portfolio) && (
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                      Connect With Me
                    </h3>
                    <div className="flex space-x-4">
                      {profileData.socialLinks.github && (
                        <a
                          href={profileData.socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-secondary-100 rounded-lg hover:bg-primary-100 hover:text-primary-600 transition-colors"
                          aria-label="GitHub"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {profileData.socialLinks.linkedin && (
                        <a
                          href={profileData.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-secondary-100 rounded-lg hover:bg-primary-100 hover:text-primary-600 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <Linkedin size={20} />
                        </a>
                      )}
                      {profileData.socialLinks.portfolio && (
                        <a
                          href={profileData.socialLinks.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 bg-secondary-100 rounded-lg hover:bg-primary-100 hover:text-primary-600 transition-colors"
                          aria-label="Portfolio"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-secondary-700 mb-2"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-secondary-700 mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-secondary-700 mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Your phone number"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-secondary-700 mb-2"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-secondary-700 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="projectType"
                        className="block text-sm font-medium text-secondary-700 mb-2"
                      >
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="web-development">Web Development</option>
                        <option value="mobile-app">Mobile App</option>
                        <option value="consultation">Consultation</option>
                        <option value="freelance">Freelance</option>
                        <option value="full-time">Full-time</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="timeline"
                        className="block text-sm font-medium text-secondary-700 mb-2"
                      >
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="asap">ASAP</option>
                        <option value="1-month">1 Month</option>
                        <option value="2-3-months">2-3 Months</option>
                        <option value="3-6-months">3-6 Months</option>
                        <option value="6-months+">6+ Months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  {formData.projectType === "freelance" && (
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium text-secondary-700 mb-2"
                      >
                        Budget
                      </label>
                      <div className="relative">
                        <select
                          id="currency"
                          name="currency"
                          value={formData.currency}
                          onChange={handleChange}
                          className="absolute left-0 top-0 h-full pl-3 pr-2 border-r border-secondary-300 bg-secondary-50 text-secondary-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer z-10"
                          style={{ width: "85px" }}
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
                          className="input-field w-full pl-24"
                          placeholder="Enter amount"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-secondary-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="textarea-field"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loader mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send
                          size={20}
                          className="ml-2 group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
