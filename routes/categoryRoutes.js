import express from 'express';

import {
  newCategory,
  getAllCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getAllCategory);

router.post('/', newCategory);

export default router;
