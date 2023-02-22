import io from "socket.io-client";

const socket = io("https://chat-backend-7jgs.onrender.com", {
  transports: ["websocket"],
});

export default socket;
