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
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const interfacesEnums_1 = require("../interfacesEnums");
const models_1 = require("../db/models");
const checkTelegramId = (telegramId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.sequelize.model('User').findOne({ where: { telegramId } });
    if (user) {
        throw new Error('Must be unique');
    }
});
const checkUserName = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.sequelize.model('User').findOne({ where: { userName } });
    if (user) {
        throw new Error('Must be unique');
    }
});
const checkGroupExist = (GroupId) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield models_1.sequelize.model('Group').findOne({ where: { id: GroupId } });
    if (group) {
        return;
    }
    else {
        throw new Error(`Group id:${GroupId} not exist`);
    }
});
exports.userSchema = joi_1.default.object({
    telegramId: joi_1.default.number().required().min(0).max(99999999).external(checkTelegramId),
    fullName: joi_1.default.string().required().min(2).max(50),
    userName: joi_1.default.string().required().min(2).max(100).alphanum().external(checkUserName),
    userType: joi_1.default.string().valid('Student', 'Teacher', 'Aspirant'),
    phone: joi_1.default.string().pattern(/^[0-9]+$/),
    state: joi_1.default.string().default(''),
    GroupId: joi_1.default.number().required().external(checkGroupExist),
    RoleId: joi_1.default.number().default(interfacesEnums_1.Roles.USER),
});