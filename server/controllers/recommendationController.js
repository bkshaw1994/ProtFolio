const Recommendation = require('../models/Recommendation');

// @desc    Get all active recommendations
// @route   GET /api/recommendations
// @access  Public
const getAllRecommendations = async (req, res) => {
  try {
    const { featured } = req.query;
    const filter = { isActive: true };

    if (featured !== undefined) {
      filter.featured = featured === 'true';
    }

    const recommendations = await Recommendation.find(filter)
      .sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching recommendations'
    });
  }
};

// @desc    Get single recommendation by ID
// @route   GET /api/recommendations/:id
// @access  Public
const getRecommendationById = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommendation not found'
      });
    }

    res.json({
      success: true,
      data: recommendation
    });
  } catch (error) {
    console.error('Error fetching recommendation:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create a new recommendation
// @route   POST /api/recommendations
// @access  Private (Admin)
const createRecommendation = async (req, res) => {
  try {
    const recommendation = new Recommendation(req.body);
    await recommendation.save();

    res.status(201).json({
      success: true,
      data: recommendation,
      message: 'Recommendation created successfully'
    });
  } catch (error) {
    console.error('Error creating recommendation:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating recommendation'
    });
  }
};

// @desc    Update recommendation
// @route   PUT /api/recommendations/:id
// @access  Private (Admin)
const updateRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommendation not found'
      });
    }

    res.json({
      success: true,
      data: recommendation,
      message: 'Recommendation updated successfully'
    });
  } catch (error) {
    console.error('Error updating recommendation:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating recommendation'
    });
  }
};

// @desc    Delete recommendation
// @route   DELETE /api/recommendations/:id
// @access  Private (Admin)
const deleteRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findByIdAndDelete(req.params.id);

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommendation not found'
      });
    }

    res.json({
      success: true,
      message: 'Recommendation deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting recommendation:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting recommendation'
    });
  }
};

module.exports = {
  getAllRecommendations,
  getRecommendationById,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation
};
