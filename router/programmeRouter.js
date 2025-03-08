// routes/programmeRouter.js
import { Router } from "express";
import { 
  getAllProgrammes,
  createProgramme,
  updateProgramme,
  deleteProgramme 
} from "../controllers/programmeController.js";

const router = Router();

router.get("/", getAllProgrammes);
router.post("/", createProgramme);
router.put("/:id", updateProgramme);
router.delete("/:id", deleteProgramme);

export const programmeRouter = router;