import { Router } from "express";
import * as Token from "../middleware/token";
import messageController from "../controllers/messageController";

const router = Router();

router.post("/list", Token.authToken, messageController.list);
router.post("/find", Token.authToken, messageController.find);
router.post("/create", Token.authToken, messageController.create);

export default router;
