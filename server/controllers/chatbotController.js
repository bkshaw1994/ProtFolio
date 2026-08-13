const { processChatMessage, getSuggestedQuestions } = require('../services/chatbotService');

/**
 * @desc    Process incoming chatbot message and return AI reply
 * @route   POST /api/chatbot/message
 * @access  Public
 */
const handleMessage = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required and must be a non-empty string'
      });
    }

    const { reply, isGuardrailTriggered } = await processChatMessage(message.trim(), history || []);

    return res.status(200).json({
      success: true,
      data: {
        reply,
        isGuardrailTriggered,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Chatbot Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process chat message. Please try again later.'
    });
  }
};

/**
 * @desc    Get quick prompt suggestions for the chatbot UI
 * @route   GET /api/chatbot/suggested-questions
 * @access  Public
 */
const getSuggestions = (req, res) => {
  try {
    const suggestions = getSuggestedQuestions();
    return res.status(200).json({
      success: true,
      data: suggestions
    });
  } catch (error) {
    console.error('Chatbot Suggestions Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve suggested questions'
    });
  }
};

module.exports = {
  handleMessage,
  getSuggestions
};
