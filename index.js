import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import chalk from 'chalk';
import morgan from 'morgan';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import connectDB from './config/db.js';
import { errorhandler } from './middlewares/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import optionRoutes from './routes/optionRoutes.js';

dotenv.config();

// Connect to database
connectDB();

// Express config
const app = express();
app.use(helmet());
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

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
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/options', optionRoutes);

app.use(errorhandler);

const server = app.listen(PORT, () => {
  console.log(
    chalk.cyan(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
  );
});

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
