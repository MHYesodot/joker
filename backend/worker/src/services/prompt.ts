import { channel } from "../config/rabbitMQ";
import logger from "../utils/logger";

export const publishToQueue = async (queue: string, message: string): Promise<void> => {
    try {
        if (!channel) {
            const error = new Error("RabbitMQ channel is not initialized");
            logger.error(error.message);
            throw error; 
        }

        channel.sendToQueue(queue, Buffer.from(message));
        logger.info(`Message sent to queue "${queue}": ${message}`);
    } catch (error: any) {
        logger.error(`Error publishing to queue "${queue}": ${error.message}`, { stack: error.stack });
        throw error; 
    }
};
