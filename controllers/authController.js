import asyncHandler from 'express-async-handler';

import User from '../models/User.js';

const register = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true });
});

export { register };
