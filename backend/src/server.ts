import express from "express";
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

const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(options));

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);
connect();

io.on("connection", (socket) => {
  console.log(`Client connected with socket id ${socket.id}`);

  // Handle user login
  socket.on("login", async (userId) => {
    console.log(`User ${userId} logged in with socket id ${socket.id}`);
    // Store the socket ID for the user in the database
    await UserModel.findById(
      { _id: userId },
      {
        socketId: socket.id,
      }
    );

    // Notify the user that they have successfully logged in
    socket.emit("login_success", { userId, socketId: socket.id });
  });
  socket.on("logout", async (userId) => {
    console.log(`User ${userId} logged in with socket id ${socket.id}`);
    // Store the socket ID for the user in the database
    await UserModel.findById(
      { _id: userId },
      {
        socketId: "",
      }
    );

    // Notify the user that they have successfully logged in
    socket.emit("logout_success", { userId, socketId: socket.id });
  });
  // Handle incoming messages
  socket.on("message", async (data) => {
    await messageController.createMessage(data, io);
  });
});
server.listen(PORT, () => {
  console.log(`Server listing at port: ${PORT}`);
});

export { io };
