import 'reflect-metadata';
import app from './app';
import { createConnection } from 'typeorm';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Create database connection
        await createConnection();

        // Start server
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();
