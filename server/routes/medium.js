const express = require('express');
const router = express.Router();
const { fetchMediumPosts, getMediumUsername } = require('../services/mediumService');

/**
 * @route   GET /api/medium/posts
 * @desc    Fetch latest Medium blog posts
 * @access  Public
 */
router.get('/posts', async (req, res) => {
  try {
    const posts = await fetchMediumPosts();
    const username = await getMediumUsername();

    res.json({
      success: true,
      username,
      profileUrl: `https://medium.com/@${username}`,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error('Error in /api/medium/posts route:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching Medium posts'
    });
  }
});

module.exports = router;
