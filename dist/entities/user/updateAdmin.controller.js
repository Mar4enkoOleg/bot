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
exports.getAllAdmins = exports.changeUserToAdmin = exports.changeAdminToUser = void 0;
const user_1 = __importDefault(require("../../db/models/user"));
const ApiError_1 = __importDefault(require("../../helpers/ApiError"));
const index_1 = require("../../helpers/interfacesEnums/index");
const changeAdminToUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const updateCandidate = yield user_1.default.findOne({
            where: { userName: username },
        });
        if (!updateCandidate) {
            return next(ApiError_1.default.badRequest(`Admin with userName: ${username} not exist`));
        }
        yield user_1.default.update({ role: index_1.Roles.USER }, { where: { userName: username } });
        return res.status(200).json(`Admin ${username} was changed to user`);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.changeAdminToUser = changeAdminToUser;
const changeUserToAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const updateCandidate = yield user_1.default.findOne({
            where: { userName: username },
        });
        if (!updateCandidate) {
            return next(ApiError_1.default.badRequest(`User with userName: ${username} not exist`));
        }
        if (updateCandidate.role === index_1.Roles.ADMIN) {
            return next(ApiError_1.default.badRequest(`User with userName: ${username} is already admin`));
        }
        yield user_1.default.update({ role: index_1.Roles.ADMIN }, { where: { userName: username } });
        return res.status(200).json(`User ${username} was changed to admin`);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.changeUserToAdmin = changeUserToAdmin;
const getAllAdmins = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield user_1.default.findAll({ where: { role: index_1.Roles.ADMIN } });
        if (!admins.length) {
            return next(ApiError_1.default.badRequest(`No one admin`));
        }
        return res.status(200).json(admins);
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.getAllAdmins = getAllAdmins;
