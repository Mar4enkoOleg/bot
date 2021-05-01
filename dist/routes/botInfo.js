"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const botInfo_controller_1 = require("../controllers/botInfo.controller");
const router = express_1.Router();
router.get('/', botInfo_controller_1.getBotInfo);
exports.default = router;
