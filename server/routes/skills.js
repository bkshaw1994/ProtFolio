const express = require('express');
const Skill = require('../models/Skill');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// @route   GET /api/skills
// @desc    Get all skills grouped by category
// @access  Public
const getAllSkills = async (req, res) => {
  try {
    const { category, limit } = req.query;

    const filter = { isActive: true };
    if (category) filter.category = category;

    const skills = await Skill.find(filter)
      .sort({ category: 1, priority: -1, proficiency: -1 })
      .limit(limit ? parseInt(limit) : 0)
      .populate('projects', 'title _id')
      .select('-__v');

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.json({
      success: true,
      data: groupedSkills,
      totalSkills: skills.length
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching skills'
    });
  }
};

// @route   GET /api/skills/core
// @desc    Get core skills
// @access  Public
const getCoreSkills = async (req, res) => {
  try {
    const skills = await Skill.find({
      isActive: true,
      isCore: true
    })
      .sort({ proficiency: -1, priority: -1 })
      .select('name proficiency category icon yearsOfExperience -_id');

    res.json({
      success: true,
      data: skills
    });
  } catch (error) {
    console.error('Error fetching core skills:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching core skills'
    });
  }
};

router.get('/', getAllSkills);
router.get('/core', getCoreSkills);

module.exports = router;
