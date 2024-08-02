import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assumes Bearer token

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
        const userRepository = getRepository(User);

        // Find user by primary key directly
        const user = await userRepository.findOne(decoded.userId as any); // Cast to `any` to resolve type issue

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user; // Now TypeScript recognizes `req.user`
        next();
    } catch (error) {
        res.status(401).json({ message: 'Failed to authenticate token', error });
    }
};
