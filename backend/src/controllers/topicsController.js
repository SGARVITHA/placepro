import { getTopics } from '../services/topicsService.js';

export async function listTopics(req, res, next) {
  try {
    const { categoryId, companyId, parentTopicId, search } = req.query;

    if (!categoryId || categoryId.trim() === '') {
      const err = new Error('categoryId is required');
      err.status = 400;
      return next(err);
    }

    const data = await getTopics({ categoryId, companyId, parentTopicId, search });
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}
