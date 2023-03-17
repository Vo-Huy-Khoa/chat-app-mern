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
const Message_1 = __importDefault(require("../models/Message"));
const User_1 = __importDefault(require("../models/User"));
class MessageController {
    getListMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senderID, receiverID } = req.body;
            try {
                const listMessage = yield Message_1.default.find({
                    $or: [{ senderID }, { receiverID }],
                })
                    .populate("senderID")
                    .populate("receiverID");
                res.status(200).json(listMessage);
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    createMessage(data, io, socket, listSocketID) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senderID, receiverID, message } = data;
            const newMessage = new Message_1.default({ senderID, receiverID, message });
            try {
                yield newMessage.save();
                const [messagesFromSender, messagesFromReceiver, receiver] = yield Promise.all([
                    Message_1.default.find({ senderID, receiverID })
                        .populate("senderID")
                        .populate("receiverID"),
                    Message_1.default.find({ senderID: receiverID, receiverID: senderID })
                        .populate("senderID")
                        .populate("receiverID"),
                    User_1.default.findById(receiverID),
                ]);
                const messages = [...messagesFromSender, ...messagesFromReceiver];
                if ((receiver === null || receiver === void 0 ? void 0 : receiver.socketID) && listSocketID.includes(receiver.socketID)) {
                    io.to(receiver.socketID).emit("message", messages);
                }
                socket.emit("message", messages);
                const listMessage = yield Message_1.default.find({
                    $or: [{ senderID: senderID }, { receiverID: senderID }],
                })
                    .populate("senderID")
                    .populate("receiverID");
                socket.emit("listMessage", listMessage);
            }
            catch (error) {
                // res.status(400).json(error);
            }
        });
    }
    getMessage(data, io, socket, listSocketID) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senderID, receiverID } = data;
            try {
                const [messageSender, messageReceiver, user] = yield Promise.all([
                    Message_1.default.find({ senderID, receiverID })
                        .populate("senderID")
                        .populate("receiverID"),
                    Message_1.default.find({ senderID: receiverID, receiverID: senderID })
                        .populate("senderID")
                        .populate("receiverID"),
                    User_1.default.findById(receiverID),
                ]);
                const messages = [...messageSender, ...messageReceiver];
                if ((user === null || user === void 0 ? void 0 : user.socketID) && listSocketID.includes(user.socketID)) {
                    io.to(user.socketID).emit("message", messages);
                }
                socket.emit("message", messages);
                const listMessage = yield Message_1.default.find({
                    $or: [{ senderID: senderID }, { receiverID: senderID }],
                })
                    .populate("senderID")
                    .populate("receiverID");
                socket.emit("listMessage", listMessage);
            }
            catch (error) {
                // res.status(400).json(error);
            }
        });
    }
}
exports.default = new MessageController();
