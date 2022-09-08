import asyncHandler from 'express-async-handler';

import Category from '../models/Category.js';

// POST /categories
const newCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Validation
  if (!name) {
    res.status(400);
    throw new Error('Please include all fields');
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
    res.status(201).json({
      id: category._id,
      name: category.name,
    });
  } else {
    res.status(400);
    throw new Error('Invalid category data');
  }
});

// GET /categories
const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
});

// GET /categories/:name
// const getOneCategory = asyncHandler(async (req, res) => {
//   res.json({ message: 'getOneCategory' });
// });

// PUT

// DELETE

export { newCategory, getAllCategory };
