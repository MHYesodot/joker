import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import promptRoutes from './routes/promptRoutes';
import { connectRabbitMQ } from './config/rabbitMQ';
import logger from './utils/logger'; // ייבוא Winston Logger

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const EXCHANGE = process.env.EXCHANGE || 'defaultExchange';
const QUEUE = process.env.QUEUE || 'defaultQueue';

// Middleware
app.use(express.json());
app.use('/api', promptRoutes);

// Start server
const server = createServer(app);
server.listen(PORT, async () => {
    logger.info(`Server is running on port ${PORT}`);
    try {
        await connectRabbitMQ(RABBITMQ_URL, EXCHANGE, QUEUE);
        logger.info('RabbitMQ successfully connected and initialized');
    } catch (error: any) {
        logger.error(`Failed to initialize RabbitMQ: ${error.message}`, { stack: error.stack });
        process.exit(1); // Exit process if RabbitMQ fails to connect
    }
});

export default app;
