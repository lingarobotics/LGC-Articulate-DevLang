/**
 * API Integration Tests (AI-era)
 * Validate HTTP behavior and response structure only.
 */

jest.mock('../server/services/evaluationService', () => ({
  evaluateResponse: jest.fn(),
  getAttempt: jest.fn()
}));

let request;
try {
  request = require('supertest');
} catch {
  request = require('../server/node_modules/supertest');
}
const evaluationService = require('../server/services/evaluationService');
const { app } = require('../server');

describe('API Endpoints', () => {
  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.status).toBe('healthy');
      expect(response.body.environment).toBeDefined();
    });
  });

  describe('GET /', () => {
    test('should return API information', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('LGC Articulate');
      expect(response.body.endpoints).toBeDefined();
    });
  });

  describe('POST /api/evaluate/test', () => {
    test('should return structured evaluation response for valid input', async () => {
      evaluationService.evaluateResponse.mockResolvedValue({
        success: true,
        attemptId: 'attempt-123',
        evaluation: {
          final: 'Structured AI feedback',
          raw: 'Raw model text',
          source: 'mock-ai'
        }
      });

      const response = await request(app)
        .post('/api/evaluate/test')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
          userResponse: 'I will schedule the meeting and confirm attendance beforehand to prevent issues.'
        }));

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.attemptId).toBeDefined();
      expect(response.body.evaluation).toBeDefined();
      expect(response.body.evaluation.final).toBeDefined();
      expect(response.body.evaluation.raw).toBeDefined();
      expect(response.body.evaluation.source).toBeDefined();
    });

    test('should reject too short response', async () => {
      const response = await request(app)
        .post('/api/evaluate/test')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
          userResponse: 'Hello'
        }));

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test('should reject missing userResponse', async () => {
      const response = await request(app)
        .post('/api/evaluate/test')
        .set('Content-Type', 'application/json')
        .send('{}');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test('should reject non-string userResponse', async () => {
      const response = await request(app)
        .post('/api/evaluate/test')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
          userResponse: 12345
        }));

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Validation Middleware', () => {
    test('should trim whitespace and still pass valid input', async () => {
      evaluationService.evaluateResponse.mockResolvedValue({
        success: true,
        attemptId: 'attempt-234',
        evaluation: {
          final: 'Feedback',
          raw: 'Raw',
          source: 'mock-ai'
        }
      });

      const response = await request(app)
        .post('/api/evaluate/test')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
          userResponse: '   This is a valid response with leading and trailing spaces.   '
        }));

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(evaluationService.evaluateResponse).toHaveBeenCalledWith(
        expect.objectContaining({
          userResponse: 'This is a valid response with leading and trailing spaces.'
        })
      );
    });

    test('should reject response exceeding 10000 characters', async () => {
      const longResponse = 'a'.repeat(10001);
      const response = await request(app)
        .post('/api/evaluate/test')
        .set('Content-Type', 'application/json')
        .send(JSON.stringify({
          userResponse: longResponse
        }));

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error.details).toContain(
        'userResponse must not exceed 10,000 characters'
      );
    });
  });

  describe('404 Handler', () => {
    test('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/api/unknown/route');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('Route not found');
    });
  });
});

describe('Error Handling', () => {
  test('should handle malformed JSON', async () => {
    const response = await request(app)
      .post('/api/evaluate/test')
      .set('Content-Type', 'application/json')
      .send('invalid json {');

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.body.success).toBe(false);
  });
});
