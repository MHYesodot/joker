import express from "express";
import { connectToQueue } from "./config/rabbitMQ";
import { handlePrompt } from "./controllers/promptProcessor";

const app = express();

(async () => {
  const queueName = "promptQueue";
  const channel = await connectToQueue(queueName);

  channel.consume(queueName, async (msg) => {
    if (msg) {
      console.log("Message received:", msg.content.toString());
      await handlePrompt(msg.content.toString());
      channel.ack(msg); // אישור עיבוד ההודעה
    }
  });
})();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Consumer server is running on port ${PORT}`);
});
