import io from "socket.io-client";

const url = "https://chat-app-u9j0.onrender.com";
const socket = io(url, {
  transports: ["websocket"],
});

export default socket;
