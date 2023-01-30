import { Schema, model } from "mongoose";

interface IMessage {
  senderID: {
    type: Schema.Types.ObjectId;
    ref: "User";
  };
  receiverID: {
    type: Schema.Types.ObjectId;
    ref: "User";
  };
  message: string;
}

const messageSchema = new Schema<IMessage>(
  {
    senderID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiverID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

const MessageModel = model<IMessage>("Message", messageSchema);

export default MessageModel;
