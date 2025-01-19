import amqp from "amqplib";

export const connectToQueue = async (queueName: string) => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL!);
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);
  return channel;
};
