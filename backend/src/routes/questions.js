import { Router } from 'express';
import { verifyAuth } from '../middleware/verifyAuth.js';
import { listQuestions, getQuestion } from '../controllers/questionsController.js';

const router = Router();

router.get('/', verifyAuth, listQuestions);
router.get('/:id', verifyAuth, getQuestion);

export default router;
