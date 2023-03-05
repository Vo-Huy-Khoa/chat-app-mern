import { Request, Response } from "express";
import UserModel from "../models/User";

class userController {
  async getAll(req: Request, res: Response) {
    try {
      const userList = await UserModel.find();
      res.status(200).json(userList);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async profile(req: Request, res: Response) {
    try {
      const user = await UserModel.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: req.body.params },
        {
          username: req.body.username,
          password: req.body.password,
        },
        { new: true } // return the updated document
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async search(req: Request, res: Response) {
    try {
      const regex = new RegExp(req.body.username, "i");
      const user = await UserModel.find({
        username: regex,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const user = await UserModel.deleteOne({ _id: req.body.params });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async destroyAll(req: Request, res: Response) {
    try {
      const deletedUser = await UserModel.deleteMany({});
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

export default new userController();
