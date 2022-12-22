import { Request, Response, NextFunction } from "express";
import UserModel from "../models/User";
import bcrypt from "bcrypt";
import * as token from "./token";

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

const auth = async (req: Request, res: Response, next: NextFunction) => {
    interface CustomRequest extends Request {
        token: process.env.JWT_SECRET;
       }
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
     
        if (!token) {
          throw new Error();
        }
     
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded;
     
        next();
      } catch (err) {
        res.status(401).send('Please authenticate');
      }
    next();
};

const Login = async (req: Request, res: Response) => {
  const password = req.body.password;
  const account = await UserModel.findOne({
    username: req.body.username,
  });

  if (!account || !bcrypt.compareSync(password, account.password)) {
    res.status(400).json("Login Fail!");
  } else {
    res.status(200).json("Login Successfully!");
  }
};
export { Register, auth, Login };
