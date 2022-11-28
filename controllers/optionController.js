import asyncHandler from 'express-async-handler';
import Joi from 'joi';

import Option from '../models/Option.js';

// @desc     Get all options
// @route    GET /api/v1/options
// @access   Private
const getOptions = asyncHandler(async (req, res) => {
  const options = await Option.find();
  res.status(200).json(options);
});

// @desc     Get single option
// @route    GET /api/v1/options/:id
// @access   Private
const getOption = asyncHandler(async (req, res) => {
  const option = await Option.findById(req.params.id);
  res.status(200).json(option);
});

// @desc     Create option
// @route    POST /api/v1/options
// @access   Private
const createOption = asyncHandler(async (req, res) => {
  // Validation
  const schema = Joi.object({
    title: Joi.string().required(),
    isAnswer: Joi.boolean(),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400);
    throw new Error(error);
  }

  // Create option
  const option = await Option.create(req.body);

  if (option) {
    res.status(201).json(option);
  } else {
    res.status(400);
    throw new Error('Invalid option data');
  }
});

// @desc     Update option
// @route    PUT /api/v1/options/:id
// @access   Private
const updateOption = asyncHandler(async (req, res) => {
  const updatedOption = await Option.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedOption) {
    res.status(400);
    throw new Error('Invalid option data');
  }

  res.status(200).json(updatedOption);
});

// @desc     Delete option
// @route    DELETE /api/v1/options/:id
// @access   Private
const deleteOption = asyncHandler(async (req, res) => {
  const deletedOption = await Option.findByIdAndDelete(req.params.id);

  if (!deletedOption) {
    res.status(400);
    throw new Error('Invalid option data');
  }

  res.status(200).json(deletedOption);
});

export { getOptions, getOption, createOption, updateOption, deleteOption };
