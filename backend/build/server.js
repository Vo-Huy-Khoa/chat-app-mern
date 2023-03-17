"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./configs/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const messageController_1 = __importDefault(require("./controllers/messageController"));
const User_1 = __importDefault(require("./models/User"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
exports.io = io;
const PORT = process.env.PORT || "3001";
const allowedOrigins = [
    "http://localhost:3000",
    "https://chatapp-vo-huy-khoa.vercel.app",
];
const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, routes_1.default)(app);
(0, db_1.default)();
const listSocketID = [];
const handleLogin = (socket, userId) => __awaiter(void 0, void 0, void 0, function* () {
    listSocketID.push(socket.id);
    console.log(`User ${userId} logged in with socket id ${socket.id}`);
    yield User_1.default.findOneAndUpdate({ _id: userId }, { socketID: socket.id });
    socket.emit("login_success", { userId, socketId: socket.id });
});
const handleLogout = (socket, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const index = listSocketID.indexOf(socket.id);
    if (index !== -1) {
        listSocketID.splice(index, 1);
    }
    console.log(`User ${userId} logged out with socket id ${socket.id}`);
    yield User_1.default.findOneAndUpdate({ _id: userId }, { socketID: "" });
    socket.emit("logout_success", { userId, socketId: socket.id });
});
const handleMessage = (socket, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield messageController_1.default.createMessage(data, io, socket, listSocketID);
});
const handleGetMessage = (socket, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield messageController_1.default.getMessage(data, io, socket, listSocketID);
});
io.on("connection", (socket) => {
    console.log(`Client connected with socket id ${socket.id}`);
    socket.on("login", (userId) => __awaiter(void 0, void 0, void 0, function* () {
        yield handleLogin(socket, userId);
    }));
    socket.on("logout", (userId) => __awaiter(void 0, void 0, void 0, function* () {
        yield handleLogout(socket, userId);
    }));
    socket.on("message", (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield handleMessage(socket, data);
    }));
    socket.on("get-message", (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield handleGetMessage(socket, data);
    }));
});
server.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});
