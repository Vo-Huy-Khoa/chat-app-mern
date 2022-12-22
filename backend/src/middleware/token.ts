import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, response } from "express";

const createToken = (user: any) => {
  const JWT_SECRET = process.env.JWT_SECRET || "";
  let payload = { username: user.username, email: user.email };
  let token = null;
  try {
    token = jwt.sign(payload, JWT_SECRET, { expiresIn: "15s" });
  } catch (error) {
    console.log(error);
  }

  return token;
};

const refreshToken = (user: any) => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
  let payload = { username: user.username, email: user.email };
  let token = null;
  try {
    token = jwt.sign(payload, REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.log(error);
  }

  return token;
};

const authToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader?.split(" ")[1] || "";
  if (!token) {
    res.status(401).json({ message: "Token is not provided" });
  }

  try {
    const key = process.env.JWT_SECRET || "";
    let isVeriToken = jwt.verify(token, key);
    if (isVeriToken) {
      console.log(isVeriToken);
      next();
    }
  } catch (error) {
    res.status(403).json(error);
  }
};

export { createToken, authToken };
