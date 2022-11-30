import asyncHandler from 'express-async-handler';

import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

export { register };
