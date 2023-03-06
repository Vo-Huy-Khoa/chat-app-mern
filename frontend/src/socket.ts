import io from "socket.io-client";

// const url = "http://localhost:3001";
const url = "https://chat-backend-7jgs.onrender.com";
const socket = io(url, {
  transports: ["websocket"],
});

export default socket;
