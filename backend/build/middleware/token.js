"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.authToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (user) => {
    const JWT_SECRET = process.env.JWT_SECRET || "";
    const payload = { id: user.id, username: user.username };
    let token = null;
    try {
        token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: "120s" });
    }
    catch (error) {
        console.error(error);
    }
    return token;
};
exports.createToken = createToken;
const refreshToken = (data, token) => {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
    let payload = { username: data.username };
    try {
        token = jsonwebtoken_1.default.sign(payload, REFRESH_TOKEN_SECRET);
    }
    catch (error) {
        console.log(error);
    }
    return token;
};
exports.refreshToken = refreshToken;
const authToken = (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    const token = (authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(" ")[1]) || "";
    if (!token) {
        res.status(401).json({ message: "Token is not provided" });
    }
    try {
        const key = process.env.JWT_SECRET || "";
        let isVeriToken = jsonwebtoken_1.default.verify(token, key);
        if (isVeriToken) {
            next();
        }
    }
    catch (error) {
        res.status(403).json(error);
    }
};
exports.authToken = authToken;
