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
exports.handleSocket = void 0;
const socket_io_1 = require("socket.io");
const User_1 = __importDefault(require("./models/User"));
const messageController_1 = __importDefault(require("./controllers/messageController"));
const listSocketID = [];
const handleLogin = (socket, userId) => __awaiter(void 0, void 0, void 0, function* () {
    listSocketID.push(socket.id);
    yield User_1.default.findOneAndUpdate({ _id: userId }, { socketID: socket.id });
    socket.emit("login_success", { userId, socketId: socket.id });
});
const handleLogout = (socket, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const index = listSocketID.indexOf(socket.id);
    if (index !== -1) {
        listSocketID.splice(index, 1);
    }
    yield User_1.default.findOneAndUpdate({ _id: userId }, { socketID: "" });
    socket.emit("logout_success", { userId, socketId: socket.id });
});
const handleMessage = (socket, io, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield messageController_1.default.createMessage(data, io, socket, listSocketID);
});
const handleGetMessage = (socket, io, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield messageController_1.default.getMessage(data, io, socket, listSocketID);
});
const handleSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: [
                "http://localhost:3000",
                "https://chatapp-vo-huy-khoa.vercel.app",
            ],
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        socket.on("login", (userId) => __awaiter(void 0, void 0, void 0, function* () {
            yield handleLogin(socket, userId);
        }));
        socket.on("logout", (userId) => __awaiter(void 0, void 0, void 0, function* () {
            yield handleLogout(socket, userId);
        }));
        socket.on("message", (data) => __awaiter(void 0, void 0, void 0, function* () {
            yield handleMessage(socket, io, data);
        }));
        socket.on("get-message", (data) => __awaiter(void 0, void 0, void 0, function* () {
            yield handleGetMessage(socket, io, data);
        }));
    });
    return io;
};
exports.handleSocket = handleSocket;
