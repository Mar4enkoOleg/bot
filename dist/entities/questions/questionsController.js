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
exports.getPopularQuestions = exports.deleteQuestion = exports.updateQuestion = exports.createQuestion = exports.getQuestionsBySubjectAndName = exports.getQuestionsBySubject = exports.getQuestionByName = exports.getAllQuestions = void 0;
const question_1 = __importDefault(require("../../db/models/question"));
const questionsNoAnswer_1 = __importDefault(require("../../db/models/questionsNoAnswer"));
const subject_1 = __importDefault(require("../../db/models/subject"));
const ApiError_1 = __importDefault(require("../../helpers/ApiError"));
const constants_1 = require("../../helpers/constants");
const getAllQuestions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield question_1.default.findAll();
        if (!questions.length) {
            return next(ApiError_1.default.badRequest(`Questions does not exist yet`));
        }
        return res.status(200).json(questions);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.getAllQuestions = getAllQuestions;
const getQuestionByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const question = yield question_1.default.findOne({ where: { name } });
        if (!question) {
            yield questionsNoAnswer_1.default.create({ name });
            return next(ApiError_1.default.badRequest(`${name} no answer`));
        }
        yield question.increment("counter", { by: 1 });
        return res.status(200).json(question.answer);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.getQuestionByName = getQuestionByName;
const getQuestionsBySubject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = req.params.subject;
        const questions = yield question_1.default.findAll({
            include: { model: subject_1.default, where: { title: subject } },
        });
        if (!questions.length) {
            return next(ApiError_1.default.badRequest(`${subject} have not questions`));
        }
        return res.status(200).json(questions);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.getQuestionsBySubject = getQuestionsBySubject;
const getQuestionsBySubjectAndName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = req.params.subject;
        const name = req.params.name;
        const question = yield question_1.default.findOne({
            where: { name },
            include: { model: subject_1.default, where: { title: subject } },
        });
        if (!question) {
            yield questionsNoAnswer_1.default.create({ name });
            return next(ApiError_1.default.badRequest(`${subject} have not question ${name}`));
        }
        return res.status(200).json(question.answer);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.getQuestionsBySubjectAndName = getQuestionsBySubjectAndName;
const createQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, answer, SubjectId } = req.body;
        yield question_1.default.create({
            name,
            answer,
            SubjectId,
        });
        return res.status(201).json({ message: "Question was created" });
    }
    catch (error) {
        return next(ApiError_1.default.forbidden(error.message));
    }
});
exports.createQuestion = createQuestion;
const updateQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, answer, SubjectId } = req.body;
        const updateQuestion = yield question_1.default.findOne({ where: { id } });
        if (!updateQuestion) {
            return next(ApiError_1.default.badRequest(`Question with id=${id} not exist`));
        }
        yield question_1.default.update({
            name,
            answer,
            SubjectId,
        }, { where: { id } });
        return res.status(200).json({ message: `Question with id=${id} updated` });
    }
    catch (error) {
        return next(ApiError_1.default.forbidden(error.message));
    }
});
exports.updateQuestion = updateQuestion;
const deleteQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deleteQuestion = yield question_1.default.findOne({ where: { id } });
        if (!deleteQuestion) {
            return next(ApiError_1.default.badRequest(`Question with id=${id} not exist`));
        }
        yield question_1.default.destroy({ where: { id } });
        return res.status(200).json({ message: `Question with id=${id} deleted` });
    }
    catch (error) {
        return next(ApiError_1.default.forbidden(error.message));
    }
});
exports.deleteQuestion = deleteQuestion;
const getPopularQuestions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const popularQuestions = yield question_1.default.findAll({
            order: [["counter", "DESC"]],
            limit: constants_1.popularQuestionsSettings.limitQuestions,
        });
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
