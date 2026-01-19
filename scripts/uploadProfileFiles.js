const mongoose = require("mongoose");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config({ path: __dirname + "/../server/.env" });

// Define Profile schema
const profileSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    bio: String,
    email: String,
    phone: String,
    location: String,
    profileImage: String,
    resume: String,
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      portfolio: String,
      instagram: String,
    },
    yearsOfExperience: Number,
    summary: String,
    aboutParagraphs: [String],
    statistics: {
      yearsExperience: Number,
      projectsCompleted: Number,
      technologiesMastered: Number,
    },
    competencies: [
      {
        title: String,
        description: String,
      },
    ],
    isActive: Boolean,
  },
  { timestamps: true },
);

const Profile = mongoose.model("Profile", profileSchema);

async function uploadFiles() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log("✅ Connected to MongoDB");

    // Get the active profile
    const profile = await Profile.findOne({ isActive: true });

    if (!profile) {
      console.log("❌ No active profile found");
      process.exit(1);
    }

    console.log("\n📤 Uploading profile files...\n");

    // Paths to files in uploads directory
    const profileImagePath = path.join(
      __dirname,
      "..",
      "server",
      "uploads",
      "images",
      "Profile.jpg",
    );
    const resumePath = path.join(
      __dirname,
      "..",
      "server",
      "uploads",
      "resumes",
      "Bishal_MERN.pdf",
    );

    // Check if files exist
    if (!fs.existsSync(profileImagePath)) {
      console.log("❌ Profile.jpg not found in server/uploads/images");
    } else {
      console.log("✅ Found Profile.jpg");

      // Update profile with image URL
      profile.profileImage = "/uploads/images/Profile.jpg";
      console.log("✅ Profile image path updated in database");
    }

    if (!fs.existsSync(resumePath)) {
      console.log("❌ Bishal_MERN.pdf not found in server/uploads/resumes");
    } else {
      console.log("✅ Found Bishal_MERN.pdf");

      // Update profile with resume URL
      profile.resume = "/uploads/resumes/Bishal_MERN.pdf";
      console.log("✅ Resume path updated in database");
    }

    // Save the profile
    await profile.save();

    console.log("\n✅ Profile updated successfully!");
    console.log("Profile Image:", profile.profileImage);
    console.log("Resume:", profile.resume);

    await mongoose.connection.close();
    console.log("\n✅ MongoDB connection closed");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

uploadFiles();
