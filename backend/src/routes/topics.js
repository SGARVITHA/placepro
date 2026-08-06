import { Router } from 'express';
import { verifyAuth } from '../middleware/verifyAuth.js';
import { listTopics } from '../controllers/topicsController.js';

const router = Router();

router.get('/', verifyAuth, listTopics);

export default router;
