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
exports.getBotInfo = void 0;
const logFunc_1 = require("../db/helpers/logFunc");
const botInfo_1 = __importDefault(require("../db/models/botInfo"));
const ApiError_1 = __importDefault(require("../error/ApiError"));
const getBotInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logFunc_1.logs(req, res);
    try {
        const info = yield botInfo_1.default.findOne();
        return res.status(200).json(info === null || info === void 0 ? void 0 : info.getDataValue('description'));
    }
    catch (error) {
        return next(ApiError_1.default.badRequest(error.message));
    }
});
exports.getBotInfo = getBotInfo;
