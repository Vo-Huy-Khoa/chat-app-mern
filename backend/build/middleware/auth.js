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
exports.Logout = exports.RefreshToken = exports.Login = exports.Register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Token = __importStar(require("./token"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    const createUser = new User_1.default({
        fullname: req.body.fullname,
        username: req.body.username,
        avatar: req.body.avatar,
        password: bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(10)),
    });
    try {
        yield createUser.save();
        res.status(201).json(createUser);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.Register = Register;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    const user = yield User_1.default.findOne({
        username: req.body.username,
    });
    if (!user || !bcrypt_1.default.compareSync(password, user.password)) {
        res.status(400).json("Login Fail!");
    }
    else {
        const token = Token.createToken(user) || "";
        const refreshToken = Token.refreshToken(user, token);
        yield User_1.default.updateOne({
            username: user.username,
        }, {
            refreshToken: refreshToken,
        }).then(() => {
            res.status(200).json({
                user: {
                    id: user.id,
                },
                token,
                refreshToken,
            });
        });
    }
});
exports.Login = Login;
const RefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
    const JWT_SECRET = process.env.JWT_SECRET || "";
    const refreshToken = req.body.token;
    const userId = req.body.id;
    if (!refreshToken || !userId)
        res.sendStatus(401);
    yield User_1.default.findById({ _id: userId }).then((data) => {
        if (!(data === null || data === void 0 ? void 0 : data.refreshToken) === refreshToken)
            res.sendStatus(403);
        jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, data) => {
            if (err)
                res.sendStatus(403);
            const accessToken = jsonwebtoken_1.default.sign({ id: userId, username: data.username }, JWT_SECRET, { expiresIn: "3600s" });
            res.status(201).json({ token: accessToken });
        });
    });
});
exports.RefreshToken = RefreshToken;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.id;
    yield User_1.default.updateOne({ _id: userId }, { refreshToken: "" }).then(() => {
        res.sendStatus(200);
    });
});
exports.Logout = Logout;
