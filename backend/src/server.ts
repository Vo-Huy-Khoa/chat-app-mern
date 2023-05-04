import express from "express";
import cors from "cors";
import connect from "./configs/db";
import dotenv from "dotenv";
import routes from "./routes";
import http from "http";
import { handleSocket } from "./socket";
import { PORT, URL_LOCALHOST, URL_PRODUCTION } from "./utils/types";

dotenv.config();

const app = express();

const server = http.createServer(app);

const allowedOrigins: string[] = [URL_LOCALHOST, URL_PRODUCTION];

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
