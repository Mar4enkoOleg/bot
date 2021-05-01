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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const logFunc_1 = require("../helpers/logFunc");
const user_1 = __importDefault(require("../db/models/user"));
const ApiError_1 = __importDefault(require("../error/ApiError"));
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logFunc_1.logs(req, res);
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
exports.getAllUsers = getAllUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logFunc_1.logs(req, res);
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
exports.getUser = getUser;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logFunc_1.logs(req, res);
    try {
        const { telegramId, fullName, RoleId, userName, state, userType, phone } = req.body;
        yield user_1.default.create({
            telegramId,
            fullName,
            userName,
            RoleId,
            state,
            userType,
            phone,
        });
        return res.status(201).json({ message: 'User was created' });
    }
    catch (error) {
        return next(ApiError_1.default.forbidden(error.message));
    }
});
exports.createUser = createUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logFunc_1.logs(req, res);
    try {
        const id = parseInt(req.params.id);
        const { telegramId, fullName, RoleId, userName, state, GroupId, userType, phone } = req.body;
        const updateCandidate = yield user_1.default.findOne({ where: { id } });
        if (!updateCandidate) {
            return next(ApiError_1.default.badRequest(`User with id=${id} not exist`));
        }
        yield user_1.default.update({
            telegramId,
            GroupId,
            userName,
            fullName,
            RoleId,
            state,
            userType,
            phone,
        }, { where: { id } });
        return res.status(200).json({ message: `User with id=${id} updated` });
    }
    catch (error) {
        return next(ApiError_1.default.forbidden(error.message));
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logFunc_1.logs(req, res);
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
        return next(ApiError_1.default.forbidden(error.message));
    }
});
exports.deleteUser = deleteUser;
