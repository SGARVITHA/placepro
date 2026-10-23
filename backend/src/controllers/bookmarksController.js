import {
  getUserBookmarks,
  addBookmark,
  removeBookmark,
} from '../services/bookmarksService.js';

export async function listBookmarks(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      const err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
    }

    const data = await getUserBookmarks(userId);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

export async function createBookmark(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      const err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
    }

    const { questionId } = req.params;
    if (!questionId) {
      const err = new Error('questionId is required');
      err.status = 400;
      return next(err);
    }

    const metadata = req.body?.metadata || req.body || {};
    const bookmark = await addBookmark(userId, questionId, metadata);
    return res.status(201).json(bookmark);
  } catch (err) {
    next(err);
  }
}

export async function deleteBookmark(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      const err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
    }

    const { questionId } = req.params;
    if (!questionId) {
      const err = new Error('questionId is required');
      err.status = 400;
      return next(err);
    }

    await removeBookmark(userId, questionId);
    return res.status(200).json({ success: true, questionId });
  } catch (err) {
    next(err);
  }
}
