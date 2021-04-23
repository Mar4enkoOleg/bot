"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsersAndRoles = void 0;
const models_1 = __importDefault(require("../models/models"));
const users = [
    {
        telegram_id: 1,
        full_name: 'John Doe',
        phone: '123123123',
        user_type: 'Student',
        state: '.......',
        roleId: 1,
    },
    {
        telegram_id: 2,
        full_name: 'Van Helsing',
        phone: '99999999',
        user_type: 'Teacher',
        state: '.......',
        roleId: 2,
    },
    {
        telegram_id: 3,
        full_name: 'Name Noneme',
        phone: '123123123',
        user_type: 'Student',
        state: '.......',
        roleId: 3,
    },
];
const roles = [
    {
        value: 'USER',
    },
    {
        value: 'ADMIN',
    },
    {
        value: 'SUPERADMIN',
    },
];
const createUsersAndRoles = () => {
    roles.map((role) => {
        models_1.default.model('role').create(role);
    });
    users.map((user) => {
        models_1.default.model('user').create(user);
    });
};
exports.createUsersAndRoles = createUsersAndRoles;
