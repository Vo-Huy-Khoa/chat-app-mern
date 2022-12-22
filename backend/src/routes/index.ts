import express from "express";
import Router from "express";
import userController from "../controllers/userController";
const router = Router();
const initRoute = (app: express.Application) => {
  router.get("/users", userController.get);
  router.post("/user/login", userController.register);
  router.post("/user/register", userController.register);
  router.get("/user/profile/:id", userController.profile);
  router.put("/user/update/:id", userController.update);
  router.delete("/user/delete/:id", userController.destroy);




  return app.use("/api", router);
};

export default initRoute;
