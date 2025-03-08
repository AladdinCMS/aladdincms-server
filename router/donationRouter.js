// routes/donationRouter.js
import { Router } from "express";
import { 
  getAllDonations,
  createDonation,
  getDonationStats 
} from "../controllers/donationController.js";

const router = Router();

router.get("/", getAllDonations);
router.get("/stats", getDonationStats);
router.post("/", createDonation);

export const donationRouter = router;