import asyncHandler from 'express-async-handler';
import Joi from 'joi';

import Category from '../models/Category.js';

// @desc     Get all categories
// @route    GET /api/v1/categories
// @access   Private
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

// @desc     Get a category
// @route    GET /api/v1/categories/:id
// @access   Private
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.status(200).json(category);
});

// @desc     Create new category
// @route    POST /api/v1/categories
// @access   Private
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Validation
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400);
    throw new Error(error);
  }

  // Find if category already exists
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    res.status(400);
    throw new Error('Category already exists');
  }

  // Create category
  const category = await Category.create({
    name,
  });

  if (category) {
    res.status(201).json(category);
  } else {
    res.status(400);
    throw new Error('Invalid category data');
  }
});

// @desc     Update category
// @route    PUT /api/v1/categories/:id
// @access   Private
const updateCategory = asyncHandler(async (req, res) => {
  // Create category
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error('Category not found');
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedCategory);
});

// @desc     Delete category
// @route    DELETE /api/v1/categories/:id
// @access   Private
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error('Category not found');
  }

  await Category.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id });
});

export {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
