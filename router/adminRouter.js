import { Router } from "express";
import { login, signUp } from "../controller/adminController.js";

const router = Router();

router.post("/signUp", signUp);
router.post("/signIn", login);
// router.get("/get-all-users", getAllUsers);
// router.get("/get-a-user/:id", getAllUsers);
// router.patch("/update-a-user/:id", updateUser);
// router.delete("/delete-a-user/:id", deleteUser);

export const adminRouter = router;
  