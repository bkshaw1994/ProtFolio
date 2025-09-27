const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true,
    maxLength: 150
  },
  technologies: [{
    type: String,
    required: true
  }],
  features: [{
    type: String,
    required: true
  }],
  images: [{
    type: String, // URLs to project images
    required: true
  }],
  liveUrl: {
    type: String,
    trim: true
  },
  githubUrl: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'desktop', 'api', 'fullstack']
  },
  status: {
    type: String,
    required: true,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  priority: {
    type: Number,
    default: 0 // Higher numbers = higher priority
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  client: {
    type: String,
    default: 'Personal Project'
  },
  role: {
    type: String,
    required: true
  },
  teamSize: {
    type: Number,
    default: 1
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metrics: {
    visitors: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    stars: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Index for better query performance
projectSchema.index({ category: 1, priority: -1 });
projectSchema.index({ isFeatured: -1, priority: -1 });

module.exports = mongoose.model('Project', projectSchema);
