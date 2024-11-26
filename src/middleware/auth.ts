import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import configs from '../config/env.js';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).send({ message: 'No auth token provided' });
    return;
  }

  if (!configs.auth.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  // Verify the token using the JWT library
  try {
    // Verify the token and decode it to get the user ID
    const decode = jwt.verify(token, configs.auth.JWT_SECRET);
    // Attach the decoded user ID to the request object for further processing
    req.user = decode as { id: number };
    console.log(decode);

    next();
  } catch (error) {
    res.status(500).send({ message: 'Server error.', error });
  }
};

export default authMiddleware;
