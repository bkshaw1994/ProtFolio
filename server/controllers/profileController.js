const Profile = require('../models/Profile');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

// @desc    Get profile information
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ isActive: true });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
};

// @desc    Create or update profile
// @route   POST/PUT /api/profile
// @access  Private (Admin)
const createOrUpdateProfile = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const {
      name,
      title,
      bio,
      email,
      phone,
      location,
      profileImage,
      resume,
      socialLinks,
      yearsOfExperience,
      summary
    } = req.body;

    // Check if profile exists
    let profile = await Profile.findOne();

    if (profile) {
      // Update existing profile
      profile = await Profile.findByIdAndUpdate(
        profile._id,
        {
          name,
          title,
          bio,
          email,
          phone,
          location,
          profileImage,
          resume,
          socialLinks,
          yearsOfExperience,
          summary
        },
        { new: true, runValidators: true }
      );
    } else {
      // Create new profile
      profile = new Profile({
        name,
        title,
        bio,
        email,
        phone,
        location,
        profileImage,
        resume,
        socialLinks,
        yearsOfExperience,
        summary
      });

      await profile.save();
    }

    res.json({
      success: true,
      message: profile.isNew ? 'Profile created successfully' : 'Profile updated successfully',
      data: profile
    });
  } catch (error) {
    console.error('Error creating/updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing profile'
    });
  }
};

// @desc    Get profile summary (minimal info for header/footer)
// @route   GET /api/profile/summary
// @access  Public
const getProfileSummary = async (req, res) => {
  try {
    const profile = await Profile.findOne({ isActive: true })
      .select('name title email socialLinks profileImage location');
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile summary not found'
      });
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Error fetching profile summary:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile summary'
    });
  }
};

// @desc    Upload profile image
// @route   POST /api/profile/upload/image
// @access  Private (Admin)
const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Get or create profile
    let profile = await Profile.findOne();
    
    // Delete old profile image if it exists
    if (profile && profile.profileImage) {
      const oldImagePath = path.join(__dirname, '..', profile.profileImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Construct file URL
    const fileUrl = `/uploads/images/${req.file.filename}`;

    if (profile) {
      // Update existing profile
      profile.profileImage = fileUrl;
      await profile.save();
    } else {
      // Create new profile with image only
      profile = new Profile({
        name: 'Your Name',
        title: 'Your Title',
        profileImage: fileUrl
      });
      await profile.save();
    }

    res.json({
      success: true,
      message: 'Profile image uploaded successfully',
      data: {
        profileImage: fileUrl,
        filename: req.file.filename
      }
    });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    // Delete uploaded file if there was an error
    if (req.file) {
      const filePath = path.join(__dirname, '..', 'uploads/images', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.status(500).json({
      success: false,
      message: 'Server error while uploading image'
    });
  }
};

// @desc    Upload resume
// @route   POST /api/profile/upload/resume
// @access  Private (Admin)
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Get or create profile
    let profile = await Profile.findOne();
    
    // Delete old resume if it exists
    if (profile && profile.resume) {
      const oldResumePath = path.join(__dirname, '..', profile.resume);
      if (fs.existsSync(oldResumePath)) {
        fs.unlinkSync(oldResumePath);
      }
    }

    // Construct file URL
    const fileUrl = `/uploads/resumes/${req.file.filename}`;

    if (profile) {
      // Update existing profile
      profile.resume = fileUrl;
      await profile.save();
    } else {
      // Create new profile with resume only
      profile = new Profile({
        name: 'Your Name',
        title: 'Your Title',
        resume: fileUrl
      });
      await profile.save();
    }

    res.json({
      success: true,
      message: 'Resume uploaded successfully',
      data: {
        resume: fileUrl,
        filename: req.file.filename
      }
    });
  } catch (error) {
    console.error('Error uploading resume:', error);
    // Delete uploaded file if there was an error
    if (req.file) {
      const filePath = path.join(__dirname, '..', 'uploads/resumes', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.status(500).json({
      success: false,
      message: 'Server error while uploading resume'
    });
  }
};

// @desc    Delete uploaded file (image or resume)
// @route   DELETE /api/profile/file/:type
// @access  Private (Admin)
const deleteFile = async (req, res) => {
  try {
    const { type } = req.params;
    
    if (!['image', 'resume'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type. Must be "image" or "resume"'
      });
    }

    const profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const fieldName = type === 'image' ? 'profileImage' : 'resume';
    const filePath = profile[fieldName];

    if (!filePath) {
      return res.status(404).json({
        success: false,
        message: `No ${type} found to delete`
      });
    }

    // Delete file from filesystem
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }

    // Update profile
    profile[fieldName] = '';
    await profile.save();

    res.json({
      success: true,
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`
    });
  } catch (error) {
    console.error(`Error deleting file:`, error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting file'
    });
  }
};

module.exports = {
  getProfile,
  createOrUpdateProfile,
  getProfileSummary,
  uploadProfileImage,
  uploadResume,
  deleteFile
};
