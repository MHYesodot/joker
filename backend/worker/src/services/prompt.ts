import { channel } from "../config/rabbitMQ";
import logger from "../utils/logger";

export const publishToExchange = async (exchange: string, routingKey: string, message: string): Promise<void> => {
    try {
        // וידוא שערוץ RabbitMQ מאותחל
        if (!channel) {
            const error = new Error("RabbitMQ channel is not initialized");
            logger.error(error.message);
            throw error;
        }

        // פרסום ההודעה ל-Exchange
        const isSuccess = channel.publish(exchange, routingKey, Buffer.from(message), {
            persistent: true, // ההודעה תשרוד הפעלה מחדש של RabbitMQ
        });

        if (!isSuccess) {
            logger.warn(`Message was not published successfully to exchange "${exchange}" with routing key "${routingKey}"`);
        } else {
            logger.info(`Message published to exchange "${exchange}" with routing key "${routingKey}": ${message}`);
        }
    } catch (error: any) {
        logger.error(`Error publishing to exchange "${exchange}": ${error.message}`, { stack: error.stack });
        throw error; // שגיאה נזרקת להמשך טיפול
    }
};