"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const messageController_1 = __importDefault(require("../controllers/messageController"));
const Auth = __importStar(require("../middleware/auth"));
const Token = __importStar(require("../middleware/token"));
const router = (0, express_1.default)();
const routers = (app) => {
    router.get("/users", Token.authToken, userController_1.default.getAll);
    router.post("/login", Auth.Login);
    router.post("/logout", Auth.Logout);
    router.post("/refreshToken", Auth.RefreshToken);
    router.post("/register", Auth.Register);
    router.post("/user/search", Token.authToken, userController_1.default.search);
    router.get("/user/profile/:id", Token.authToken, userController_1.default.profile);
    router.put("/user/update/:id", Token.authToken, userController_1.default.update);
    router.delete("/user/delete/:id", Token.authToken, userController_1.default.destroy);
    router.delete("/user/destroy", Token.authToken, userController_1.default.destroyAll);
    router.post("/listMessage", Token.authToken, messageController_1.default.getListMessage);
    router.post("/message", Token.authToken, messageController_1.default.getMessage);
    router.post("/createMessage", Token.authToken, messageController_1.default.createMessage);
    return app.use("/api", router);
};
exports.default = routers;
