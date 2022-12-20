import express from "express";
import Router from "express";
import userController from "../controllers/userController";
const router = Router();
const initRoute = (app: express.Application) => {
  router.get("/users", userController.get);

  return app.use("/api", router);
};

export default initRoute;
