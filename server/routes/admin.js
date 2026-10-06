const express = require('express');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Import all models for admin operations
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Contact = require('../models/Contact');

// @route   POST /api/admin/login
// @desc    Admin login to obtain JWT token
// @access  Public
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username and password'
      });
    }

    if (username !== adminUser || password !== adminPass) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    const payload = {
      user: {
        id: 'admin',
        role: 'admin'
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'dev_jwt_secret_change_in_production',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      message: 'Admin authenticated successfully'
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

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

router.post('/login', adminLogin);
router.get('/dashboard', protect, getDashboardStats);
router.get('/backup', protect, getBackupData);

module.exports = router;
