import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { logRequest } from './utils/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

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

// Content routes mounted here in Milestone 2 — companies, categories, topics, questions

// Register error handling middleware last
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
