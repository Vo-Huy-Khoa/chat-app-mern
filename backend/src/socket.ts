import { Server } from "socket.io";
import http from "http";
import UserModel from "./models/User";
import messageController from "./controllers/messageController";
import { Socket } from "socket.io";

const listSocketID: any = [];

const handleLogin = async (socket: Socket, userId: string) => {
  listSocketID.push(socket.id);
  await UserModel.findOneAndUpdate({ _id: userId }, { socketID: socket.id });
  socket.emit("login_success", { userId, socketId: socket.id });
};

const handleLogout = async (socket: Socket, userId: string) => {
  const index = listSocketID.indexOf(socket.id);
  if (index !== -1) {
    listSocketID.splice(index, 1);
  }
  await UserModel.findOneAndUpdate({ _id: userId }, { socketID: "" });
  socket.emit("logout_success", { userId, socketId: socket.id });
};

const handleMessage = async (socket: Socket, io: any, data: any) => {
  await messageController.createMessage(data, io, socket, listSocketID);
};

const handleGetMessage = async (socket: Socket, io: any, data: any) => {
  await messageController.getMessage(data, io, socket, listSocketID);
};

export const handleSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "https://chatapp-vo-huy-khoa.vercel.app",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    socket.on("login", async (userId: string) => {
      await handleLogin(socket, userId);
    });

    socket.on("logout", async (userId: string) => {
      await handleLogout(socket, userId);
    });

    socket.on("message", async (data: any) => {
      await handleMessage(socket, io, data);
    });

    socket.on("get-message", async (data: any) => {
      await handleGetMessage(socket, io, data);
    });
  });

  return io;
};
