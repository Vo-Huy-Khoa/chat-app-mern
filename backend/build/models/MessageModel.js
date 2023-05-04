"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    senderID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    receiverID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    message: { type: String },
}, {
    timestamps: true,
});
const MessageModel = (0, mongoose_1.model)("Message", messageSchema);
exports.default = MessageModel;
