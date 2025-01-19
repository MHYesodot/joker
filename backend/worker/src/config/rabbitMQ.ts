import amqp from 'amqplib';

let channel: amqp.Channel;
const EXCHANGE_REQUEST = 'joke_request_exchange';
const EXCHANGE_RESPONSE = 'joke_response_exchange';
const QUEUE_REQUEST = 'joke_request_queue';
const QUEUE_RESPONSE = 'joke_response_queue';

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL || "");
    channel = await connection.createChannel();

    // Setup exchanges and queues
    await channel.assertExchange(EXCHANGE_REQUEST, 'direct', { durable: true });
    await channel.assertQueue(QUEUE_REQUEST, { durable: true });
    await channel.bindQueue(QUEUE_REQUEST, EXCHANGE_REQUEST, '');

    console.log('RabbitMQ connected and configured');
  } catch (err) {
    console.error('RabbitMQ connection error:', err);
    process.exit(1);
  }
};