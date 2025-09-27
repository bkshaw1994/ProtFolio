const express = require('express');
const Experience = require('../models/Experience');

const router = express.Router();

// @route   GET /api/experience
// @desc    Get all work experience
// @access  Public
const getAllExperience = async (req, res) => {
  try {
    const experiences = await Experience.find({ isActive: true })
      .sort({ startDate: -1, priority: -1 })
      .select('-__v');

    res.json({
      success: true,
      data: experiences,
      totalExperience: experiences.length
    });
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching experience'
    });
  }
};

// @route   GET /api/experience/current
// @desc    Get current position
// @access  Public
const getCurrentExperience = async (req, res) => {
  try {
    const currentExp = await Experience.findOne({ 
      isActive: true, 
      isCurrent: true 
    })
      .select('company position startDate responsibilities technologies -_id');

    res.json({
      success: true,
      data: currentExp
    });
  } catch (error) {
    console.error('Error fetching current experience:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching current experience'
    });
  }
};

// @route   POST /api/experience
// @desc    Add new work experience
// @access  Public
const addExperience = async (req, res) => {
  try {
    const {
      position,
      company,
      location,
      startDate,
      endDate,
      isCurrent,
      description,
      technologies
    } = req.body;

    const newExperience = new Experience({
      position,
      company,
      location,
      startDate,
      endDate,
      isCurrent,
      description,
      technologies,
      isActive: true
    });

    await newExperience.save();

    res.json({
      success: true,
      message: 'Experience added successfully',
      data: newExperience
    });
  } catch (error) {
    console.error('Error adding experience:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding experience'
    });
  }
};

router.get('/', getAllExperience);
router.get('/current', getCurrentExperience);
router.post('/', addExperience);

module.exports = router;
