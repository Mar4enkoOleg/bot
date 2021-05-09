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
exports.remove = exports.update = exports.add = exports.getById = exports.getUserByParams = exports.getAll = void 0;
const user_1 = __importDefault(require("../../db/models/user"));
const ApiError_1 = __importDefault(require("../../helpers/ApiError"));
const validation_1 = require("../../helpers/validation");
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        if (!users.length) {
            return next(ApiError_1.default.badRequest(`Users does not exist yet`));
        }
        return res.status(200).json(users);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.getAll = getAll;
const getUserByParams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.body;
        //////////////////////////////
        const user = null;
        return res.json(user);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(`User not found`));
    }
});
exports.getUserByParams = getUserByParams;
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const user = yield user_1.default.findOne({ where: { id } });
        if (!user) {
            return next(ApiError_1.default.badRequest(`User with id=${id} not exist`));
        }
        return res.status(200).json(user);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.getById = getById;
const add = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { telegramId, fullName, role, userName, state, userType, phone, GroupId, } = req.body;
        yield validation_1.userSchemaCreate.validateAsync(req.body);
        yield user_1.default.create({
            telegramId,
            fullName,
            userName,
            role,
            state,
            userType,
            phone,
            GroupId,
        });
        return res.status(201).json({ message: 'User was created' });
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.add = add;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const updateCandidate = yield user_1.default.findOne({ where: { id } });
        if (!updateCandidate) {
            return next(ApiError_1.default.badRequest(`User with id=${id} not exist`));
        }
        yield validation_1.userSchemaUpdate.validateAsync(req.body);
        const { telegramId, fullName, role, userName, state, GroupId, userType, phone, } = req.body;
        yield user_1.default.update({
            telegramId,
            GroupId,
            userName,
            fullName,
            role,
            state,
            userType,
            phone,
        }, { where: { id } });
        return res.status(200).json({ message: `User with id=${id} updated` });
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.update = update;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deleteCandidate = yield user_1.default.findOne({ where: { id } });
        if (!deleteCandidate) {
            return next(ApiError_1.default.badRequest(`User with id=${id} not exist`));
        }
        yield user_1.default.destroy({ where: { id } });
        return res.status(200).json({ message: `User with id=${id} deleted` });
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.remove = remove;
