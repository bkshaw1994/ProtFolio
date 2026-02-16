const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Certification = require('../models/Certification');

const certificationData = [
  {
    title: 'Six Sigma White Belt Certification',
    issuer: 'AIGPE (Advanced Innovation Group Pro Excellence)',
    issueDate: '15th Feb, 2026',
    description: 'The AIGPE™ Certified Six Sigma White Belt is a professional who has an initial understanding of Six Sigma, Lean, and Kaizen. The professional illustrates the ability to use the Seven Basic Tools of Quality such as the SIPOC, Pareto Analysis, Fishbone Diagram, the 5 Why Analysis, Check Sheets, Histogram, and Run Chart.',
    credentialDescription: 'Each certification candidate must 1) go through the AIGPE™ Six Sigma White Belt Certification Training and 2) pass an examination that consists of multiple choice questions and measures comprehension of the Body of Knowledge.',
    badge: 'https://storage.googleapis.com/verified-storage/badge/28138923956681.png',
    verificationUrl: 'https://digitalcredentials.aigproexcellence.com/en/verify/28138923956681',
    learningObjectives: [
      'Describe the importance of Quality and its history',
      'Define the term Six Sigma, Recognize the different Six Sigma Roles, and Illustrate the difference between 99% and Six Sigma levels of Quality',
      'Outline the Six Sigma DMAIC Model',
      'Describe each of the Seven Basic Tools of Quality and construct these tools using Excel or PowerPoint',
      'Define Lean and Kaizen'
    ],
    skills: [
      'Six Sigma Roles',
      'Six Sigma Methodology',
      'Seven Basic Tools of Quality',
      'SIPOC',
      'Run Chart',
      'Quality Assurance',
      'Pareto Analysis',
      'Fishbone Diagram',
      '5 Why Analysis',
      'Check Sheets',
      'Histogram',
      'Lean Six Sigma',
      'Kaizen Overview',
      'Lean Overview',
      'History of Quality',
      'Define Measure Analyze Improve Control (DMAIC)'
    ],
    featured: true,
    order: 0,
    isActive: true
  }
];

const seedCertifications = async () => {
  try {
    // Check if MONGODB_URI is set
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set!');
      console.log('Please set MONGODB_URI in your .env file');
      process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    console.log('🧹 Clearing existing certifications...');
    await Certification.deleteMany({});
    console.log('✅ Cleared existing certifications');

    console.log('📝 Seeding certifications...');
    const insertedCertifications = await Certification.insertMany(certificationData);
    console.log(
      `✅ Successfully seeded ${insertedCertifications.length} certification(s)`
    );

    console.log('\n📋 Seeded Certifications:');
    insertedCertifications.forEach((cert, index) => {
      console.log(`${index + 1}. ${cert.title}`);
      console.log(`   Issuer: ${cert.issuer}`);
      console.log(`   Featured: ${cert.featured}`);
      console.log(`   Active: ${cert.isActive}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

seedCertifications();
