var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import { User } from '../../entities/User.js';
import { AppDataSource } from '../../config/database.js';
import jwt from 'jsonwebtoken';
import configs from '../../config/env.js';
const userRepository = AppDataSource.getRepository(User);
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    try {
        const userExists = yield userRepository.findOneBy({ email });
        if (userExists) {
            res.status(409).send({ message: 'Email is already used.' });
            return;
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = userRepository.create({
            userName,
            email,
            password: hashedPassword,
        });
        yield userRepository.save(user);
        res.status(201).send({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(500).send({ message: 'Error registering user', error });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userExists = yield userRepository.findOneBy({ email });
        if (!userExists || !(yield bcrypt.compare(password, userExists.password))) {
            res.status(401).send({ message: 'Login credentials are wrong' });
            return;
        }
        if (!configs.auth.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({ id: userExists.id }, configs.auth.JWT_SECRET, {
            expiresIn: '1h',
        });
        res
            .status(200)
            .send({
            message: `User logged in successfully ${userExists.userName} ${userExists.email} ${userExists.id}`,
            token,
        });
    }
    catch (error) {
        res.status(500).send({ message: 'Error logging in user', error });
    }
});
const profileUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log('User ID:', userId);
    try {
        const user = yield userRepository.findOneBy({ id: userId });
        console.log('User:', user);
        if (!user) {
            res.status(404).send({ message: 'User not found' });
            return;
        }
        res.status(200).send({ user });
    }
    catch (error) { }
    res.send({ message: 'User profile fetched successfully' });
});
export default {
    registerUser,
    loginUser,
    profileUser,
};
