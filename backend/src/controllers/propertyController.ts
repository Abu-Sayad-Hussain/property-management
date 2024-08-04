import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Property } from '../models/Property';
import { scrapeProperty } from '../utils/scrape';

// Controller to get all properties
export const searchProperties = async (req: Request, res: Response) => {
    const { query } = req.query;
  
    try {
      const propertyRepository = getRepository(Property);
  
      let properties;
  
      if (typeof query === 'string' && query.trim() !== '') {
        // If query is provided, search by name, city, or state
        properties = await propertyRepository
          .createQueryBuilder('property')
          .where('property.name LIKE :query', { query: `%${query}%` })
          .orWhere('property.city LIKE :query', { query: `%${query}%` })
          .orWhere('property.state LIKE :query', { query: `%${query}%` })
          .getMany();
      } else {
        // If no query is provided, get all properties
        properties = await propertyRepository.find();
      }
  
      if (properties.length === 0) {
        return res.status(404).json({ message: 'No properties found' });
      }
  
      res.status(200).json(properties);
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(500).json({ error: 'Failed to search properties' });
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
    const { searchTerms } = req.body;

    if (!Array.isArray(searchTerms) || searchTerms.length === 0) {
        return res.status(400).json({ message: 'Please provide an array of search terms.' });
    }

    try {
        const propertyRepository = getRepository(Property);
        const allProperties = [];

        for (const term of searchTerms) {
            const property = await scrapeProperty(term);
            if(Object.keys(property).length > 0){
                    const createProperty = propertyRepository.create(property);
                    await propertyRepository.save(createProperty);
                    allProperties.push(property);
            }
        }

        res.status(200).json({ message: 'Scraping and saving completed', properties: allProperties });
    } catch (error) {
        console.error('Error scraping data:', error);
        res.status(500).json({ message: 'Error scraping data' });
    }
};  
  

export const createProperty = async (req: Request, res: Response) => {
    const propertyRepository = getRepository(Property);
    const { name, address, state, city, zipCode, county, phone, type, capacity } = req.body;

    try {
        // Create a new property instance
        const newProperty = propertyRepository.create({
            name,
            address,
            city,
            zipCode,
            county,
            phone,
            type,
            capacity,
            state,
        });

        // Save the new property to the database
        const savedProperty = await propertyRepository.save(newProperty);

        res.status(201).json(savedProperty);
    } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({ error: 'Failed to create property' });
    }
};
