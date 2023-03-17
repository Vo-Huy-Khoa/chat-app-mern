import express from "express";
import Router from "express";
import userController from "../controllers/userController";
import messageController from "../controllers/messageController";
import * as Auth from "../middleware/auth";
import * as Token from "../middleware/token";
const router = Router();
const routers = (app: express.Application) => {
  router.get("/users", Token.authToken, userController.getAll);
  router.post("/login", Auth.Login);
  router.post("/logout", Auth.Logout);
  router.post("/refreshToken", Auth.RefreshToken);
  router.post("/register", Auth.Register);
  router.post("/user/search", Token.authToken, userController.search);
  router.get("/user/profile/:id", Token.authToken, userController.profile);
  router.put("/user/update/:id", Token.authToken, userController.update);
  router.delete("/user/delete/:id", Token.authToken, userController.destroy);
  router.delete("/user/destroy", Token.authToken, userController.destroyAll);
  router.post(
    "/listMessage",
    Token.authToken,
    messageController.getListMessage
  );
  router.post("/message", Token.authToken, messageController.getMessage);
  router.post(
    "/createMessage",
    Token.authToken,
    messageController.createMessage
  );

  return app.use("/api", router);
};

export default routers;
