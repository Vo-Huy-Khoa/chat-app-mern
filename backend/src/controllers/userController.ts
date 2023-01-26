import { Request, Response } from "express";
import UserModel from "../models/User";

class userController {
  async getAll(req: Request, res: Response) {
    try {
      await UserModel.find()
        .then((userList) => {
          res.status(200).json(userList);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async profile(req: Request, res: Response) {
    try {
      await UserModel.findById({ _id: req.params.id })
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      await UserModel.findById(
        { _id: req.body.params },
        {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        }
      )
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async search(req: Request, res: Response) {
    try {
      await UserModel.find({
        username: new RegExp("^" + req.body.username + "$", "i"),
      })
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      await UserModel.deleteOne({ _id: req.body.params })
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async destroyAll(req: Request, res: Response) {
    try {
      await UserModel.deleteMany({})
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new userController();
