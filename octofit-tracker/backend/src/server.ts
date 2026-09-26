import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { connectDatabase } from './config/database';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const frontendOrigin = process.env.FRONTEND_ORIGIN ?? (
  process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-5173.app.github.dev`
    : 'http://localhost:5173'
);

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});

void connectDatabase().catch((error: unknown) => {
  console.error('MongoDB connection failed:', error);
});