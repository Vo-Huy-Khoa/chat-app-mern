import { Router } from "express";
import * as Token from "../middleware/token";
import userController from "../controllers/userController";

const router = Router();

router.post("/search", Token.authToken, userController.search);
router.get("/profile/:id", Token.authToken, userController.profile);
router.put("/update/:id", Token.authToken, userController.update);
router.delete("/delete/:id", Token.authToken, userController.destroy);
router.delete("/destroy", Token.authToken, userController.destroyAll);
router.get("/", Token.authToken, userController.list);

export default router;
