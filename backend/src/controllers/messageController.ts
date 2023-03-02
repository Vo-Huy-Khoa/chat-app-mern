import { Request, Response } from "express";
import MessageModel from "../models/Message";
import UserModel from "../models/User";

class MessageController {
  async getListMessage(req: Request, res: Response) {
    const { senderID, receiverID } = req.body;
    try {
      const listMessage = await MessageModel.find({
        $or: [{ senderID }, { receiverID }],
      })
        .populate("senderID")
        .populate("receiverID");
      res.status(200).json(listMessage);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async createMessage(data: any, io: any, socket: any, listSocketID: any) {
    const { senderID, receiverID, message } = data;
    const createMessage = new MessageModel({ senderID, receiverID, message });

    try {
      await createMessage.save();
      const [messageSender, messageReceiver, user] = await Promise.all([
        MessageModel.find({ senderID, receiverID })
          .populate("senderID")
          .populate("receiverID"),
        MessageModel.find({ senderID: receiverID, receiverID: senderID })
          .populate("senderID")
          .populate("receiverID"),
        UserModel.findById(receiverID),
      ]);

      const messages = [...messageSender, ...messageReceiver];

      if (user?.socketID && listSocketID.includes(user.socketID)) {
        io.to(user.socketID).emit("message", messages);
      }
      socket.emit("message", messages);
    } catch (error) {
      // res.status(400).json(error);
    }
  }

  async getMessage(req: Request, res: Response) {
    try {
      const message = await MessageModel.find(
        {
          senderID: req.body.senderID,
          receiverID: req.body.receiverID,
        },
        {
          _id: false,
        }
      );

      if (message.length === 0) {
        return res.status(404).json({
          error: "No message found for the given sender and receiver IDs",
        });
      }

      res.status(200).json(message);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

export default new MessageController();
