import { Request, Response, NextFunction } from "express";
import UserModel from "../models/User";
import bcrypt from "bcrypt";
import * as Token from "./token";

//authorization: uy quyen truy cap
//authentication: xac thuc thong tin dang nhap

const Register = async (req: Request, res: Response) => {
  const password = req.body.password;
  const createUser = new UserModel({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  });

  try {
    await createUser.save();
    res.status(201).json(createUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

const Login = async (req: Request, res: Response) => {
  const password = req.body.password;
  const user = await UserModel.findOne({
    username: req.body.username,
  });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(400).json("Login Fail!");
  } else {
    const token = Token.createToken(user);
    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        fullname: user.fullname
      }, token
    });
  }
};
export { Register, Login };
