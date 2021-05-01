"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userInfo_controller_1 = require("../controllers/userInfo.controller");
const router = express_1.Router();
router.get('/', userInfo_controller_1.getUsersCount);
router.get('/:group', userInfo_controller_1.getUsersByGroup);
exports.default = router;
