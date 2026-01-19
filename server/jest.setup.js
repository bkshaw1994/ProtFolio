// Jest setup file for server tests
const mongoose = require('mongoose');

// Increase timeout for async operations
jest.setTimeout(30000);

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to hide console.log during tests
  // log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

// Global test utilities
global.testUtils = {
  // Helper to create test user data
  createTestUser: () => ({
    name: 'Test User',
    email: 'test@example.com',
    bio: 'Test bio',
    location: 'Test Location'
  }),

  // Helper to create test project data
  createTestProject: () => ({
    title: 'Test Project',
    description: 'Test project description',
    technologies: ['JavaScript', 'Node.js'],
    githubUrl: 'https://github.com/test/project',
    liveUrl: 'https://test-project.com',
    featured: false
  }),

  // Helper to create test skill data
  createTestSkill: () => ({
    name: 'JavaScript',
    category: 'Programming Languages',
    proficiency: 85,
    icon: 'javascript'
  }),

  // Helper to create test experience data
  createTestExperience: () => ({
    company: 'Test Company',
    position: 'Software Developer',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31'),
    description: 'Test experience description',
    technologies: ['JavaScript', 'React']
  })
};

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.MONGODB_URI = 'mongodb://localhost:27017/portfolio-test';

// Suppress MongoDB deprecation warnings in tests
mongoose.set('strictQuery', false);
