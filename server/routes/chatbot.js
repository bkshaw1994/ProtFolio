const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { handleMessage, getSuggestions } = require('../controllers/chatbotController');

// Dedicated rate limiter for chatbot endpoint to prevent spam/abuse
const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: process.env.NODE_ENV === 'production' ? 30 : 200, // max 30 messages per min in prod
  message: {
    success: false,
    message: 'Too many messages sent. Please pause for a moment before sending another message.'
  }
});

// @route   POST /api/chatbot/message
// @desc    Process chatbot message
router.post('/message', chatLimiter, handleMessage);

// @route   GET /api/chatbot/suggested-questions
// @desc    Get suggested questions
router.get('/suggested-questions', getSuggestions);

module.exports = router;
