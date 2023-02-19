import MessageModel from "../models/Message";
import { Request, Response } from "express";

class MessageController {
  async getListMessage(req: Request, res: Response) {
    try {
      await MessageModel.find({
        $or: [
          { senderID: req.body.senderID },
          { receiverID: req.body.receiverID },
        ],
      })
        .populate("senderID")
        .populate("receiverID")
        .then((listMessage) => {
          res.status(200).json(listMessage);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async createMessage(data: any, io: any) {
    const createMessage = new MessageModel({
      senderID: data.senderID,
      receiverID: data.receiverID,
      message: data.message,
    });

    try {
      await createMessage.save();
      const messageSender = await MessageModel.find({
        senderID: data.senderID,
        receiverID: data.receiverID,
      })
        .populate("senderID")
        .populate("receiverID");
      const messageReceiver = await MessageModel.find({
        senderID: data.receiverID,
        receiverID: data.senderID,
      })
        .populate("senderID")
        .populate("receiverID");

      const message = [...messageSender, ...messageReceiver];

      // Send the message to the other client
      io.to("").emit("message", data);
      // io.emit("message", message);

      // res.status(201).json(message);
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
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

export default new MessageController();
