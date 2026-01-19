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
  title: "Senior Associate at Cognizant",
  location: "Bengaluru, Karnataka, India",
  email: "bkshaw1994@gmail.com",
  phone: "+91-9876543210",
  linkedin: "https://www.linkedin.com/in/bkshaw1994",
  github: "https://github.com/bkshaw1994",
  website: "https://bishal-portfolio-chi.vercel.app",
  summary:
    "Experienced Senior Associate with 9+ years in full-stack development, specializing in MERN stack, cloud technologies, and scalable web applications. Proven track record of leading technical initiatives and mentoring development teams.",
  skills: {
    frontend: [
      "React",
      "Angular",
      "Vue.js",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
    backend: [
      "Node.js",
      "Express.js",
      "Python",
      "Django",
      "REST APIs",
      "GraphQL",
    ],
    database: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
    cloud: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
    tools: ["Git", "Jenkins", "JIRA", "VS Code", "Postman"],
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

// Projects Data
const projectsData = [
  {
    title: "E-Commerce Platform",
    shortDescription: "Full-stack e-commerce solution with modern features",
    description:
      "A comprehensive e-commerce platform built with MERN stack featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Implemented responsive design and optimized performance.",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Stripe",
      "JWT",
    ],
    category: "fullstack",
    isFeatured: true,
    status: "completed",
    priority: 1,
    role: "Full Stack Developer",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-06-01"),
    githubUrl: "https://github.com/bkshaw1994/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.bishalshaw.dev",
    images: ["/images/projects/ecommerce.jpg"],
    features: [
      "User authentication and authorization",
      "Product catalog with search and filters",
      "Shopping cart and checkout process",
      "Payment integration with Stripe",
      "Admin dashboard for inventory management",
      "Responsive design for all devices",
    ],
    teamSize: 1,
    client: "Personal Project",
    isActive: true,
    metrics: {
      performanceScore: 95,
      userRating: 4.8,
      completionTime: "3 months",
    },
  },
  {
    title: "Task Management System",
    shortDescription: "Collaborative project management tool",
    description:
      "A collaborative task management system similar to Trello, built with React and Node.js. Features include drag-and-drop functionality, real-time updates, team collaboration, and project analytics.",
    technologies: [
      "React",
      "Node.js",
      "Socket.io",
      "MongoDB",
      "Express.js",
      "Material-UI",
    ],
    category: "fullstack",
    isFeatured: true,
    status: "completed",
    priority: 2,
    role: "Lead Developer",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-03-15"),
    githubUrl: "https://github.com/bkshaw1994/task-management",
    liveUrl: "https://taskmanager.bishalshaw.dev",
    images: ["/images/projects/taskmanager.jpg"],
    features: [
      "Drag and drop task management",
      "Real-time collaboration with Socket.io",
      "Team management and permissions",
      "Project analytics and reporting",
      "File attachments and comments",
      "Mobile-responsive interface",
    ],
    teamSize: 2,
    client: "Startup Project",
    isActive: true,
    metrics: {
      performanceScore: 92,
      userRating: 4.6,
      completionTime: "2 months",
    },
  },
  {
    title: "Weather Dashboard",
    shortDescription: "Real-time weather monitoring application",
    description:
      "A comprehensive weather dashboard that provides current weather conditions, forecasts, and weather maps. Features location-based weather, favorite locations, and weather alerts.",
    technologies: ["React", "OpenWeather API", "Chart.js", "Tailwind CSS"],
    category: "web",
    isFeatured: false,
    status: "completed",
    priority: 3,
    role: "Frontend Developer",
    startDate: new Date("2023-11-01"),
    endDate: new Date("2023-12-01"),
    githubUrl: "https://github.com/bkshaw1994/weather-dashboard",
    liveUrl: "https://weather.bishalshaw.dev",
    images: ["/images/projects/weather.jpg"],
    features: [
      "Current weather conditions display",
      "5-day weather forecast",
      "Interactive weather maps",
      "Location-based weather detection",
      "Favorite locations management",
      "Weather alerts and notifications",
    ],
    teamSize: 1,
    client: "Personal Project",
    isActive: true,
    metrics: {
      performanceScore: 88,
      userRating: 4.4,
      completionTime: "1 month",
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
