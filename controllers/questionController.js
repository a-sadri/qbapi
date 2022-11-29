import asyncHandler from 'express-async-handler';
import Joi from 'joi';

import Question from '../models/Question.js';

// @desc     Get all questions
// @route    GET /api/v1/questions
// @access   Private
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find().populate('options', 'title -_id');

  res.status(200).json(questions);
});

// @desc     Get question
// @route    GET /api/v1/questions/:id
// @access   Private
const getQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id).populate(
    'options',
    'title -_id'
  );

  res.status(200).json(question);
});

// @desc     Create question
// @route    POST /api/v1/questions
// @access   Private
const createQuestion = asyncHandler(async (req, res) => {
  // Validation
  const schema = Joi.object({
    title: Joi.string().required(),
    options: Joi.array().items(Joi.string()).required(),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400);
    throw new Error(error);
  }

  // Create question
  const question = await Question.create(req.body);

  if (question) {
    res.status(201).json(question);
  } else {
    res.status(400);
    throw new Error('Invalid question data');
  }
});

// @desc     Update question
// @route    PUT /api/v1/questions/:id
// @access   Private
const updateQuestion = asyncHandler(async (req, res) => {
  const updatedQuestion = await Question.findOneAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedQuestion) {
    res.status(400);
    throw new Error('Invalid Question data');
  }

  res.status(200).json(updatedQuestion);
});

// @desc     Delete question
// @route    DELETE /api/v1/questions/:id
// @access   Private
const deleteQuestion = asyncHandler(async (req, res) => {
  const deletedQuestion = await Question.findOneAndDelete(req.params.id);

  if (!deletedQuestion) {
    res.status(400);
    throw new Error('Invalid question data');
  }

  res.status(200).json(deletedQuestion);
});

export {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
