import express from "express";
import Router from "express";
import userController from "../controllers/userController";
import * as auth from "../middleware/auth";
const router = Router();
const initRoute = (app: express.Application) => {
  router.get("/users", userController.get);
  router.post("/login", auth.auth, auth.Login);
  router.post("/register", auth.Register);
  router.get("/user/profile/:id", userController.profile);
  router.put("/user/update/:id", userController.update);
  router.delete("/user/delete/:id", userController.destroy);
  router.delete("/user/destroy", userController.destroyAll);

  return app.use("/api", router);
};

export default initRoute;
