// routes/donationRouter.js
import { Router } from "express";
import { 
  getAllDonations,
  createDonation,
  getDonationStats,
  deleteDonation,
  deleteAllDonations
} from "../controller/donationController.js";

const router = Router();

router.get("/", getAllDonations);
router.get("/stats", getDonationStats);
router.post("/", createDonation);
router.delete("/:id", deleteDonation);
router.delete("/all", deleteAllDonations);

export const donationRouter = router;