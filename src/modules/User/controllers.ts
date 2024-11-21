import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../entities/User.js';
import { AppDataSource } from '../../config/database.js';
import jwt from 'jsonwebtoken';
import configs from '../../config/env.js';

const userRepository = AppDataSource.getRepository(User);

const registerUser = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  try {
    const userExists = await userRepository.findOneBy({ email });

    if (userExists) {
      res.status(409).send({ message: 'Email already in use' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      userName,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error registering user', error });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userExists = await userRepository.findOneBy({ email });

    if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
      res.status(401).send({ message: 'Login credentials are wrong' });
      return;
    }

    if (!configs.auth.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ userId: userExists.id }, configs.auth.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).send({ message: 'User logged in successfully', token });
  } catch (error) {
    res.status(500).send({ message: 'Error logging in user', error });
  }
};

const profileUser = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  try {
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    res.status(200).send(user);
  } catch (error) {}
  res.send({ message: 'User profile fetched successfully' });
};

export default {
  registerUser,
  loginUser,
  profileUser,
};
