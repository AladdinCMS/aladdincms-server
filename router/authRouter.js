import { Router } from "express";
import { signUp, login } from "../controller/authController.js";

const router = Router();

router.post("/signUp", signUp);
router.post("/login", login);

export const authRouter = router;
