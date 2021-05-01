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
exports.getUsersByGroup = exports.getUsersCount = void 0;
const logFunc_1 = require("../helpers/logFunc");
const user_1 = __importDefault(require("../db/models/user"));
const group_1 = __importDefault(require("../db/models/group"));
const ApiError_1 = __importDefault(require("../error/ApiError"));
const getUsersCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logFunc_1.logs(req, res);
    try {
        const usersCount = yield user_1.default.findAndCountAll();
        if (!usersCount) {
            return next(ApiError_1.default.badRequest(`Userlist is empty`));
        }
        return res.status(200).json(usersCount.count);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.getUsersCount = getUsersCount;
const getUsersByGroup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logFunc_1.logs(req, res);
    try {
        const name = req.params.group;
        const groupCheck = yield group_1.default.findOne({ where: { name } });
        if (!groupCheck) {
            return next(ApiError_1.default.badRequest(`Group ${name} not exist`));
        }
        const group = yield user_1.default.findAndCountAll({ include: { model: group_1.default, where: { name } } });
        return res.status(200).json(group);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.getUsersByGroup = getUsersByGroup;
