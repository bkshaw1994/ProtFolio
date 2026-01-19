const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "frontend",
        "backend",
        "database",
        "devops",
        "mobile",
        "testing",
        "tools",
        "soft-skills",
      ],
    },
    proficiency: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
      min: 0,
    },
    icon: {
      type: String, // Icon name or URL
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    certifications: [
      {
        name: String,
        issuer: String,
        date: Date,
        url: String,
      },
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    isCore: {
      type: Boolean,
      default: false, // Core skills to highlight
    },
    priority: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    bufferTimeoutMS: 60000,
  },
);

// Index for better performance
skillSchema.index({ category: 1, priority: -1 });
skillSchema.index({ isCore: -1, proficiency: -1 });

module.exports = mongoose.model("Skill", skillSchema);
