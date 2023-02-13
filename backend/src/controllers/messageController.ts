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

  async createMessage(req: Request, res: Response) {
    const createMessage = new MessageModel({
      senderID: req.body.senderID,
      receiverID: req.body.receiverID,
      message: req.body.message,
    });

    try {
      await createMessage.save();
      const listMessage = await MessageModel.find({
        $or: [
          { senderID: req.body.senderID },
          { receiverID: req.body.receiverID },
        ],
      });

      const listSenderID = listMessage.filter((message) => {
        return (
          message?.senderID === req.body.senderID &&
          message?.receiverID === req.body.receiverID
        );
      });
      const listReceiverID = listMessage.filter((message) => {
        return (
          message?.senderID === req.body.receiverID &&
          message?.receiverID === req.body.senderID
        );
      });
      const currentMessage = [...listSenderID, ...listReceiverID];

      console.log(currentMessage);

      res.status(201).json(currentMessage);
    } catch (error) {
      res.status(400).json(error);
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
