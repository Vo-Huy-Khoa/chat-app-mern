import express, {Request, Response, NextFunction} from "express";
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

const allowedOrigins = "*";
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(options));

app.use(function(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

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
    // Store the socket ID for the user in the database
    await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        socketID: socket.id,
      }
    );

    // Notify the user that they have successfully logged in
    socket.emit("login_success", { userId, socketId: socket.id });
  });
  socket.on("logout", async (userId) => {
    listSocketID.pop(socket.id);
    console.log(`User ${userId} logged in with socket id ${socket.id}`);
    // Store the socket ID for the user in the database
    await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        socketID: "",
      }
    );

    // Notify the user that they have successfully logged in
    socket.emit("logout_success", { userId, socketId: socket.id });
  });
  // Handle incoming messages
  socket.on("message", async (data) => {
    await messageController.createMessage(data, io, socket, listSocketID);
  });
});
server.listen(PORT, () => {
  console.log(`Server listing at port: ${PORT}`);
});

export { io };
