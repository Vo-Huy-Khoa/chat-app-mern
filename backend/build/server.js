"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./configs/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const http_1 = __importDefault(require("http"));
const socket_1 = require("./socket");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
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
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, routes_1.default)(app);
(0, db_1.default)();
(0, socket_1.handleSocket)(server);
server.listen(PORT, () => {
    console.log(`Server listing at port: ${PORT}`);
});
