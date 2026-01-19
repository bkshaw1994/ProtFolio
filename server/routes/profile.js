const express = require("express");
const { body } = require("express-validator");
const {
  getProfile,
  createOrUpdateProfile,
  getProfileSummary,
  uploadProfileImage,
  uploadResume,
  deleteFile,
  getProfileImage,
  getResume,
} = require("../controllers/profileController");
const {
  uploadProfileImage: uploadImageMiddleware,
  uploadResume: uploadResumeMiddleware,
} = require("../middleware/upload");

const router = express.Router();

// Validation middleware for profile
const profileValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 100 })
    .withMessage("Title must be between 5 and 100 characters"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("bio")
    .trim()
    .notEmpty()
    .withMessage("Bio is required")
    .isLength({ min: 50, max: 500 })
    .withMessage("Bio must be between 50 and 500 characters"),
  body("summary")
    .trim()
    .notEmpty()
    .withMessage("Summary is required")
    .isLength({ min: 100, max: 1000 })
    .withMessage("Summary must be between 100 and 1000 characters"),
  body("yearsOfExperience")
    .isInt({ min: 0, max: 50 })
    .withMessage("Years of experience must be a valid number between 0 and 50"),
  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
  body("socialLinks.github")
    .optional()
    .isURL()
    .withMessage("GitHub URL must be valid"),
  body("socialLinks.linkedin")
    .optional()
    .isURL()
    .withMessage("LinkedIn URL must be valid"),
  body("socialLinks.twitter")
    .optional()
    .isURL()
    .withMessage("Twitter URL must be valid"),
];

// @route   GET /api/profile
// @desc    Get profile information
// @access  Public
router.get("/", getProfile);

// @route   GET /api/profile/summary
// @desc    Get profile summary
// @access  Public
router.get("/summary", getProfileSummary);

// @route   POST /api/profile
// @desc    Create or update profile
// @access  Private (Admin)
// Note: Add authentication middleware here when implementing admin panel
router.post("/", profileValidation, createOrUpdateProfile);

// @route   PUT /api/profile
// @desc    Update profile
// @access  Private (Admin)
// Note: Add authentication middleware here when implementing admin panel
router.put("/", profileValidation, createOrUpdateProfile);

// @route   POST /api/profile/upload/image
// @desc    Upload profile image
// @access  Private (Admin)
router.post("/upload/image", uploadImageMiddleware, uploadProfileImage);

// @route   POST /api/profile/upload/resume
// @desc    Upload resume
// @access  Private (Admin)
router.post("/upload/resume", uploadResumeMiddleware, uploadResume);

// @route   DELETE /api/profile/file/:type
// @desc    Delete uploaded file (image or resume)
// @access  Private (Admin)
router.delete("/file/:type", deleteFile);

// @route   GET /api/profile/image
// @desc    Get profile image from MongoDB
// @access  Public
router.get("/image", getProfileImage);

// @route   GET /api/profile/resume
// @desc    Get resume from MongoDB
// @access  Public
router.get("/resume", getResume);

module.exports = router;
