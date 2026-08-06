import { getQuestions, getQuestionById } from '../services/questionsService.js';

export async function listQuestions(req, res, next) {
  try {
    const { topicId, difficulty, search } = req.query;

    if (!topicId || typeof topicId !== 'string' || topicId.trim() === '') {
      const err = new Error('topicId is required');
      err.status = 400;
      return next(err);
    }

    if (difficulty) {
      const validDifficulties = ['easy', 'medium', 'hard'];
      if (!validDifficulties.includes(difficulty)) {
        const err = new Error('difficulty must be one of easy, medium, hard');
        err.status = 400;
        return next(err);
      }
    }

    const data = await getQuestions({ topicId, difficulty, search });
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

export async function getQuestion(req, res, next) {
  try {
    const { id } = req.params;

    const data = await getQuestionById(id);

    if (!data) {
      const err = new Error('Question not found');
      err.status = 404;
      return next(err);
    }

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}
