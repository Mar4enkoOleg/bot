import { Router } from "express";
import { getBotInfo } from "./botInfo.controller";
import { getCafedraInfo, updateCafedraInfo } from "./cafedraInfo.controller";

const router = Router();

router.get("/bot", getBotInfo);
router.get("/cafedra", getCafedraInfo);
router.put("/cafedra", updateCafedraInfo);

export default router;
