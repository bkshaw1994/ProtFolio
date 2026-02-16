const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    issuer: {
      type: String,
      required: true,
      trim: true
    },
    issueDate: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    credentialDescription: {
      type: String,
      trim: true
    },
    badge: {
      type: String,
      trim: true
    },
    verificationUrl: {
      type: String,
      trim: true
    },
    skills: {
      type: [String],
      default: []
    },
    learningObjectives: {
      type: [String],
      default: []
    },
    featured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Certification', certificationSchema);
