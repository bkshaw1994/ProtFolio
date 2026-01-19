const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/../server/.env" });

// Define Profile schema (same as in models)
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

const aboutData = {
  aboutParagraphs: [
    "I am a Senior MERN Stack Developer with 8+ years of experience in full-stack web development, specializing in MongoDB, Express.js, React.js, and Node.js. I build scalable, high-performance web applications, develop RESTful APIs, and create responsive, user-friendly interfaces using modern JavaScript frameworks.",
    "My expertise includes backend development with Node.js and Express, database design using MongoDB, frontend development with React and Next.js, and cloud deployment on AWS. I have hands-on experience with CI/CD pipelines using GitHub Actions, version control with Git, and Agile software development practices.",
    "I have worked on enterprise-level applications, collaborated with cross-functional teams, and led developers to deliver secure, optimized, and production-ready solutions. I am passionate about clean code, performance optimization, and building modern web applications that solve real-world business problems.",
  ],
  statistics: {
    yearsExperience: 8,
    projectsCompleted: 50,
    technologiesMastered: 20,
  },
  competencies: [
    {
      title: "Full-Stack Development",
      description: "MERN Stack, RESTful APIs, Microservices Architecture",
    },
    {
      title: "Frontend Excellence",
      description: "React.js, Next.js, Redux, Tailwind CSS",
    },
    {
      title: "Backend & Database",
      description: "Node.js, Express.js, MongoDB, PostgreSQL",
    },
    {
      title: "DevOps & Cloud",
      description: "AWS, CI/CD, GitHub Actions, Docker",
    },
    {
      title: "Best Practices",
      description: "Clean Code, Testing, Security, Performance Optimization",
    },
    {
      title: "Team Leadership",
      description: "Agile/Scrum, Code Reviews, Mentoring Developers",
    },
  ],
  yearsOfExperience: 8,
};

async function updateAboutData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log("Connected to MongoDB");

    // Update the first profile (or create if none exists)
    const result = await Profile.findOneAndUpdate(
      { isActive: true },
      { $set: aboutData },
      {
        new: true,
        upsert: false,
        runValidators: true,
      },
    );

    if (result) {
      console.log("✅ Profile updated successfully!");
      console.log("Updated fields:", Object.keys(aboutData));
      console.log("\nProfile summary:");
      console.log("- Name:", result.name);
      console.log("- Years of Experience:", result.yearsOfExperience);
      console.log("- About Paragraphs:", result.aboutParagraphs?.length || 0);
      console.log("- Competencies:", result.competencies?.length || 0);
      console.log("- Statistics:", result.statistics);
    } else {
      console.log("❌ No active profile found to update");
      console.log(
        "Please ensure you have an active profile in the database first.",
      );
    }

    await mongoose.connection.close();
    console.log("\n✅ MongoDB connection closed");
  } catch (error) {
    console.error("❌ Error updating profile:", error.message);
    process.exit(1);
  }
}

updateAboutData();
