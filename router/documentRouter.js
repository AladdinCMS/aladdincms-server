// routes/documentRouter.js
import { Router } from "express";
import { 
  getAllDocuments,
  createDocument,
  updateDocumentTags,
  deleteDocument 
} from "../controllers/documentController.js";

const router = Router();

router.get("/", getAllDocuments);
router.post("/", createDocument);
router.patch("/:id/tags", updateDocumentTags);
router.delete("/:id", deleteDocument);

export const documentRouter = router;