"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    fullname: { type: String },
    username: { type: String },
    password: { type: String },
    avatar: { type: String },
    refreshToken: { type: String },
    socketID: { type: String },
}, {
    timestamps: true,
});
userSchema.methods.encryptPassword = function (password) {
    return bcrypt_1.default.hashSync(password, bcrypt_1.default.genSaltSync(5));
};
userSchema.methods.validPassword = function (password) {
    return bcrypt_1.default.compareSync(password, this.password);
};
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
