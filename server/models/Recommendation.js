const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      trim: true
    },
    quote: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
    },
    linkedinUrl: {
      type: String,
      trim: true
    },
    relationship: {
      type: String,
      trim: true
    },
    order: {
      type: Number,
      default: 0
    },
    featured: {
      type: Boolean,
      default: true
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

module.exports = mongoose.model('Recommendation', recommendationSchema);
