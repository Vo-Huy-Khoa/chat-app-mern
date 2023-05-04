import { Router } from "express";
import * as Auth from "../middleware/auth";

const router = Router();

router.post("/login", Auth.Login);
router.post("/logout", Auth.Logout);
router.post("/refreshToken", Auth.RefreshToken);
router.post("/register", Auth.Register);

export default router;
