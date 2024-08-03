// pages/api/home.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '../../middleware/authMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: 'Welcome to the protected route' });
};

export default authenticate(handler);