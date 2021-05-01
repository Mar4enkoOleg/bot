"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoAnswerQuestionById = exports.deleteAllNoAnswerQuestions = exports.getNoAnswerQuestions = void 0;
const logFunc_1 = require("../helpers/logFunc");
const questionsNoAnswer_1 = __importDefault(require("../db/models/questionsNoAnswer"));
const project_settings_1 = require("../project_settings");
const ApiError_1 = __importDefault(require("../error/ApiError"));
const getNoAnswerQuestions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logFunc_1.logs(req, res);
    try {
        const noAnswer = yield questionsNoAnswer_1.default.findAll({ limit: project_settings_1.noAnswerSettings.limitQuestions });
        if (!noAnswer.length) {
            return next(ApiError_1.default.badRequest(`List no answer questions is empty`));
        }
        return res.status(200).json(noAnswer);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.getNoAnswerQuestions = getNoAnswerQuestions;
const deleteAllNoAnswerQuestions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logFunc_1.logs(req, res);
    try {
        yield questionsNoAnswer_1.default.destroy({ where: {}, truncate: true });
        return res.status(200).json({ message: `All no answer questions was deleted` });
    }
    catch (error) {
        return next(ApiError_1.default.forbidden(error.message));
    }
});
exports.deleteAllNoAnswerQuestions = deleteAllNoAnswerQuestions;
const deleteNoAnswerQuestionById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logFunc_1.logs(req, res);
    try {
        const id = parseInt(req.params.id);
        const deleteQuestion = yield questionsNoAnswer_1.default.findOne({ where: { id } });
        if (!deleteQuestion) {
            return next(ApiError_1.default.badRequest(`No answer question with id=${id} not exist`));
        }
        yield questionsNoAnswer_1.default.destroy({ where: { id } });
        return res.status(200).json({ message: `Question with id=${id} deleted` });
    }
    catch (error) {
        return next(ApiError_1.default.forbidden(error.message));
    }
});
exports.deleteNoAnswerQuestionById = deleteNoAnswerQuestionById;
