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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = void 0;
const models_1 = __importDefault(require("../models/models"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.default.model('user').findAll();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.json(error);
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const user = yield models_1.default.model('user').findOne({ where: { id } });
        return res.status(200).json(user);
    }
    catch (error) {
        return res.json(error);
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { full_name, telegram_id, user_type, phone, state, roleId } = req.body
        const id = parseInt(req.params.id);
        // const newUser: UserAttributes = {
        //   full_name,
        //   telegram_id,
        //   user_type,
        //   phone,
        //   state,
        //   roleId,
        // }
        // await sequelize.model('user').update(newUser, { where: { id } })
        console.log(JSON.stringify(req.body));
        return res.send(JSON.parse(req.body));
    }
    catch (error) {
        return res.json(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json('deleteUser method');
    }
    catch (error) {
        return res.json(error);
    }
});
exports.deleteUser = deleteUser;
