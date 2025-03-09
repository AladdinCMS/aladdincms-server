// routes/documentRouter.js
import { Router } from "express";
import {
  getAllDocuments,
  createDocument,
  updateDocumentTags,
  downloadDocument,
  deleteDocument,
} from "../controller/documentController.js";

const router = Router();

router.get("/", getAllDocuments);
// In your documentRouter.js
router.get("/:id/download", downloadDocument);
router.post("/", createDocument);
router.patch("/:id/tags", updateDocumentTags);
router.delete("/:id", deleteDocument);

export const documentRouter = router;
