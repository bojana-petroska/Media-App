import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../entities/User.js';
import { AppDataSource } from '../../config/database.js';
// import { jwt } from 'jsonwebtoken'

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
    res.status(500).send({ message: 'Error registering user' });
  }
};

const loginUser = (req: Request, res: Response) => {
  res.send({ message: 'User logged in successfully' });
};

const profileUser = (req: Request, res: Response) => {
  res.send({ message: 'User profile fetched successfully' });
};

export default {
  registerUser,
  loginUser,
  profileUser,
};
