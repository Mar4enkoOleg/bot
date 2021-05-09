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
exports.remove = exports.update = exports.add = exports.getById = exports.getAll = void 0;
const subject_1 = __importDefault(require("../../db/models/subject"));
const ApiError_1 = __importDefault(require("../../helpers/ApiError"));
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjects = yield subject_1.default.findAll();
        if (!subjects.length) {
            return next(ApiError_1.default.badRequest(`Subjects does not exist yet`));
        }
        return res.status(200).json(subjects);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.getAll = getAll;
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const subject = yield subject_1.default.findOne({ where: { id } });
        if (!subject) {
            return next(ApiError_1.default.badRequest(`Subject with id=${id} not exist`));
        }
        return res.status(200).json(subject);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.getById = getById;
const add = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        yield subject_1.default.create({
            title,
        });
        return res.status(201).json({ message: "Subject was created" });
    }
    catch (error) {
        return next(ApiError_1.default.forbidden(error.message));
    }
});
exports.add = add;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { title } = req.body;
        const updateSubject = yield subject_1.default.findOne({ where: { id } });
        if (!updateSubject) {
            return next(ApiError_1.default.badRequest(`Subject with id=${id} not exist`));
        }
        yield subject_1.default.update({
            title,
        }, { where: { id } });
        return res.status(200).json({ message: `Subject with id=${id} updated` });
    }
    catch (error) {
        return next(ApiError_1.default.forbidden(error.message));
    }
});
exports.update = update;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deleteSubject = yield subject_1.default.findOne({ where: { id } });
        if (!deleteSubject) {
            return next(ApiError_1.default.badRequest(`Subject with id=${id} not exist`));
        }
        yield subject_1.default.destroy({ where: { id } });
        return res.status(200).json({ message: `Subject with id=${id} deleted` });
    }
    catch (error) {
        return next(ApiError_1.default.forbidden(error.message));
    }
});
exports.remove = remove;
