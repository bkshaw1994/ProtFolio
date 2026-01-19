#!/usr/bin/env node

const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../server/.env") });

const profileData = {
  name: "Bishal Kumar Shaw",
  title: "Senior Associate at Cognizant",
  location: "Bengaluru, Karnataka, India",
  email: "bkshaw1994@gmail.com",
  phone: "+91-9876543210",
  bio: "Experienced Senior Associate with 9+ years in full-stack development",
  summary:
    "Experienced Senior Associate with 9+ years in full-stack development, specializing in MERN stack, cloud technologies, and scalable web applications. Proven track record of leading technical initiatives and mentoring development teams.",
  socialLinks: {
    github: "https://github.com/bkshaw1994",
    linkedin: "https://www.linkedin.com/in/bkshaw1994",
    twitter: "",
    portfolio: "https://bishal-portfolio-chi.vercel.app",
    instagram: "",
  },
  yearsOfExperience: 9,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const experienceData = [
  {
    position: "Senior Associate",
    company: "Cognizant",
    location: "Bengaluru, Karnataka, India",
    startDate: new Date("2024-01-01"),
    isCurrent: true,
    description:
      "Working on full-stack web application development using MERN stack with CI/CD and cloud deployment.",
    responsibilities: [
      "Developed full-stack applications using MongoDB, Express.js, React.js, and Node.js",
      "Built and integrated REST APIs for frontend-backend communication",
      "Implemented CI/CD pipelines using GitHub Actions",
      "Deployed applications on AWS",
      "Worked in Agile teams and participated in code reviews",
    ],
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "AWS",
      "GitHub Actions",
    ],
    employmentType: "full-time",
    workMode: "hybrid",
    teamSize: 8,
    reportingTo: "Technical Lead",
    keyProjects: [],
    priority: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    position: "Software Engineer",
    company: "Nowfloats Technologies",
    location: "Bengaluru, Karnataka, India",
    startDate: new Date("2022-10-01"),
    endDate: new Date("2024-01-01"),
    isCurrent: false,
    description:
      "Lead Front-End Developer managing frontend delivery and team coordination.",
    responsibilities: [
      "Led a team of 4 frontend developers",
      "Developed frontend applications using React and Angular",
      "Implemented Redux for state management",
      "Handled production deployments",
      "Collaborated with cross-functional teams",
    ],
    technologies: ["React", "Angular", "Redux", "JavaScript", "HTML", "CSS"],
    employmentType: "full-time",
    workMode: "office",
    teamSize: 4,
    reportingTo: "Engineering Manager",
    keyProjects: [],
    priority: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    position: "Software Engineer",
    company: "Laminaar Aviation Infotech India",
    location: "Bengaluru, Karnataka, India",
    startDate: new Date("2022-08-01"),
    endDate: new Date("2022-10-01"),
    isCurrent: false,
    description: "Front-End Developer working on aviation web applications.",
    responsibilities: [
      "Developed a flight status tracker using React.js",
      "Used Context API for state management",
      "Built interactive UI components",
      "Designed responsive layouts using HTML5 and CSS3",
    ],
    technologies: ["React", "Context API", "JavaScript", "HTML5", "CSS3"],
    employmentType: "full-time",
    workMode: "office",
    teamSize: 6,
    reportingTo: "Project Lead",
    keyProjects: [],
    priority: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    position: "Front End Developer",
    company: "Nityo Infotech",
    location: "Bengaluru, Karnataka, India",
    startDate: new Date("2021-04-01"),
    endDate: new Date("2022-08-01"),
    isCurrent: false,
    description:
      "Front-End Developer working for Laminaar Aviation Infotech (Client).",
    responsibilities: [
      "Developed frontend features using React.js",
      "Implemented reusable UI components",
      "Used Context API for state management",
      "Built responsive UI using HTML5 and CSS3",
    ],
    technologies: ["React", "Context API", "JavaScript", "HTML5", "CSS3"],
    employmentType: "full-time",
    workMode: "client-site",
    teamSize: 5,
    reportingTo: "Client Project Manager",
    keyProjects: [],
    priority: 4,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    position: "Content Programmer",
    company: "ANSR Source",
    location: "India",
    startDate: new Date("2017-07-01"),
    endDate: new Date("2021-04-01"),
    isCurrent: false,
    description: "Worked on frontend development for an online test portal.",
    responsibilities: [
      "Developed interactive features using JavaScript",
      "Created web pages using HTML5",
      "Designed layouts using CSS3",
    ],
    technologies: ["JavaScript", "HTML5", "CSS3"],
    employmentType: "full-time",
    workMode: "office",
    teamSize: 3,
    reportingTo: "Team Lead",
    keyProjects: [],
    priority: 5,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    position: "Trainee Engineer",
    company: "Safran Engineering Services",
    location: "India",
    startDate: new Date("2016-12-01"),
    endDate: new Date("2017-05-01"),
    isCurrent: false,
    description: "MATLAB Developer working on electronic circuit design.",
    responsibilities: [
      "Designed electronic circuits using MATLAB",
      "Performed simulations and analysis",
      "Supported senior engineers with documentation",
    ],
    technologies: ["MATLAB"],
    employmentType: "full-time",
    workMode: "office",
    teamSize: 4,
    reportingTo: "Senior Engineer",
    keyProjects: [],
    priority: 6,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const skillsData = [
  {
    name: "React",
    category: "frontend",
    proficiency: 95,
    description: "Advanced React.js development",
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
    description: "Server-side JavaScript",
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
    description: "NoSQL database design",
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
    description: "Modern JavaScript ES6+",
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
    description: "Typed JavaScript",
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
    description: "Cloud infrastructure",
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
    description: "Containerization",
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
    description: "Web framework for Node.js",
    yearsOfExperience: 5,
    icon: "express",
    priority: 1,
    isCore: true,
    isActive: true,
  },
].map((skill) => ({ ...skill, createdAt: new Date(), updatedAt: new Date() }));

const projectsData = [
  {
    title: "E-Commerce Platform",
    shortDescription: "Full-stack e-commerce solution with modern features",
    description:
      "A comprehensive e-commerce platform built with MERN stack featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard.",
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
      visitors: 0,
      downloads: 0,
      stars: 0,
    },
  },
  {
    title: "Task Management System",
    shortDescription: "Collaborative project management tool",
    description:
      "A collaborative task management system similar to Trello, built with React and Node.js. Features include drag-and-drop functionality, real-time updates, and team collaboration.",
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
      visitors: 0,
      downloads: 0,
      stars: 0,
    },
  },
  {
    title: "Weather Dashboard",
    shortDescription: "Real-time weather monitoring application",
    description:
      "A comprehensive weather dashboard that provides current weather conditions, forecasts, and weather maps.",
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
      visitors: 0,
      downloads: 0,
      stars: 0,
    },
  },
].map((project) => ({
  ...project,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

async function uploadData() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("✓ Connected!\n");

    const db = client.db("test");

    // Upload Profile
    console.log("Uploading profile...");
    await db
      .collection("profiles")
      .updateOne({}, { $set: profileData }, { upsert: true });
    console.log("✓ Profile saved");

    // Upload Experiences
    console.log("Uploading experiences...");
    for (const experience of experienceData) {
      await db
        .collection("experiences")
        .updateOne(
          { position: experience.position, company: experience.company },
          { $set: experience },
          { upsert: true },
        );
      console.log(`  ✓ ${experience.position} at ${experience.company}`);
    }

    // Upload Skills
    console.log("Uploading skills...");
    for (const skill of skillsData) {
      await db
        .collection("skills")
        .updateOne({ name: skill.name }, { $set: skill }, { upsert: true });
      console.log(`  ✓ ${skill.name}`);
    }

    // Upload Projects
    console.log("\nUploading projects...");
    for (const project of projectsData) {
      await db
        .collection("projects")
        .updateOne(
          { title: project.title },
          { $set: project },
          { upsert: true },
        );
      console.log(`  ✓ ${project.title}`);
    }

    console.log("\n✅ All data uploaded successfully!");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  } finally {
    await client.close();
    process.exit(0);
  }
}

uploadData();
