#!/usr/bin/env node

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, "../server/.env") });

// IMPORTANT: Set buffer timeout BEFORE requiring models
mongoose.set("bufferTimeoutMS", 60000);

// Import models
const Profile = require("../server/models/Profile");
const Experience = require("../server/models/Experience");
const Skill = require("../server/models/Skill");
const Project = require("../server/models/Project");

const profileData = {
  name: "Bishal Kumar Shaw",
  title: "Senior Frontend & Full-Stack Architect | Next.js & Performance Specialist",
  location: "Bengaluru, Karnataka, India (Remote Worldwide)",
  email: "bkshaw1994@gmail.com",
  phone: "+91-9876543210",
  linkedin: "https://www.linkedin.com/in/bkshaw1994",
  github: "https://github.com/bkshaw1994",
  website: "https://bishal-portfolio-chi.vercel.app",
  summary:
    "I help fast-growing SaaS and e-commerce brands eliminate UI lag, slash load times, and ship bulletproof Next.js applications. 9+ years experience delivering sub-second Core Web Vitals, zero hydration debt, and 4-week production MVP sprints. Creator of open-source tools like AuditPulse.",
  skills: {
    frontend: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Zustand",
      "Puppeteer",
      "Playwright",
      "Jest",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "BullMQ",
      "WebSockets",
    ],
    database: ["MongoDB", "PostgreSQL", "Redis"],
    cloud: ["Vercel", "Google Cloud", "AWS", "Docker", "GitHub Actions"],
    tools: ["Git", "Chrome DevTools", "Turborepo", "Lighthouse CI", "Postman"],
  },
  isActive: true,
};

const experienceData = {
  position: "Senior Associate",
  company: "Cognizant",
  location: "Bengaluru, Karnataka, India",
  startDate: new Date("2024-01-01"),
  isCurrent: true,
  description:
    "Working as a Senior Associate focusing on web development and cloud technologies",
  responsibilities: [
    "Developing full-stack web applications using MERN stack",
    "Leading technical initiatives and mentoring junior developers",
    "Implementing cloud-based solutions and microservices",
    "Collaborating with cross-functional teams on product development",
    "Code reviews and maintaining high code quality standards",
  ],
  technologies: ["React", "Node.js", "MongoDB", "Express", "AWS", "Docker"],
  employmentType: "full-time",
  workMode: "hybrid",
  teamSize: 8,
  reportingTo: "Technical Lead",
  keyProjects: [
    {
      name: "Portfolio Platform",
      description: "Developed a modern portfolio platform using MERN stack",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      impact: "Improved developer productivity by 40%",
    },
  ],
  isActive: true,
};

// Skills Data
const skillsData = [
  {
    name: "React",
    category: "frontend",
    proficiency: 95,
    description:
      "Advanced React.js development with hooks, context, and modern patterns",
    yearsOfExperience: 5,
    icon: "react",
    priority: 1,
    isCore: true,
    isActive: true,
  },
  {
    name: "Node.js",
    category: "backend",
    proficiency: 90,
    description:
      "Server-side JavaScript development with Express.js and RESTful APIs",
    yearsOfExperience: 6,
    icon: "nodejs",
    priority: 1,
    isCore: true,
    isActive: true,
  },
  {
    name: "MongoDB",
    category: "database",
    proficiency: 85,
    description: "NoSQL database design and optimization",
    yearsOfExperience: 4,
    icon: "mongodb",
    priority: 1,
    isCore: true,
    isActive: true,
  },
  {
    name: "JavaScript",
    category: "frontend",
    proficiency: 95,
    description: "Modern JavaScript ES6+ features and frameworks",
    yearsOfExperience: 7,
    icon: "javascript",
    priority: 1,
    isCore: true,
    isActive: true,
  },
  {
    name: "TypeScript",
    category: "frontend",
    proficiency: 80,
    description: "Typed JavaScript for better code quality and maintainability",
    yearsOfExperience: 3,
    icon: "typescript",
    priority: 2,
    isCore: true,
    isActive: true,
  },
  {
    name: "AWS",
    category: "devops",
    proficiency: 75,
    description: "Cloud infrastructure and deployment on Amazon Web Services",
    yearsOfExperience: 3,
    icon: "aws",
    priority: 2,
    isCore: true,
    isActive: true,
  },
  {
    name: "Docker",
    category: "tools",
    proficiency: 70,
    description: "Containerization and deployment automation",
    yearsOfExperience: 2,
    icon: "docker",
    priority: 2,
    isCore: false,
    isActive: true,
  },
  {
    name: "Express.js",
    category: "backend",
    proficiency: 90,
    description: "Web application framework for Node.js",
    yearsOfExperience: 5,
    icon: "express",
    priority: 1,
    isCore: true,
    isActive: true,
  },
];

// Flagship Proof-of-Work Projects (SAR Framework)
const projectsData = [
  {
    title: "AuditPulse: Open-Source Core Web Vitals & SPA SEO Monitor",
    shortDescription:
      "Open-source Core Web Vitals & SPA SEO performance monitoring engine",
    description:
      "Automated headless performance profiling engine built with Next.js, Puppeteer, Redis, and MongoDB to eliminate SPA SEO crawl drops and detect rendering regressions before staging deployments.",
    technologies: [
      "Next.js",
      "Puppeteer",
      "Redis",
      "MongoDB",
      "WebSockets",
      "Tailwind CSS",
    ],
    category: "fullstack",
    isFeatured: true,
    status: "completed",
    priority: 1,
    role: "Creator & Core Architect",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-05-01"),
    githubUrl: "https://github.com/bkshaw1994/AuditPulse",
    liveUrl: "https://bishal-portfolio-chi.vercel.app/projects",
    images: ["/images/projects/auditpulse.jpg"],
    features: [
      "Distributed Puppeteer worker clusters with mobile 4G network throttling",
      "BullMQ asynchronous job queue handling concurrent audit sweeps",
      "Real-time WebSocket streaming of DOM waterfall traces and critical render paths",
      "Automated Slack & GitHub PR webhook alerts on Core Web Vitals regression",
      "Comprehensive diagnostic dashboard tracking LCP, CLS, and INP metrics",
    ],
    teamSize: 1,
    client: "Open Source Community",
    isActive: true,
    metrics: {
      performanceScore: 98,
      userRating: 5.0,
      completionTime: "Continuous",
    },
  },
  {
    title: "High-Performance E-Commerce & SaaS Architecture Platform",
    shortDescription:
      "Sub-second LCP, multi-tier ISR caching, and zero hydration debt storefront",
    description:
      "Enterprise e-commerce and SaaS architecture featuring Next.js App Router, React Server Components, tiered ISR caching, and atomic state management for high-concurrency scale events.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Redis",
      "Tailwind CSS",
      "Zustand",
    ],
    category: "fullstack",
    isFeatured: true,
    status: "completed",
    priority: 2,
    role: "Lead Frontend Architect",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-07-01"),
    githubUrl: "https://github.com/bkshaw1994",
    liveUrl: "https://bishal-portfolio-chi.vercel.app/projects",
    images: ["/images/projects/ecommerce.jpg"],
    features: [
      "Sub-second mobile LCP (720ms) under heavy catalog volume",
      "Tiered Incremental Static Regeneration (ISR) with stale-while-revalidate edge cache",
      "Optimistic cart state store with zero hydration mismatches",
      "Dynamic bundle splitting reducing JavaScript payload by 52%",
      "Server Component streaming of real-time pricing and inventory",
    ],
    teamSize: 3,
    client: "High-Growth E-Commerce Brand",
    isActive: true,
    metrics: {
      performanceScore: 99,
      userRating: 4.9,
      completionTime: "4 months",
    },
  },
  {
    title: "Enterprise Micro-Frontend & Scalable Component System",
    shortDescription:
      "Monorepo design system architecture with strict TypeScript & Playwright CI",
    description:
      "Turborepo monorepo design system with strictly typed TypeScript component packages, Module Federation, automated visual regression gates, and 84% faster CI/CD build pipelines.",
    technologies: [
      "TypeScript",
      "Next.js",
      "Turborepo",
      "Playwright",
      "Jest",
      "Tailwind CSS",
    ],
    category: "fullstack",
    isFeatured: true,
    status: "completed",
    priority: 3,
    role: "Principal Frontend Architect",
    startDate: new Date("2023-09-01"),
    endDate: new Date("2024-02-01"),
    githubUrl: "https://github.com/bkshaw1994",
    liveUrl: "https://bishal-portfolio-chi.vercel.app/projects",
    images: ["/images/projects/microfrontend.jpg"],
    features: [
      "Monorepo package isolation via Turborepo and Module Federation",
      "Playwright E2E and Jest test suites delivering 99.4% core primitive coverage",
      "CI/CD build time reduced from 22 minutes to 3.5 minutes (84% speedup)",
      "Strict TypeScript types and zero-runtime CSS tokens preventing cross-team drift",
      "Automated semantic versioning and preview deployments in GitHub Actions",
    ],
    teamSize: 5,
    client: "Enterprise SaaS Platform",
    isActive: true,
    metrics: {
      performanceScore: 97,
      userRating: 4.9,
      completionTime: "5 months",
    },
  },
];

async function uploadData() {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log("✓ MongoDB connected!\n");

    // Upload Profile Data
    console.log("Uploading profile...");
    await Profile.findOneAndUpdate({}, profileData, {
      upsert: true,
      new: true,
    });
    console.log("✓ Profile saved");

    // Upload Experience Data
    console.log("Uploading experience...");
    await Experience.findOneAndUpdate(
      { position: experienceData.position, company: experienceData.company },
      experienceData,
      { upsert: true, new: true },
    );
    console.log("✓ Experience saved");

    // Upload Skills Data
    console.log("Uploading skills...");
    for (const skillData of skillsData) {
      await Skill.findOneAndUpdate({ name: skillData.name }, skillData, {
        upsert: true,
        new: true,
      });
      console.log(`  ✓ ${skillData.name}`);
    }

    // Upload Projects Data
    console.log("Uploading projects...");
    for (const projectData of projectsData) {
      await Project.findOneAndUpdate(
        { title: projectData.title },
        projectData,
        { upsert: true, new: true },
      );
      console.log(`  ✓ ${projectData.title}`);
    }

    console.log("✅ All data uploaded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error uploading data:", error.message);
    process.exit(1);
  }
}

uploadData();
