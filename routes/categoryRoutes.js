import express from 'express';

import {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from '../controllers/categoryController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Category:
 *      type: object
 *      required:
 *        - name
 *      properties:
 *        name:
 *          type: string
 *          description: The category name
 *      example:
 *        name: javascript
 */

/**
 * @swagger
 * tags:
 *  name: Categories
 *  description: The Categories managing API
 */

/**
 * @swagger
 * /api/v1/categories:
 *  get:
 *    summary: Return the list of all the categories
 *    tags: [Categories]
 *    responses:
 *      200:
 *        description: The list of the categories
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Category'
 */

/**
 * @swagger
 * /api/v1/categories:
 *  post:
 *    summary: Create a new category
 *    tags: [Categories]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *    responses:
 *     201:
 *       description: The category was successfully created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     500:
 *      description: Some server error
 *
 */

router.route('/').get(getCategories).post(createCategory);
router
  .route('/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;
