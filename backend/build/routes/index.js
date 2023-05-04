"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = __importDefault(require("./authRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
const messageRoute_1 = __importDefault(require("./messageRoute"));
const router = (0, express_1.default)();
const routes = (app) => {
    router.use("/auth", authRoute_1.default);
    router.use("/user", userRoute_1.default);
    router.use("/message", messageRoute_1.default);
    return app.use("/api", router);
};
exports.default = routes;
