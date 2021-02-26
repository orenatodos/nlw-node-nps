import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import createConnection from './database/connection';
import routes from './routes';
import AppError from './errors/AppError';

createConnection();

const app = express();

app.use(express.json());
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  return response.status(500).json({
    status: 'Error',
    message: `Internal server error ${err.message}`,
  });
});

export default app;
