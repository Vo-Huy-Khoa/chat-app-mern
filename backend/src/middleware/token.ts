import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const createToken = (user: any) => {
  const JWT_SECRET = process.env.JWT_SECRET || "";
  const payload = { id: user.id, username: user.username };
  let token = null;
  try {
    token = jwt.sign(payload, JWT_SECRET, { expiresIn: "120s" });
  } catch (error) {
    console.error(error);
  }

  return token;
};

const refreshToken = (data: any, token: string) => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
  let payload = { username: data.username };
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
      next();
    }
  } catch (error) {
    res.status(403).json(error);
  }
};

export { createToken, authToken, refreshToken };
