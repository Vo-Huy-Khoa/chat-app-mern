import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const createToken = (user: any) => {
  const JWT_SECRET = process.env.JWT_SECRET || "";
  let payload = user;
  let token = null;
  try {
    token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30s" });
    // console.log(token);
  } catch (error) {
    console.log(error);
  }

  return token;
};

const verifyToken = (token: any) => {
  const key = process.env.JWT_SECRET || "";
  let data: any = null;

  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (error) {
    console.log(error);
  }
  return data;
};

const authToken = (
  req: Request,
  res: Response,
  next: NextFunction,
  jwt: any
) => {
  // const authorizationHeader = req.headers['authorization'];
  // const token = authorizationHeader?.split(' ')[1];
  // if (!token) {
  //     res.status(401);
  // }

  try {
    const isVeriToken = verifyToken(jwt);
    if (isVeriToken) {
      console.log(isVeriToken);
      console.log("verify token");

      next();
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

export { createToken, verifyToken };
