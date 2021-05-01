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
exports.updateCafedraInfo = exports.getCafedraInfo = void 0;
const logFunc_1 = require("../helpers/logFunc");
const cafedraInfo_1 = __importDefault(require("../db/models/cafedraInfo"));
const ApiError_1 = __importDefault(require("../error/ApiError"));
const getCafedraInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logFunc_1.logs(req, res);
    try {
        const info = yield cafedraInfo_1.default.findOne();
        return res.status(200).json(info === null || info === void 0 ? void 0 : info.getDataValue('description'));
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.getCafedraInfo = getCafedraInfo;
const updateCafedraInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logFunc_1.logs(req, res);
    try {
        const { description } = req.body;
        if (!description) {
            return next(ApiError_1.default.badRequest('Wrong description'));
        }
        yield cafedraInfo_1.default.update({ description }, { where: { id: 1 } });
        return res.status(200).json({ message: `Info was updated` });
    }
    catch (error) {
        return next(ApiError_1.default.forbidden(error.message));
    }
});
exports.updateCafedraInfo = updateCafedraInfo;
