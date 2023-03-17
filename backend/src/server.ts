import express from "express";
import cors from "cors";
import connect from "./configs/db";
import dotenv from "dotenv";
import routes from "./routes";
import http from "http";
import { handleSocket } from "./socket";

dotenv.config();

const app = express();

const server = http.createServer(app);

const PORT = process.env.PORT || "3001";

const allowedOrigins: string[] = [
  "http://localhost:3000",
  "https://chatapp-vo-huy-khoa.vercel.app",
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

routes(app);

connect();

handleSocket(server);

server.listen(PORT, () => {
  console.log(`Server listing at port: ${PORT}`);
});
