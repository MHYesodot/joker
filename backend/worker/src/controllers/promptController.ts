import { Request, Response, NextFunction } from 'express';
import { publishToQueue } from '../services/prompt';
import logger from '../utils/logger'; 

export const createPrompt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { prompt } = req.body;

        // Validate input
        if (!prompt) {
            logger.warn('Prompt is required but missing in the request body');
            res.status(400).json({ error: 'Prompt is required' });
        }

        // Publish the prompt to the queue
        await publishToQueue('prompt', prompt);
        logger.info(`Prompt successfully published to the queue: ${prompt}`);

        res.status(201).json({ message: 'Prompt created' });
    } catch (error: any) {
        logger.error(`Error in createPrompt: ${error.message}`, { stack: error.stack });
        next(error); // Pass the error to the error-handling middleware
    }
};
