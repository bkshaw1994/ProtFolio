const express = require('express');
const router = express.Router();

// Import all models for admin operations
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Contact = require('../models/Contact');

// @route   GET /api/admin/dashboard
// @desc    Get dashboard statistics
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    const stats = await Promise.all([
      Project.countDocuments({ isActive: true }),
      Skill.countDocuments({ isActive: true }),
      Experience.countDocuments({ isActive: true }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Contact.countDocuments({ isRead: false })
    ]);

    const [
      totalProjects,
      totalSkills,
      totalExperience,
      totalContacts,
      newContacts,
      unreadContacts
    ] = stats;

    // Get recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject createdAt status priority');

    // Get featured projects count
    const featuredProjects = await Project.countDocuments({
      isActive: true,
      isFeatured: true
    });

    // Get contact stats by month
    const monthlyContacts = await Contact.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 6 }
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalProjects,
          totalSkills,
          totalExperience,
          totalContacts,
          newContacts,
          unreadContacts,
          featuredProjects
        },
        recentContacts,
        monthlyContacts
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard statistics'
    });
  }
};

// @route   GET /api/admin/backup
// @desc    Get all data for backup
// @access  Private (Admin)
const getBackupData = async (req, res) => {
  try {
    const [profile, projects, skills, experiences, contacts] = await Promise.all([
      Profile.find(),
      Project.find(),
      Skill.find(),
      Experience.find(),
      Contact.find().select('-ipAddress -userAgent') // Exclude sensitive data
    ]);

    res.json({
      success: true,
      data: {
        profile,
        projects,
        skills,
        experiences,
        contacts,
        exportDate: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error creating backup:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating backup'
    });
  }
};

router.get('/dashboard', getDashboardStats);
router.get('/backup', getBackupData);

module.exports = router;
