import { Router } from 'express';
import { verifyAuth } from '../middleware/verifyAuth.js';
import { listCategories } from '../controllers/categoriesController.js';

const router = Router();

router.get('/', verifyAuth, listCategories);

export default router;
