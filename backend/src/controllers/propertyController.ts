import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Property } from '../models/Property';

// Controller to get all properties
export const getAllProperties = async (req: Request, res: Response) => {
    const propertyRepository = getRepository(Property);
    try {
        const properties = await propertyRepository.find();
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch properties', error });
    }
};

// Controller to get a property by ID
export const getPropertyById = async (req: Request, res: Response) => {
    const propertyRepository = getRepository(Property);
    const { id } = req.params;
    const propertyId = parseInt(id, 10); // Convert id to number

    try {
        const property = await propertyRepository.findOne({
            where: { id: propertyId }
        });
        if (property) {
            res.status(200).json(property);
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch property', error });
    }
};

// Optional: Controller to scrape property data
export const scrapePropertyData = async (req: Request, res: Response) => {
    // Implement scraping logic here
    res.status(200).json({ message: 'Scraping initiated' });
};
