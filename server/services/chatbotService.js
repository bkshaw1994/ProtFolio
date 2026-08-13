const axios = require('axios');
const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Project = require('../models/Project');
const Certification = require('../models/Certification');

// Fallback portfolio data in case DB is offline or empty
const FALLBACK_KNOWLEDGE = {
  name: 'Bishal Kumar Shaw',
  title: 'Senior Associate at Cognizant',
  experienceYears: '9+',
  location: 'Bengaluru, Karnataka, India',
  email: 'bkshaw1994@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bkshaw1994',
  github: 'https://github.com/bkshaw1994',
  medium: 'https://medium.com/@bkshaw1994',
  website: 'https://bishal-portfolio-chi.vercel.app',
  summary:
    'Experienced Senior Associate with 9+ years in full-stack development, specializing in MERN stack (MongoDB, Express, React, Node.js), cloud technologies, AWS, and scalable web applications. Proven track record of leading technical initiatives and mentoring development teams.',
  skills: [
    'React',
    'Node.js',
    'JavaScript (ES6+)',
    'TypeScript',
    'MongoDB',
    'Express.js',
    'AWS',
    'Docker',
    'Tailwind CSS',
    'HTML5 & CSS3',
    'REST APIs',
    'Git & CI/CD'
  ],
  experience: [
    {
      company: 'Cognizant',
      position: 'Senior Associate',
      duration: '2024 - Present',
      location: 'Bengaluru, Karnataka, India',
      highlights:
        'Focusing on full-stack web development using MERN stack, leading technical initiatives, mentoring developers, and building scalable cloud microservices.'
    }
  ],
  projects: [
    {
      title: 'E-Commerce Platform',
      tech: 'React, Node.js, MongoDB, Express, Stripe, JWT',
      description:
        'A comprehensive full-stack e-commerce solution with authentication, product catalog, cart, Stripe payments, and admin dashboard.'
    },
    {
      title: 'Task Management System',
      tech: 'React, Node.js, Socket.io, MongoDB, Material-UI',
      description:
        'A real-time collaborative project management tool featuring drag-and-drop boards, team permissions, and live updates.'
    },
    {
      title: 'Weather Dashboard',
      tech: 'React, OpenWeather API, Chart.js, Tailwind CSS',
      description:
        'A real-time weather monitoring application with location detection and 5-day forecasts.'
    }
  ]
};

// Patterns for sensitive or critical private information
const SENSITIVE_PATTERNS = [
  /password/i,
  /secret/i,
  /pin\b/i,
  /credit\s*card/i,
  /debit\s*card/i,
  /bank\s*account/i,
  /social\s*security/i,
  /ssn\b/i,
  /aadhar/i,
  /passport/i,
  /private\s*key/i,
  /home\s*address/i,
  /exact\s*address/i,
  /personal\s*phone/i,
  /mobile\s*number/i,
  /salary/i,
  /earnings/i,
  /confidential/i,
  /internal\s*ip/i,
  /source\s*code\s*of\s*cognizant/i,
  /client\s*data/i
];

/**
 * Validates if the message is requesting critical / sensitive information.
 * @param {string} message 
 * @returns {boolean}
 */
const isSensitiveQuery = (message) => {
  if (!message || typeof message !== 'string') return false;
  return SENSITIVE_PATTERNS.some((pattern) => pattern.test(message));
};

/**
 * Standard polite safety response when sensitive info is requested.
 */
const GET_SAFETY_RESPONSE = () => {
  return (
    "For privacy, security, and confidentiality reasons, I cannot disclose critical personal information such as private contact numbers, exact home address, passwords, or confidential enterprise details. " +
    "However, I would be delighted to assist you with information regarding Bishal's professional background, core technical skills, key projects, work experience, or how to reach out via his official email (" +
    FALLBACK_KNOWLEDGE.email +
    ") or LinkedIn!"
  );
};

/**
 * Aggregates portfolio knowledge base from DB or fallback objects.
 */
const fetchPortfolioKnowledge = async () => {
  const isDbConnected = mongoose.connection.readyState === 1;

  if (!isDbConnected) {
    return {
      name: FALLBACK_KNOWLEDGE.name,
      title: FALLBACK_KNOWLEDGE.title,
      email: FALLBACK_KNOWLEDGE.email,
      location: FALLBACK_KNOWLEDGE.location,
      summary: FALLBACK_KNOWLEDGE.summary,
      skills: FALLBACK_KNOWLEDGE.skills,
      experience: FALLBACK_KNOWLEDGE.experience.map((e) => `${e.position} at ${e.company} (${e.duration}): ${e.highlights}`),
      projects: FALLBACK_KNOWLEDGE.projects.map((p) => `${p.title}: ${p.description} (Tech: ${p.tech})`),
      certifications: ['AWS Certified Solutions Architect (Sample)', 'MongoDB Certified Developer (Sample)'],
      rawProfile: FALLBACK_KNOWLEDGE
    };
  }

  try {
    let profileData = null;
    let skillsData = [];
    let experienceData = [];
    let projectsData = [];
    let certificationsData = [];

    try {
      profileData = await Profile.findOne({ isActive: true }).lean();
    } catch (_e) {
      // DB call fallback
    }

    try {
      skillsData = await Skill.find({ isActive: true }).lean();
    } catch (_e) {
      // DB call fallback
    }

    try {
      experienceData = await Experience.find({ isActive: true }).lean();
    } catch (_e) {
      // DB call fallback
    }

    try {
      projectsData = await Project.find({ isActive: true }).lean();
    } catch (_e) {
      // DB call fallback
    }

    try {
      certificationsData = await Certification.find({ isActive: true }).lean();
    } catch (_e) {
      // DB call fallback
    }

    const name = profileData?.name || FALLBACK_KNOWLEDGE.name;
    const title = profileData?.title || FALLBACK_KNOWLEDGE.title;
    const email = profileData?.email || FALLBACK_KNOWLEDGE.email;
    const location = profileData?.location || FALLBACK_KNOWLEDGE.location;
    const summary = profileData?.summary || FALLBACK_KNOWLEDGE.summary;

    const skills = skillsData.length > 0
      ? skillsData.map((s) => s.name)
      : FALLBACK_KNOWLEDGE.skills;

    const experience = experienceData.length > 0
      ? experienceData.map((e) => `${e.position} at ${e.company} (${e.isCurrent ? 'Current' : 'Past'}): ${e.description || ''}`)
      : FALLBACK_KNOWLEDGE.experience.map((e) => `${e.position} at ${e.company} (${e.duration}): ${e.highlights}`);

    const projects = projectsData.length > 0
      ? projectsData.map((p) => `${p.title}: ${p.shortDescription || p.description}`)
      : FALLBACK_KNOWLEDGE.projects.map((p) => `${p.title}: ${p.description} (Tech: ${p.tech})`);

    const certifications = certificationsData.length > 0
      ? certificationsData.map((c) => `${c.title} by ${c.issuer}`)
      : ['AWS Certified Solutions Architect (Sample)', 'MongoDB Certified Developer (Sample)'];

    return {
      name,
      title,
      email,
      location,
      summary,
      skills,
      experience,
      projects,
      certifications,
      rawProfile: profileData || FALLBACK_KNOWLEDGE
    };
  } catch (error) {
    console.error('Error gathering portfolio knowledge:', error.message);
    return {
      name: FALLBACK_KNOWLEDGE.name,
      title: FALLBACK_KNOWLEDGE.title,
      email: FALLBACK_KNOWLEDGE.email,
      location: FALLBACK_KNOWLEDGE.location,
      summary: FALLBACK_KNOWLEDGE.summary,
      skills: FALLBACK_KNOWLEDGE.skills,
      experience: FALLBACK_KNOWLEDGE.experience.map((e) => `${e.position} at ${e.company}`),
      projects: FALLBACK_KNOWLEDGE.projects.map((p) => `${p.title}`),
      certifications: ['AWS & Full Stack Development']
    };
  }
};

/**
 * Zero-config semantic intent engine for answering portfolio questions.
 */
const generateLocalResponse = (userMessage, knowledge) => {
  const query = userMessage.toLowerCase().trim();

  // Greetings
  if (/\b(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/i.test(query)) {
    return (
      `Hello! 👋 I am **${knowledge.name}'s AI Portfolio Assistant**.\n\n` +
      `I can tell you all about Bishal's 9+ years of full-stack engineering experience, core technical skills (MERN, AWS, Docker), key projects, and career highlights.\n\n` +
      `How can I assist you today?`
    );
  }

  // Identity / Who are you
  if (/\b(who are you|who is bishal|about bishal|tell me about yourself|introduce|bio|summary)\b/i.test(query)) {
    return (
      `**About ${knowledge.name}**\n\n` +
      `👨‍💻 **Role**: ${knowledge.title}\n` +
      `📍 **Location**: ${knowledge.location}\n` +
      `📝 **Summary**: ${knowledge.summary}\n\n` +
      `Feel free to ask me about his **skills**, **projects**, **work experience**, or **certifications**!`
    );
  }

  // Skills
  if (/\b(skill|skills|tech|technologies|stack|framework|programming|languages|tools|frontend|backend|database)\b/i.test(query)) {
    const skillsList = knowledge.skills.slice(0, 12).join(', ');
    return (
      `💡 **Technical Skills & Expertise**\n\n` +
      `Bishal specializes in modern full-stack application development:\n` +
      `• **Core Stack**: MERN (MongoDB, Express.js, React.js, Node.js)\n` +
      `• **Languages**: JavaScript (ES6+), TypeScript, HTML5, CSS3\n` +
      `• **Cloud & DevOps**: AWS, Docker, Git, CI/CD Pipelines\n` +
      `• **Styling**: Tailwind CSS, CSS Modules, Framer Motion\n\n` +
      `Key skills: *${skillsList}*`
    );
  }

  // Experience / Job history / Company
  if (/\b(experience|work|job|history|company|cognizant|role|senior associate|career)\b/i.test(query)) {
    const expText = knowledge.experience.map((e) => `• ${e}`).join('\n');
    return (
      `💼 **Professional Experience**\n\n` +
      `Bishal has **9+ years** of professional experience in software engineering and technical leadership:\n\n` +
      `${expText}\n\n` +
      `Key achievements include leading full-stack development teams, building high-throughput microservices, and optimizing cloud web applications.`
    );
  }

  // Projects
  if (/\b(project|projects|portfolio|work samples|apps|build|e-commerce|task management|weather)\b/i.test(query)) {
    const projText = knowledge.projects.map((p) => `• ${p}`).join('\n');
    return (
      `🚀 **Featured Projects**\n\n` +
      `Here are some of the key projects Bishal has designed and developed:\n\n` +
      `${projText}\n\n` +
      `You can also explore the **Projects** section on this website for detailed case studies and live demos!`
    );
  }

  // Contact / Email / Hire / Reach out
  if (/\b(contact|email|phone|reach|touch|hire|interview|connect|linkedin|github)\b/i.test(query)) {
    return (
      `📫 **Get in Touch with ${knowledge.name}**\n\n` +
      `Bishal is always open to professional opportunities, technical collaborations, and networking!\n\n` +
      `• 📧 **Email**: [${knowledge.email}](mailto:${knowledge.email})\n` +
      `• 💼 **LinkedIn**: [linkedin.com/in/bkshaw1994](${FALLBACK_KNOWLEDGE.linkedin})\n` +
      `• 🐙 **GitHub**: [github.com/bkshaw1994](${FALLBACK_KNOWLEDGE.github})\n` +
      `• 📝 **Medium**: [medium.com/@bkshaw1994](${knowledge.medium || FALLBACK_KNOWLEDGE.medium})\n` +
      `• 🌐 **Website**: [bishal-portfolio-chi.vercel.app](${FALLBACK_KNOWLEDGE.website})\n\n` +
      `You can also drop a direct message using the **Contact Form** on the website!`
    );
  }

  // Certifications
  if (/\b(certif|certificate|qualification|degree|education)\b/i.test(query)) {
    const certText = knowledge.certifications.map((c) => `• ${c}`).join('\n');
    return (
      `🎓 **Certifications & Education**\n\n` +
      `${certText}\n\n` +
      `Bishal continuously upgrades his skill set with certifications in cloud architectures, full-stack development, and modern software design.`
    );
  }

  // Thank you / Gratitude
  if (/\b(thank|thanks|great|awesome|good|perfect|appreciate)\b/i.test(query)) {
    return (
      `You're very welcome! 😊 It's a pleasure helping you. Let me know if you have any more questions about Bishal's work or experience!`
    );
  }

  // Default fallback response
  return (
    `Thank you for asking! ${knowledge.name} is a Senior Associate at Cognizant with over 9+ years of expertise in full-stack web development (MERN, AWS, Docker).\n\n` +
    `I can help answer questions about:\n` +
    `• 💡 **Technical Skills & Tools**\n` +
    `• 💼 **Work Experience & Roles**\n` +
    `• 🚀 **Featured Projects & Demos**\n` +
    `• 🎓 **Certifications**\n` +
    `• 📬 **How to Contact Bishal**\n\n` +
    `What would you like to know more about?`
  );
};

/**
 * Call OpenAI API if API key is present
 */
const generateOpenAIResponse = async (userMessage, knowledge, messageHistory = []) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const systemPrompt = `
You are the polite, professional AI Assistant for Bishal Kumar Shaw's personal portfolio website.
Here is authentic context about Bishal:
- Name: ${knowledge.name}
- Title: ${knowledge.title}
- Summary: ${knowledge.summary}
- Location: ${knowledge.location}
- Email: ${knowledge.email}
- Skills: ${knowledge.skills.join(', ')}
- Work Experience: ${knowledge.experience.join('; ')}
- Featured Projects: ${knowledge.projects.join('; ')}
- Certifications: ${knowledge.certifications.join('; ')}

GUIDELINES:
1. Always be extremely polite, friendly, professional, and helpful.
2. Rely strictly on the portfolio context provided above.
3. NEVER disclose critical sensitive personal info (passwords, private home address, bank accounts, confidential corporate IP).
4. Keep responses concise, well-formatted with markdown bullets where relevant.
`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...messageHistory.slice(-6).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    { role: 'user', content: userMessage }
  ];

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 350
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    return response.data?.choices?.[0]?.message?.content?.trim() || null;
  } catch (err) {
    console.warn('OpenAI API call failed, falling back to local engine:', err.message);
    return null;
  }
};

/**
 * Main function to generate response for a chatbot message.
 */
const processChatMessage = async (userMessage, messageHistory = []) => {
  if (!userMessage || typeof userMessage !== 'string') {
    return {
      reply: 'Hello! How can I assist you with information regarding Bishal\'s portfolio today?',
      isGuardrailTriggered: false
    };
  }

  // 1. Check Privacy Guardrails
  if (isSensitiveQuery(userMessage)) {
    return {
      reply: GET_SAFETY_RESPONSE(),
      isGuardrailTriggered: true
    };
  }

  // 2. Fetch fresh portfolio knowledge base
  const knowledge = await fetchPortfolioKnowledge();

  // 3. Try external LLM API if key is available
  if (process.env.OPENAI_API_KEY) {
    const llmReply = await generateOpenAIResponse(userMessage, knowledge, messageHistory);
    if (llmReply) {
      return {
        reply: llmReply,
        isGuardrailTriggered: false
      };
    }
  }

  // 4. Fallback to zero-config local AI engine
  const localReply = generateLocalResponse(userMessage, knowledge);
  return {
    reply: localReply,
    isGuardrailTriggered: false
  };
};

/**
 * Returns suggested quick questions for the chatbot UI.
 */
const getSuggestedQuestions = () => {
  return [
    "What are Bishal's core skills?",
    "Tell me about his experience at Cognizant",
    "What key projects has Bishal built?",
    "How can I contact or hire Bishal?"
  ];
};

module.exports = {
  processChatMessage,
  getSuggestedQuestions,
  isSensitiveQuery,
  fetchPortfolioKnowledge
};
