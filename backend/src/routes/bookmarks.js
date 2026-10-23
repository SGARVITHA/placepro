import { Router } from 'express';
import { verifyAuth } from '../middleware/verifyAuth.js';
import {
  listBookmarks,
  createBookmark,
  deleteBookmark,
} from '../controllers/bookmarksController.js';

const router = Router();

router.get('/', verifyAuth, listBookmarks);
router.post('/:questionId', verifyAuth, createBookmark);
router.delete('/:questionId', verifyAuth, deleteBookmark);

export default router;
