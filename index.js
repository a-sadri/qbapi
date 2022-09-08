import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';

import connectDB from './config/db.js';
import { errorhandler } from './middlewares/errorMiddleware.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();

// Connect to database
connectDB();

// Express config
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// API Routes
app.use('/api/v1/categories', categoryRoutes);

app.use(errorhandler);

app.listen(PORT, () => {
  console.log(
    chalk.cyan(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
  );
});
