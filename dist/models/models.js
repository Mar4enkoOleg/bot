"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const sequelize_1 = require("sequelize");
const User = db_1.default.define('user', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    telegram_id: { type: sequelize_1.DataTypes.INTEGER, unique: true, allowNull: false, validate: { notNull: { msg: 'telegram ID is required' } } },
    full_name: { type: sequelize_1.DataTypes.STRING, allowNull: false, validate: { notNull: { msg: 'full name is required' } } },
    phone: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    user_type: { type: sequelize_1.DataTypes.STRING, allowNull: false, validate: { notNull: { msg: 'user type is required' } } },
    state: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    roleId: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 1, allowNull: false },
});
const Role = db_1.default.define('role', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    value: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
}, {
    createdAt: false,
    updatedAt: false,
});
Role.hasOne(User);
User.belongsTo(Role);
exports.default = db_1.default;
