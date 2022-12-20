import { Request, Response } from "express";
import UserModel from "../models/User";

class userController {
  async get(req: Request, res: Response) {
    await UserModel.find()
      .then((userList) => {
        res.status(200).json(userList);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  }

  async register(req: Request, res: Response) {
    const createUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
    });
    try {
      await createUser.save();
      res.json(createUser);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

export default new userController();
