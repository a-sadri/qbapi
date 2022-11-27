import asyncHandler from 'express-async-handler';

// @desc     Get all questions
// @route    GET /api/v1/questions
// @access   Private
const getQuestions = asyncHandler(async (req, res) => {});

// @desc     Get question
// @route    GET /api/v1/questions/:id
// @access   Private
const getQuestion = asyncHandler(async (req, res) => {});

// @desc     Create question
// @route    POST /api/v1/questions
// @access   Private
const createQuestion = asyncHandler(async (req, res) => {});

// @desc     Update question
// @route    PUT /api/v1/questions/:id
// @access   Private
const updateQuestion = asyncHandler(async (req, res) => {});

// @desc     Delete question
// @route    DELETE /api/v1/questions/:id
// @access   Private
const deleteQuestion = asyncHandler(async (req, res) => {});

export {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
