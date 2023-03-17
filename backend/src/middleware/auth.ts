import { Request, Response } from "express";
import UserModel from "../models/User";
import bcrypt from "bcrypt";
import * as Token from "./token";
import jwt from "jsonwebtoken";

const Register = async (req: Request, res: Response) => {
  try {
    const { fullname, username, avatar, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = new UserModel({
      fullname,
      username,
      avatar,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to register user" });
  }
};

const Login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json("Login Fail!");
    }

    const token = Token.createToken(user) || "";
    const refreshToken = Token.refreshToken(user, token);

    await UserModel.updateOne({ username }, { refreshToken });

    return res.status(200).json({
      user: { id: user.id },
      token,
      refreshToken,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal Server Error");
  }
};

const RefreshToken = async (req: Request, res: Response) => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
  const JWT_SECRET = process.env.JWT_SECRET || "";
  const { token: refreshToken, id: userId } = req.body;
  if (!refreshToken || !userId) {
    return res.sendStatus(401);
  }
  try {
    const user = await UserModel.findById(userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.sendStatus(403);
    }
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, decoded: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      const accessToken = jwt.sign(
        { id: userId, username: decoded.username },
        JWT_SECRET,
        { expiresIn: "3600s" }
      );
      return res.status(201).json({ token: accessToken });
    });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const Logout = async (req: Request, res: Response) => {
  const userId = req.body.id;
  await UserModel.updateOne({ _id: userId }, { refreshToken: "" }).then(() => {
    res.sendStatus(200);
  });
};
export { Register, Login, RefreshToken, Logout };
