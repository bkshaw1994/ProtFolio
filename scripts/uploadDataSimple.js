#!/usr/bin/env node

// CRITICAL: Configure Mongoose FIRST, before any other requires
const mongoose = require('mongoose');
mongoose.set('bufferTimeoutMS', 90000); // 90 seconds

const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../server/.env') });

const profileData = {
  name: "Bishal Kumar Shaw",
  title: "Senior Associate at Cognizant",
  location: "Bengaluru, Karnataka, India",
  email: "bkshaw1994@gmail.com",
  phone: "+91-9876543210",
  bio: "Experienced Senior Associate with 9+ years in full-stack development",
  summary: "Experienced Senior Associate with 9+ years in full-stack development, specializing in MERN stack, cloud technologies, and scalable web applications. Proven track record of leading technical initiatives and mentoring development teams.",
  socialLinks: {
    github: "https://github.com/bkshaw1994",
    linkedin: "https://www.linkedin.com/in/bkshaw1994"
  },
  yearsOfExperience: 9,
  isActive: true
};

const experienceData = {
  position: "Senior Associate",
  company: "Cognizant",
  location: "Bengaluru, Karnataka, India",
  startDate: new Date("2024-01-01"),
  isCurrent: true,
  description: "Working as a Senior Associate focusing on web development and cloud technologies",
  responsibilities: [
    "Developing full-stack web applications using MERN stack",
    "Leading technical initiatives and mentoring junior developers",
    "Implementing cloud-based solutions and microservices"
  ],
  technologies: ["React", "Node.js", "MongoDB", "Express", "AWS"],
  employmentType: "full-time",
  workMode: "hybrid",
  teamSize: 8,
  isActive: true
};

const skillsData = [
  { name: "React", category: "frontend", proficiency: 95, yearsOfExperience: 5, icon: "react", priority: 1, isCore: true, isActive: true },
  { name: "Node.js", category: "backend", proficiency: 90, yearsOfExperience: 6, icon: "nodejs", priority: 1, isCore: true, isActive: true },
  { name: "MongoDB", category: "database", proficiency: 85, yearsOfExperience: 4, icon: "mongodb", priority: 1, isCore: true, isActive: true },
  { name: "JavaScript", category: "frontend", proficiency: 95, yearsOfExperience: 7, icon: "javascript", priority: 1, isCore: true, isActive: true },
  { name: "TypeScript", category: "frontend", proficiency: 80, yearsOfExperience: 3, icon: "typescript", priority: 2, isCore: true, isActive: true },
  { name: "AWS", category: "devops", proficiency: 75, yearsOfExperience: 3, icon: "aws", priority: 2, isCore: true, isActive: true },
  { name: "Express.js", category: "backend", proficiency: 90, yearsOfExperience: 5, icon: "express", priority: 1, isCore: true, isActive: true }
];

const projectsData = [
  {
    title: "E-Commerce Platform",
    shortDescription: "Full-stack e-commerce solution",
    description: "A comprehensive e-commerce platform built with MERN stack",
    technologies: ["React", "Node.js", "MongoDB", "Express.js"],
    category: "fullstack",
    isFeatured: true,
    status: "completed",
    priority: 1,
    role: "Full Stack Developer",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-06-01"),
    githubUrl: "https://github.com/bkshaw1994/ecommerce-platform",
    isActive: true
  },
  {
    title: "Task Management System",
    shortDescription: "Collaborative project management tool",
    description: "A collaborative task management system built with React and Node.js",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    category: "fullstack",
    isFeatured: true,
    status: "completed",
    priority: 2,
    role: "Lead Developer",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-03-15"),
    githubUrl: "https://github.com/bkshaw1994/task-management",
    isActive: true
  }
];

// Now import models AFTER mongoose configuration
const Profile = require('../server/models/Profile');
const Experience = require('../server/models/Experience');
const Skill = require('../server/models/Skill');
const Project = require('../server/models/Project');

async function uploadData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    
    // Wait for indexes to be built
    console.log('Building indexes...');
    await Promise.all([
      Profile.init(),
      Experience.init(),
      Skill.init(),
      Project.init()
    ]);
    
    console.log('✓ MongoDB connected and ready!\n');

    // Upload Profile
    console.log('Uploading profile...');
    const profile = await Profile.findOneAndUpdate({}, profileData, { 
      upsert: true, 
      new: true,
      setDefaultsOnInsert: true
    });
    console.log('✓ Profile saved\n');

    // Upload Experience
    console.log('Uploading experience...');
    await Experience.findOneAndUpdate(
      { position: experienceData.position, company: experienceData.company },
      experienceData,
      { upsert: true, new: true }
    );
    console.log('✓ Experience saved\n');

    // Upload Skills
    console.log('Uploading skills...');
    for (const skill of skillsData) {
      await Skill.findOneAndUpdate(
        { name: skill.name },
        skill,
        { upsert: true, new: true }
      );
      console.log(`  ✓ ${skill.name}`);
    }
    console.log('');

    // Upload Projects
    console.log('Uploading projects...');
    for (const project of projectsData) {
      await Project.findOneAndUpdate(
        { title: project.title },
        project,
        { upsert: true, new: true }
      );
      console.log(`  ✓ ${project.title}`);
    }

    console.log('\n✅ All data uploaded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

uploadData();
