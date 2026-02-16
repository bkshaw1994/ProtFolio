const express = require('express');
const Certification = require('../models/Certification');

const router = express.Router();

// @route   GET /api/certifications
// @desc    Get all certifications
// @access  Public
const getAllCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find({ isActive: true })
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      data: certifications,
      totalCertifications: certifications.length
    });
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching certifications'
    });
  }
};

// @route   GET /api/certifications/featured
// @desc    Get featured certifications
// @access  Public
const getFeaturedCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find({
      isActive: true,
      featured: true
    })
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      data: certifications,
      totalCertifications: certifications.length
    });
  } catch (error) {
    console.error('Error fetching featured certifications:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching featured certifications'
    });
  }
};

// @route   GET /api/certifications/:id
// @desc    Get certification by ID
// @access  Public
const getCertificationById = async (req, res) => {
  try {
    const certification = await Certification.findById(req.params.id).select('-__v');

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    res.json({
      success: true,
      data: certification
    });
  } catch (error) {
    console.error('Error fetching certification:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching certification'
    });
  }
};

router.get('/', getAllCertifications);
router.get('/featured', getFeaturedCertifications);
router.get('/:id', getCertificationById);

module.exports = router;
