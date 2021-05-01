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
exports.getPopularQuestions = void 0;
const logFunc_1 = require("../helpers/logFunc");
const question_1 = __importDefault(require("../db/models/question"));
const ApiError_1 = __importDefault(require("../error/ApiError"));
const project_settings_1 = require("../project_settings");
const getPopularQuestions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logFunc_1.logs(req, res);
    try {
        const popularQuestions = yield question_1.default.findAll({ order: [['counter', 'DESC']], limit: project_settings_1.popularQuestionsSettings.limitQuestions });
        if (!popularQuestions.length) {
            return next(ApiError_1.default.badRequest(`No questions yet`));
        }
        return res.status(200).json(popularQuestions);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.getPopularQuestions = getPopularQuestions;
