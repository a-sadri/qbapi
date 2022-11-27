import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import connectDB from './config/db.js';
import { errorhandler } from './middlewares/errorMiddleware.js';
import categoryRoutes from './routes/categoryRoutes.js';
import questionRoutes from './routes/questionRoutes.js';

dotenv.config();

// Connect to database
connectDB();

// Express config
const app = express();
app.use(express.json());

// Swagger config
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'QB API',
      version: '1.0.0',
      description: 'An API for Quizzes, Questions and Answers, ... ',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

const PORT = process.env.PORT || 5000;

// API Routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/questions', questionRoutes);

app.use(errorhandler);

app.listen(PORT, () => {
  console.log(
    chalk.cyan(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
  );
});
