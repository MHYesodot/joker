import amqp, { Connection, Channel } from "amqplib";
import logger from "../utils/logger";

export let channel: Channel; // ערוץ RabbitMQ
let connection: Connection; // חיבור RabbitMQ



export const connectRabbitMQ = async (url: string, exchange: string, queue: string): Promise<void> => {
    try {
        logger.info(`Connecting to RabbitMQ at ${url}...`);
        connection = await amqp.connect(url);
        channel = await connection.createChannel();
        logger.info("RabbitMQ connection established.");

        // יצירת Exchange
        logger.info(`Asserting exchange "${exchange}"...`);
        await channel.assertExchange(exchange, "direct", { durable: true });

        // אם יש צורך ב-Exchange נוסף
        logger.info(`Asserting exchange "prompt"...`);
        await channel.assertExchange("prompt", "direct", { durable: true });

        // יצירת Queue
        logger.info(`Asserting queue "${queue}"...`);
        await channel.assertQueue(queue, { durable: true });

        // ביינדינג בין Queue ל-Exchange
        await channel.bindQueue(queue, exchange, queue);
        logger.info(`Queue "${queue}" successfully bound to exchange "${exchange}" with routing key "${queue}"`);
    } catch (error: any) {
        logger.error(`Error connecting to RabbitMQ: ${error.message}`, { stack: error.stack });
        throw error;
    }
};

/**
 * סגירת החיבור ל-RabbitMQ בצורה מסודרת.
 */
export const closeRabbitMQConnection = async (): Promise<void> => {
    try {
        if (channel) {
            logger.info("Closing RabbitMQ channel...");
            await channel.close();
        }
        if (connection) {
            logger.info("Closing RabbitMQ connection...");
            await connection.close();
        }
        logger.info("RabbitMQ connection closed successfully.");
    } catch (error: any) {
        logger.error(`Error closing RabbitMQ connection: ${error.message}`, { stack: error.stack });
    }
};