"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const infoController_1 = require("./infoController");
const router = express_1.Router();
router.get('/bot', infoController_1.getBotInfo);
router.get('/cafedra', infoController_1.getCafedraInfo);
router.put('/cafedra', infoController_1.updateCafedraInfo);
exports.default = router;
