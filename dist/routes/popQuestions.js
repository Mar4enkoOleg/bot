"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const popularQuestions_controller_1 = require("../controllers/popularQuestions.controller");
const router = express_1.Router();
router.get('/', popularQuestions_controller_1.getPopularQuestions);
exports.default = router;
