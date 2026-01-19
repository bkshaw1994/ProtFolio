const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      trim: true
    },
    company: {
      type: String,
      trim: true
    },
    projectType: {
      type: String,
      enum: [
        'web-development',
        'mobile-app',
        'consultation',
        'freelance',
        'full-time',
        'other'
      ],
      default: 'other'
    },
    budget: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      enum: [
        'INR',
        'USD',
        'EUR',
        'GBP',
        'AUD',
        'CAD',
        'JPY',
        'CNY',
        'CHF',
        'SGD'
      ],
      default: 'INR'
    },
    timeline: {
      type: String,
      enum: [
        'asap',
        '1-month',
        '2-3-months',
        '3-6-months',
        '6-months+',
        'flexible'
      ],
      default: 'flexible'
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'read', 'replied', 'closed'],
      default: 'new'
    },
    isRead: {
      type: Boolean,
      default: false
    },
    reply: {
      type: String,
      default: ''
    },
    repliedAt: {
      type: Date
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    tags: [
      {
        type: String
      }
    ],
    notes: {
      type: String, // Internal notes
      default: ''
    },
    ipAddress: {
      type: String,
      default: ''
    },
    userAgent: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Index for better query performance
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ isRead: 1, priority: 1 });

module.exports = mongoose.model('Contact', contactSchema);
