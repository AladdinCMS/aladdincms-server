import { Router } from "express";
import { signUp } from "../controller/authController.js";

const router = Router();

router.post("/signUp", signUp);

export const authRouter = router;
