import { Request, Response, NextFunction } from "express";
import UserModel from "../models/User";
import bcrypt from "bcrypt";
import * as Token from "./token";

//authorization: uy quyen truy cap
//authentication: xac thuc thong tin dang nhap

const Register = async (req: Request, res: Response) => {
  const password = req.body.password;
  const createUser = new UserModel({
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
  const account = await UserModel.findOne({
    username: req.body.username,
  });

  if (!account || !bcrypt.compareSync(password, account.password)) {
    res.status(400).json("Login Fail!");
  } else {
    const token = Token.createToken(account);
    res.status(200).json({ token });
  }
};
export { Register, Login };
