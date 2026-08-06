import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { logRequest } from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import companiesRouter from './routes/companies.js';
import categoriesRouter from './routes/categories.js';
import topicsRouter from './routes/topics.js';
import questionsRouter from './routes/questions.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all origins in Phase 1 dev
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Log every incoming request
app.use(logRequest);

// Unauthenticated health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Mounted API routes
app.use('/api/companies', companiesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/topics', topicsRouter);
app.use('/api/questions', questionsRouter);

// Register error handling middleware last
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
