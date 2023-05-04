import express from "express";
import Router from "express";
import authRoute from "./authRoute";
import userRoute from "./userRoute";
import messageRoute from "./messageRoute";

const router = Router();
const routes = (app: express.Application) => {
  router.use("/auth", authRoute);
  router.use("/user", userRoute);
  router.use("/message", messageRoute);

  return app.use("/api", router);
};

export default routes;
