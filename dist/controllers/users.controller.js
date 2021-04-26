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
const models_1 = __importDefault(require("../models/models"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.default.model('user').findAll();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.json(error.errors[0].message);
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
        return res.json(error.errors[0].message);
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { telegram_id, full_name, roleId, state, user_type, phone } = req.body;
        const newUser = yield models_1.default.model('user').create({
            telegram_id,
            full_name,
            roleId,
            state,
            user_type,
            phone,
        });
        console.log(newUser);
        return res.status(201).json(newUser);
    }
    catch (error) {
        return res.json(error.errors[0].message);
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json(req.body);
    }
    catch (error) {
        return res.json(error.errors[0].message);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield models_1.default.model('user').destroy({ where: { id } });
        return res.status(200).json(`User with id=${id} deleted`);
    }
    catch (error) {
        return res.json(error.errors[0].message);
    }
});
exports.deleteUser = deleteUser;
