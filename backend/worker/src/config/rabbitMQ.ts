import amqp from "amqplib";
import logger from "../utils/logger"; 

export let channel: amqp.Channel;

export const connectRabbitMQ = async (url: string, exchange: string, queue: string): Promise<void> => {
    try {
        // Start RabbitMQ connection
        const connection = await amqp.connect(url);
        channel = await connection.createChannel();

        // Assert exchange
        await channel.assertExchange(exchange, "direct", { durable: true });

        // Assert queue and bind to exchange
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, queue);

        // Log success message
        logger.info(`RabbitMQ connected and configured: Exchange=${exchange}, Queue=${queue}`);
    } catch (error) {
        // Log error message
        logger.error("Error connecting to RabbitMQ:", error);
        throw error;
    }
};
