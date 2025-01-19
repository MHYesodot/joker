import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import dbConnect from "./config/db";

dotenv.config();

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

dbConnect();

app.use(cors({}));
app.use(express.json());

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 

export default app;