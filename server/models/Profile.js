const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String, // URL to profile image
      default: "",
    },
    profileImageData: {
      data: Buffer,
      contentType: String,
    },
    resume: {
      type: String, // URL to resume file
      default: "",
    },
    resumeData: {
      data: Buffer,
      contentType: String,
      filename: String,
    },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      portfolio: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    yearsOfExperience: {
      type: Number,
      default: 9,
    },
    summary: {
      type: String,
      required: true,
    },
    aboutParagraphs: {
      type: [String],
      default: [],
    },
    statistics: {
      yearsExperience: { type: Number, default: 8 },
      projectsCompleted: { type: Number, default: 50 },
      technologiesMastered: { type: Number, default: 20 },
    },
    competencies: {
      type: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
      default: [],
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

module.exports = mongoose.model("Profile", profileSchema);
