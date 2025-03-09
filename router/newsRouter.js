// routes/newsRouter.js
import { Router } from "express";
import { 
  getAllNews,
  createNews,
  updateNews,
  deleteNews 
} from "../controller/newsController.js";

const router = Router();

router.get("/", getAllNews);
router.post("/", createNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

export const newsRouter = router;