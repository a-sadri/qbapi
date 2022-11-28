import express from 'express';

import {
  getOptions,
  getOption,
  createOption,
  updateOption,
  deleteOption,
} from '../controllers/optionController.js';

const router = express.Router();

router.route('/').get(getOptions).post(createOption);
router.route('/:id').get(getOption).put(updateOption).delete(deleteOption);

export default router;
