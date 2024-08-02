import { Router } from 'express';
import {
   getAllProperties,
   getPropertyById,
   scrapePropertyData
} from '../controllers/propertyController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Route to get all properties
router.get('/', authenticateToken, getAllProperties);

// Route to get a property by ID
router.get('/:id', authenticateToken, getPropertyById);

// Optional: Route to scrape property data
router.post('/scrape', authenticateToken, scrapePropertyData);

export default router;
