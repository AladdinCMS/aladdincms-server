import { Router } from "express";
import { 
  login, 
  getAllAdmins, 
  getAdminById,
  createAdmin,
  updateAdmin, 
  deleteAdmin 
} from "../controller/adminController.js";
import { verifyToken, isSuperAdmin } from "../middleware/auth.js";

const router = Router();

// Authentication routes
router.post("/signIn", login);

// Admin management routes (protected)
router.get("/get-all-admins", verifyToken, getAllAdmins);
router.get("/get-admin/:id", verifyToken, getAdminById);
router.post("/create-admin", verifyToken, isSuperAdmin, createAdmin);
router.patch("/update-admin/:id", verifyToken, updateAdmin);
router.delete("/delete-admin/:id", verifyToken, isSuperAdmin, deleteAdmin);

export const adminRouter = router;