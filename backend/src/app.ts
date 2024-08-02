import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import propertyRoutes from './routes/propertyRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app;