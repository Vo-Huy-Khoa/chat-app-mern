import { Request, Response, NextFunction } from "express";
import UserModel from "../models/User";
import bcrypt from "bcrypt";
import * as Token from "./token";
import jwt from "jsonwebtoken";

//authorization: uy quyen truy cap
//authentication: xac thuc thong tin dang nhap

const Register = async (req: Request, res: Response) => {
  const password = req.body.password;
  const createUser = new UserModel({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    avatar: req.body.avatar,
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
    const token = Token.createToken(user) || "";
    const refreshToken = Token.refreshToken(user, token);
    await UserModel.findOne(
      {
        username: user.username,
      },
      {
        refreshToken: refreshToken,
      }
    ).then(() => {
      res.status(200).json({
        user: {
          id: user.id,
        },
        token,
        refreshToken,
      });
    });
  }
};

const RefreshToken = (req: Request, res: Response) => {
  const jwt_freshToken = process.env.REFRESH_TOKEN_SECRET || "";
  const refreshToken = req.body.token;
  const userId = req.body.id;
  if (!refreshToken || !userId) res.sendStatus(401);
  UserModel.findById({ _id: userId }).then((data) => {
    if (!data?.refreshToken === refreshToken) res.sendStatus(403);
    jwt.verify(refreshToken, jwt_freshToken, (err: any, data: any) => {
      if (err) res.sendStatus(403);
      const accessToken = jwt.sign({ username: data.username }, jwt_freshToken);
      res.status(201).json(accessToken);
    });
  });
};
export { Register, Login, RefreshToken };
