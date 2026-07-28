const express = require('express');
const { body } = require('express-validator');
const {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectCategories
} = require('../controllers/projectController');

const router = express.Router();

// Validation middleware for projects
const projectValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 50, max: 2000 })
    .withMessage('Description must be between 50 and 2000 characters'),
  body('shortDescription')
    .trim()
    .notEmpty()
    .withMessage('Short description is required')
    .isLength({ min: 20, max: 150 })
    .withMessage('Short description must be between 20 and 150 characters'),
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology is required'),
  body('technologies.*')
    .trim()
    .notEmpty()
    .withMessage('Technology name cannot be empty'),
  body('features')
    .isArray({ min: 1 })
    .withMessage('At least one feature is required'),
  body('features.*')
    .trim()
    .notEmpty()
    .withMessage('Feature description cannot be empty'),
  body('images')
    .isArray({ min: 1 })
    .withMessage('At least one image is required'),
  body('images.*')
    .isURL()
    .withMessage('Each image must be a valid URL'),
  body('category')
    .isIn(['web', 'mobile', 'desktop', 'api', 'fullstack'])
    .withMessage('Category must be one of: web, mobile, desktop, api, fullstack'),
  body('status')
    .optional()
    .isIn(['completed', 'in-progress', 'planned'])
    .withMessage('Status must be one of: completed, in-progress, planned'),
  body('startDate')
    .isISO8601()
    .toDate()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('End date must be a valid date'),
  body('liveUrl')
    .optional()
    .isURL()
    .withMessage('Live URL must be valid'),
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be valid'),
  body('role')
    .trim()
    .notEmpty()
    .withMessage('Role is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Role must be between 3 and 50 characters'),
  body('teamSize')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Team size must be between 1 and 100'),
  body('priority')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Priority must be a non-negative integer'),
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('Featured flag must be boolean')
];

// @route   GET /api/projects
// @desc    Get all projects with filtering and pagination
// @access  Public
router.get('/', getAllProjects);

// @route   GET /api/projects/featured
// @desc    Get featured projects
// @access  Public
router.get('/featured', getFeaturedProjects);

// @route   GET /api/projects/categories
// @desc    Get project categories with counts
// @access  Public
router.get('/categories', getProjectCategories);

// @route   GET /api/projects/:id
// @desc    Get single project by ID
// @access  Public
router.get('/:id', getProjectById);

// @route   POST /api/projects
// @desc    Create new project
// @access  Private (Admin)
// Note: Add authentication middleware here when implementing admin panel
router.post('/', projectValidation, createProject);

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (Admin)
// Note: Add authentication middleware here when implementing admin panel
router.put('/:id', projectValidation, updateProject);

// @route   DELETE /api/projects/:id
// @desc    Soft delete project (set isActive to false)
// @access  Private (Admin)
// Note: Add authentication middleware here when implementing admin panel
router.delete('/:id', deleteProject);

module.exports = router;
