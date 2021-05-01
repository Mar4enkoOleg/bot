"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questionsNoAnswer_controller_1 = require("../controllers/questionsNoAnswer.controller");
const router = express_1.Router();
router.get('/', questionsNoAnswer_controller_1.getNoAnswerQuestions);
router.delete('/', questionsNoAnswer_controller_1.deleteAllNoAnswerQuestions);
router.delete('/:id', questionsNoAnswer_controller_1.deleteNoAnswerQuestionById);
exports.default = router;
