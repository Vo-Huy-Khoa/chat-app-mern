import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import connect from "./configs/db";
import dotenv from "dotenv";
import routes from "./routes";
import { Server } from "socket.io";
import http from "http";
import messageController from "./controllers/messageController";
import UserModel from "./models/User";

const app = express();

const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || "3001";

const allowedOrigins = [
  "http://localhost:3000",
  "https://mern-vo-huy-khoa.vercel.app",
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);
connect();

const listSocketID: any = [];
io.on("connection", (socket) => {
  console.log(`Client connected with socket id ${socket.id}`);

  // Handle user login
  socket.on("login", async (userId) => {
    listSocketID.push(socket.id);
    console.log(`User ${userId} logged in with socket id ${socket.id}`);
    await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        socketID: socket.id,
      }
    );
    socket.emit("login_success", { userId, socketId: socket.id });
  });
  socket.on("logout", async (userId) => {
    listSocketID.pop(socket.id);
    console.log(`User ${userId} logged in with socket id ${socket.id}`);
    await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        socketID: "",
      }
    );
    socket.emit("logout_success", { userId, socketId: socket.id });
  });
  // Handle incoming messages
  socket.on("message", async (data) => {
    await messageController.createMessage(data, io, socket, listSocketID);
  });

  socket.on("get-message", async (data) => {
    await messageController.getMessage(data, io, socket, listSocketID);
  });
});
server.listen(PORT, () => {
  console.log(`Server listing at port: ${PORT}`);
});

export { io };
