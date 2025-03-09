import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  signUp,
  updateUser,
} from "../controller/authController.js";

const router = Router();

router.post("/signUp", signUp);
router.get("/get-all-users", getAllUsers);
router.get("/get-a-user/:id", getAllUsers);
router.patch("/get-a-user/:id", updateUser);
router.delete("/get-a-user/:id", deleteUser);

export const authRouter = router;
