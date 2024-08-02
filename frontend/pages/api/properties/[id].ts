import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const response = await fetch(`http://localhost:5000/api/properties/${id}`);
    const property = await response.json();
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch property details' });
  }
}
