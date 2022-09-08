import express from 'express';

import {
  newCategory,
  getAllCategory,
  getOneCategory,
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getAllCategory);
router.get('/:name', getOneCategory);

router.post('/', newCategory);

export default router;
