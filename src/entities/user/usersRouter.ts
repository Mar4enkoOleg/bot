import { Router } from "express";
import {
  getAll,
  remove,
  getById,
  update,
  add,
  getUserByParams,
} from "./userController";

const router = Router();

router.post("/", add);
router.get("/", getAll);

router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", remove);

router.get("/byparams/", getUserByParams);

export default router;
