"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cafedraInfo_controller_1 = require("../controllers/cafedraInfo.controller");
const router = express_1.Router();
router.get('/', cafedraInfo_controller_1.getCafedraInfo);
router.put('/', cafedraInfo_controller_1.updateCafedraInfo);
exports.default = router;
