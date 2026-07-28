const express = require('express');
const { body } = require('express-validator');
const {
  submitContactForm,
  getAllContacts,
  getContactById,
  updateContact,
  getContactStats
} = require('../controllers/contactController');

const router = express.Router();

// Validation middleware for contact form
const contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Subject must be between 5 and 100 characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 20, max: 1000 })
    .withMessage('Message must be between 20 and 1000 characters'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name must be less than 100 characters'),
  body('projectType')
    .optional()
    .isIn([
      'web-development',
      'mobile-app',
      'consultation',
      'freelance',
      'full-time',
      'other'
    ])
    .withMessage('Invalid project type'),
  body('budget')
    .optional()
    .custom((value) => {
      if (value === '' || value === null || value === undefined) {
        return true;
      }
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        throw new Error('Budget must be a valid number');
      }
      if (numValue < 0) {
        throw new Error('Budget cannot be negative');
      }
      if (numValue > 100000000) {
        throw new Error('Budget value is too large');
      }
      return true;
    }),
  body('currency')
    .optional()
    .isIn([
      'INR',
      'USD',
      'EUR',
      'GBP',
      'AUD',
      'CAD',
      'JPY',
      'CNY',
      'CHF',
      'SGD'
    ])
    .withMessage('Invalid currency code'),
  body('timeline')
    .optional()
    .isIn([
      'asap',
      '1-month',
      '2-3-months',
      '3-6-months',
      '6-months+',
      'flexible'
    ])
    .withMessage('Invalid timeline')
];

// Rate limiting specifically for contact form (stricter)
const contactRateLimit = require('express-rate-limit')({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 contact form submissions per windowMs
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', contactRateLimit, contactValidation, submitContactForm);

// @route   GET /api/contact
// @desc    Get all contact messages (admin only)
// @access  Private (Admin)
// Note: Add authentication middleware here when implementing admin panel
router.get('/', getAllContacts);

// @route   GET /api/contact/stats
// @desc    Get contact statistics (admin only)
// @access  Private (Admin)
// Note: Add authentication middleware here when implementing admin panel
router.get('/stats', getContactStats);

// @route   GET /api/contact/:id
// @desc    Get contact by ID (admin only)
// @access  Private (Admin)
// Note: Add authentication middleware here when implementing admin panel
router.get('/:id', getContactById);

// @route   PUT /api/contact/:id
// @desc    Update contact status/notes (admin only)
// @access  Private (Admin)
// Note: Add authentication middleware here when implementing admin panel
router.put(
  '/:id',
  [
    body('status')
      .optional()
      .isIn(['new', 'read', 'replied', 'closed'])
      .withMessage('Invalid status'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high', 'urgent'])
      .withMessage('Invalid priority'),
    body('notes')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Notes must be less than 1000 characters'),
    body('reply')
      .optional()
      .trim()
      .isLength({ max: 2000 })
      .withMessage('Reply must be less than 2000 characters')
  ],
  updateContact
);

module.exports = router;
