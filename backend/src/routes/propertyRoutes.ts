// routes/property.ts
import { Router } from 'express';
import {
   searchProperties,
   getPropertyById,
   scrapePropertyData,
   createProperty, // Import the new function
} from '../controllers/propertyController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Route to get all properties
router.get('/', authenticateToken, searchProperties);

// Route to get a property by ID
router.get('/:id', authenticateToken, getPropertyById);

// Route to create a new property
router.post('/', authenticateToken, createProperty); // New route for creating a property

// Optional: Route to scrape property data
router.post('/scrape', authenticateToken, scrapePropertyData);

export default router;