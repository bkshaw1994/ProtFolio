const express = require('express');
const {
  getAllRecommendations,
  getRecommendationById,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation
} = require('../controllers/recommendationController');

const router = express.Router();

router.get('/', getAllRecommendations);
router.get('/:id', getRecommendationById);
router.post('/', createRecommendation);
router.put('/:id', updateRecommendation);
router.delete('/:id', deleteRecommendation);

module.exports = router;
