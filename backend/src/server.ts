import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connect from "./configs/db";
import dotenv from "dotenv";
import routes from "./routes";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || "3001";
const allowedOrigins = [`http://localhost:${PORT}`];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);
connect();

app.listen(PORT, () => {
  console.log(`Server listing at port: ${PORT}`);
});

//checking server connect client successfully
io.on("connection", (socket) => {
  console.log("A user connected");

  //checking client logout
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  //if client send socket name
  socket.on("client-send-data", function (data) {
    console.log(socket.id + " send: " + data);
    //server send all client
    // io.sockets.emit("server-send-data", "hello a client");

    //server send my socket
    // socket.emit("server-send-data", "hello all client");

    //server send all client minus my socket
    // socket.broadcast.emit("server-send-data", "hello all client");

    //send to a client
    // io.to("").emit("foo", "bar");
  });
});
