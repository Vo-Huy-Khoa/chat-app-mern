import express from "express";
import cors from "cors";
import connect from "./configs/db";
import dotenv from "dotenv";
import routes from "./routes";
import { Server } from "socket.io";
import http from "http";
import messageController from "./controllers/messageController";
import UserModel from "./models/User";
import { Socket } from "socket.io";

const app = express();

const server = http.createServer(app);
const io = new Server(server);

const PORT: string | number = process.env.PORT || "3001";

const allowedOrigins: string[] = [
  "http://localhost:3000",
  "https://chatapp-vo-huy-khoa.vercel.app",
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

const listSocketID: string[] = [];

const handleLogin = async (socket: Socket, userId: string) => {
  listSocketID.push(socket.id);
  console.log(`User ${userId} logged in with socket id ${socket.id}`);
  await UserModel.findOneAndUpdate({ _id: userId }, { socketID: socket.id });
  socket.emit("login_success", { userId, socketId: socket.id });
};

const handleLogout = async (socket: Socket, userId: string) => {
  const index = listSocketID.indexOf(socket.id);
  if (index !== -1) {
    listSocketID.splice(index, 1);
  }
  console.log(`User ${userId} logged out with socket id ${socket.id}`);
  await UserModel.findOneAndUpdate({ _id: userId }, { socketID: "" });
  socket.emit("logout_success", { userId, socketId: socket.id });
};

const handleMessage = async (socket: Socket, data: any) => {
  await messageController.createMessage(data, io, socket, listSocketID);
};

const handleGetMessage = async (socket: Socket, data: any) => {
  await messageController.getMessage(data, io, socket, listSocketID);
};

io.on("connection", (socket: Socket) => {
  console.log(`Client connected with socket id ${socket.id}`);

  socket.on("login", async (userId: string) => {
    await handleLogin(socket, userId);
  });

  socket.on("logout", async (userId: string) => {
    await handleLogout(socket, userId);
  });

  socket.on("message", async (data: any) => {
    await handleMessage(socket, data);
  });

  socket.on("get-message", async (data: any) => {
    await handleGetMessage(socket, data);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});

export { io };
