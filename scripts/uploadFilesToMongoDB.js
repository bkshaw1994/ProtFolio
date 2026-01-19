const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
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
    profileImageData: {
      data: Buffer,
      contentType: String,
    },
    resume: String,
    resumeData: {
      data: Buffer,
      contentType: String,
      filename: String,
    },
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

    console.log("\n📤 Reading and uploading files to MongoDB...\n");

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

    // Upload Profile Image
    if (fs.existsSync(profileImagePath)) {
      console.log("✅ Reading Profile.jpg...");
      const imageData = fs.readFileSync(profileImagePath);

      profile.profileImageData = {
        data: imageData,
        contentType: "image/jpeg",
      };
      profile.profileImage = "/api/profile/image"; // Update to use API endpoint

      console.log(
        `✅ Profile image uploaded (${(imageData.length / 1024).toFixed(2)} KB)`,
      );
    } else {
      console.log("❌ Profile.jpg not found");
    }

    // Upload Resume
    if (fs.existsSync(resumePath)) {
      console.log("✅ Reading Bishal_MERN.pdf...");
      const resumeData = fs.readFileSync(resumePath);

      profile.resumeData = {
        data: resumeData,
        contentType: "application/pdf",
        filename: "Bishal_MERN.pdf",
      };
      profile.resume = "/api/profile/resume"; // Update to use API endpoint

      console.log(
        `✅ Resume uploaded (${(resumeData.length / 1024).toFixed(2)} KB)`,
      );
    } else {
      console.log("❌ Bishal_MERN.pdf not found");
    }

    // Save the profile
    await profile.save();

    console.log("\n✅ Files uploaded to MongoDB successfully!");
    console.log("Profile Image URL:", profile.profileImage);
    console.log("Resume URL:", profile.resume);

    await mongoose.connection.close();
    console.log("\n✅ MongoDB connection closed");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

uploadFiles();
