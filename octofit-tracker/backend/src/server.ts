import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database';
import apiRouter from './routes/api';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`;
const frontendOrigin = process.env.FRONTEND_ORIGIN ?? (
  process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-5173.app.github.dev`
    : 'http://localhost:5173'
);

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    baseUrl: apiBaseUrl,
  });
});

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});

void connectDatabase().catch((error: unknown) => {
  console.error('MongoDB connection failed:', error);
});