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
const User_1 = __importDefault(require("../models/User"));
class userController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userList = yield User_1.default.find();
                res.status(200).json(userList);
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findById(req.params.id);
                res.status(200).json(user);
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield User_1.default.findOneAndUpdate({ _id: req.body.params }, {
                    username: req.body.username,
                    password: req.body.password,
                }, { new: true } // return the updated document
                );
                res.status(200).json(updatedUser);
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const regex = new RegExp(req.body.username, "i");
                const user = yield User_1.default.find({
                    username: regex,
                });
                res.status(200).json(user);
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.deleteOne({ _id: req.body.params });
                res.status(200).json(user);
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    destroyAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedUser = yield User_1.default.deleteMany({});
                res.status(200).json(deletedUser);
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
}
exports.default = new userController();
