import { Router } from "express";
import {
  createSubject,
  deleteSubject,
  getAllSubjects,
  getSubject,
  updateSubject,
} from "./subjectController";

const router = Router();

router.get("/", getAllSubjects);
router.get("/:id", getSubject);
router.post("/", createSubject);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

export default router;
