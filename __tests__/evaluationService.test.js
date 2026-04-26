/**
 * Evaluation Service Tests
 * Focus: deterministic structure and control flow in AI-based pipeline.
 */

jest.mock('../server/models/attemptModel', () => ({
  create: jest.fn()
}));

jest.mock('../server/services/aiRefinementService', () => ({
  refine: jest.fn()
}));

const Attempt = require('../server/models/attemptModel');
const aiRefinementService = require('../server/services/aiRefinementService');
const evaluationService = require('../server/services/evaluationService');

describe('evaluationService.evaluateResponse', () => {
  test('returns structured response when AI succeeds', async () => {
    aiRefinementService.refine.mockResolvedValue({
      final: 'Structured feedback',
      raw: 'Raw model response',
      source: 'mock-provider-attempt-1'
    });

    Attempt.create.mockResolvedValue({
      _id: 'attempt-001'
    });

    const result = await evaluationService.evaluateResponse({
      userResponse: '  I will complete the rollout by Friday and confirm all checks before release.  ',
      context: 'Project update context',
      speakerRole: 'Engineer',
      listenerRole: 'Manager',
      listenerQuestion: 'When will this be done?',
      userId: 'user-1',
      sessionId: 'session-1'
    });

    expect(aiRefinementService.refine).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: 'evaluation',
        userResponse:
          'I will complete the rollout by Friday and confirm all checks before release.'
      })
    );

    expect(Attempt.create).toHaveBeenCalledWith(
      expect.objectContaining({
        userResponse:
          'I will complete the rollout by Friday and confirm all checks before release.',
        context: 'Project update context',
        speakerRole: 'Engineer',
        listenerRole: 'Manager',
        listenerQuestion: 'When will this be done?',
        aiFeedback: {
          final: 'Structured feedback',
          raw: 'Raw model response',
          source: 'mock-provider-attempt-1'
        },
        metadata: {
          userId: 'user-1',
          sessionId: 'session-1'
        }
      })
    );

    expect(result).toEqual({
      success: true,
      attemptId: 'attempt-001',
      evaluation: {
        final: 'Structured feedback',
        raw: 'Raw model response',
        source: 'mock-provider-attempt-1'
      }
    });
  });

  test('uses fallback AI feedback when AI call fails', async () => {
    aiRefinementService.refine.mockRejectedValue(new Error('provider timeout'));
    Attempt.create.mockResolvedValue({
      _id: 'attempt-002'
    });

    const result = await evaluationService.evaluateResponse({
      userResponse: 'I will share an update by EOD and confirm blockers.'
    });

    expect(result.success).toBe(true);
    expect(result.attemptId).toBe('attempt-002');
    expect(result.evaluation).toEqual({
      final: 'No feedback generated',
      raw: '',
      source: 'ai'
    });
  });

  test('uses fallback AI feedback when AI returns null', async () => {
    aiRefinementService.refine.mockResolvedValue(null);
    Attempt.create.mockResolvedValue({
      _id: 'attempt-003'
    });

    const result = await evaluationService.evaluateResponse({
      userResponse: 'I will share the summary tomorrow and verify key actions.'
    });

    expect(result.evaluation.final).toBe('No feedback generated');
    expect(result.evaluation.raw).toBe('');
    expect(result.evaluation.source).toBe('ai');
  });

  test('throws deterministic validation error for missing userResponse', async () => {
    await expect(
      evaluationService.evaluateResponse({})
    ).rejects.toThrow('Evaluation service error: userResponse must be a non-empty string');

    expect(aiRefinementService.refine).not.toHaveBeenCalled();
    expect(Attempt.create).not.toHaveBeenCalled();
  });

  test('throws deterministic validation error for short userResponse', async () => {
    await expect(
      evaluationService.evaluateResponse({
        userResponse: 'too short'
      })
    ).rejects.toThrow('Evaluation service error: Response too short. Minimum 10 characters required.');

    expect(aiRefinementService.refine).not.toHaveBeenCalled();
    expect(Attempt.create).not.toHaveBeenCalled();
  });

  test('propagates persistence failures as service errors', async () => {
    aiRefinementService.refine.mockResolvedValue({
      final: 'Feedback',
      raw: 'Raw',
      source: 'mock-provider'
    });
    Attempt.create.mockRejectedValue(new Error('db write failed'));

    await expect(
      evaluationService.evaluateResponse({
        userResponse: 'I will complete this and confirm all the required checks.'
      })
    ).rejects.toThrow('Evaluation service error: db write failed');
  });
});
