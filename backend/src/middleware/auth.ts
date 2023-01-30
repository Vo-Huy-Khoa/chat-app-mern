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
    await UserModel.updateOne(
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

const RefreshToken = async (req: Request, res: Response) => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
  const JWT_SECRET = process.env.JWT_SECRET || "";
  const refreshToken = req.body.token;
  const userId = req.body.id;
  if (!refreshToken || !userId) res.sendStatus(401);
  await UserModel.findById({ _id: userId }).then((data) => {
    if (!data?.refreshToken === refreshToken) res.sendStatus(403);
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, data: any) => {
      console.log(data);

      if (err) res.sendStatus(403);
      const accessToken = jwt.sign(
        { id: userId, username: data.username },
        JWT_SECRET,
        { expiresIn: "3600s" }
      );
      res.status(201).json({ token: accessToken });
    });
  });
};

const Logout = async (req: Request, res: Response) => {
  const userId = req.body.id;
  await UserModel.updateOne({ _id: userId }, { refreshToken: "" }).then(() => {
    res.sendStatus(200);
  });
};
export { Register, Login, RefreshToken, Logout };
