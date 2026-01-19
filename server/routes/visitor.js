const express = require('express');
const router = express.Router();
const {
  getVisitorCount,
  incrementVisitorCount
} = require('../controllers/visitorController');

// GET /api/visitor - Get visitor count
router.get('/', getVisitorCount);

// POST /api/visitor - Increment visitor count
router.post('/', incrementVisitorCount);

module.exports = router;
