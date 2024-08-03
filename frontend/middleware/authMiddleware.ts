// middleware/authMiddleware.ts
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

export const authenticate = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Extract token from header

      if (!token) {
        return res.status(401).json({ error: 'Authentication token missing' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string); // Verify token
      // Attach user info to request object if needed
      (req as any).user = decoded;

      return handler(req, res); // Proceed to the handler
    } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
};