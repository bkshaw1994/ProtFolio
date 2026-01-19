const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date // null for current position
    },
    isCurrent: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: true
    },
    responsibilities: [
      {
        type: String,
        required: true
      }
    ],
    achievements: [
      {
        type: String
      }
    ],
    technologies: [
      {
        type: String,
        required: true
      }
    ],
    companyLogo: {
      type: String, // URL to company logo
      default: ''
    },
    companyWebsite: {
      type: String,
      default: ''
    },
    employmentType: {
      type: String,
      required: true,
      enum: ['full-time', 'part-time', 'contract', 'freelance', 'internship']
    },
    workMode: {
      type: String,
      required: true,
      enum: ['remote', 'on-site', 'hybrid']
    },
    teamSize: {
      type: Number,
      default: 1
    },
    reportingTo: {
      type: String,
      default: ''
    },
    keyProjects: [
      {
        name: String,
        description: String,
        technologies: [String],
        impact: String
      }
    ],
    priority: {
      type: Number,
      default: 0 // Higher numbers shown first
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    bufferTimeoutMS: 60000
  }
);

// Index for chronological sorting
experienceSchema.index({ startDate: -1, priority: -1 });

module.exports = mongoose.model('Experience', experienceSchema);
