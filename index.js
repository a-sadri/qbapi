import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';

import connectDB from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// API Routes
app.use('/api/v1/categories', categoryRoutes);

app.listen(PORT, () => {
  console.log(
    chalk.cyan(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
  );
});
