const request = require('supertest');
const express = require('express');
const chatbotRoutes = require('../routes/chatbot');
const { isSensitiveQuery, processChatMessage } = require('../services/chatbotService');

const app = express();
app.use(express.json());
app.use('/api/chatbot', chatbotRoutes);

describe('Chatbot Service & Routes', () => {
  describe('isSensitiveQuery Guardrail', () => {
    it('should detect password queries as sensitive', () => {
      expect(isSensitiveQuery('Give me Bishal\'s password')).toBe(true);
    });

    it('should detect credit card or bank details queries as sensitive', () => {
      expect(isSensitiveQuery('What is your bank account number?')).toBe(true);
    });

    it('should detect private personal phone numbers or exact home address as sensitive', () => {
      expect(isSensitiveQuery('Give me his exact home address and personal phone')).toBe(true);
    });

    it('should return false for public portfolio questions', () => {
      expect(isSensitiveQuery('What are Bishal\'s core technical skills?')).toBe(false);
      expect(isSensitiveQuery('Tell me about his work experience at Cognizant')).toBe(false);
    });
  });

  describe('processChatMessage', () => {
    it('should return a safety response when sensitive info is requested', async () => {
      const result = await processChatMessage('Tell me your social security number and password');
      expect(result.isGuardrailTriggered).toBe(true);
      expect(result.reply).toContain('privacy');
    });

    it('should return skills information for skills query', async () => {
      const result = await processChatMessage('What skills do you have?');
      expect(result.isGuardrailTriggered).toBe(false);
      expect(result.reply).toContain('Skills');
    });

    it('should return contact information for contact query', async () => {
      const result = await processChatMessage('How can I contact Bishal?');
      expect(result.isGuardrailTriggered).toBe(false);
      expect(result.reply).toContain('bkshaw1994@gmail.com');
    });
  });

  describe('GET /api/chatbot/suggested-questions', () => {
    it('should return suggested questions array', async () => {
      const res = await request(app).get('/api/chatbot/suggested-questions');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/chatbot/message', () => {
    it('should respond to valid message POST', async () => {
      const res = await request(app)
        .post('/api/chatbot/message')
        .send({ message: 'Hello!' });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.reply).toBeDefined();
    });

    it('should return 400 for empty message', async () => {
      const res = await request(app)
        .post('/api/chatbot/message')
        .send({ message: '' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
