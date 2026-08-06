import { Router } from 'express';
import { verifyAuth } from '../middleware/verifyAuth.js';
import { listCompanies } from '../controllers/companiesController.js';

const router = Router();

router.get('/', verifyAuth, listCompanies);

export default router;
