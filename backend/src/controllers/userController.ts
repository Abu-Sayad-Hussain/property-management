import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

// Controller to register a new user
export const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const userRepository = getRepository(User);

    try {
        const existingUser = await userRepository.findOne({
            where: { username }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = userRepository.create({ username, password: hashedPassword });
        await userRepository.save(user);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user', error });
    }
};

// Controller to login a user
export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const userRepository = getRepository(User);

    try {
        const user = await userRepository.findOne({
            where: { username }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        if (!user.password) {
            return res.status(400).json({ message: 'Password not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to login user', error });
    }
};
