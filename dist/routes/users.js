"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const body_parser_1 = __importDefault(require("body-parser"));
const router = express_1.Router();
router.get('/', users_controller_1.getAllUsers);
router.get('/:id', users_controller_1.getUser);
router.post('/', body_parser_1.default.json(), users_controller_1.createUser);
router.put('/:id', body_parser_1.default.json(), users_controller_1.updateUser);
router.delete('/:id', users_controller_1.deleteUser);
exports.default = router;
