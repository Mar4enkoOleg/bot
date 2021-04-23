"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const sequelize_1 = require("sequelize");
const User = db_1.default.define('user', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    telegram_id: { type: sequelize_1.DataTypes.INTEGER, unique: true, allowNull: false },
    full_name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    phone: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    user_type: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    state: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
});
const Role = db_1.default.define('role', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: sequelize_1.DataTypes.STRING, defaultValue: 'USER' },
});
Role.hasOne(User);
User.belongsTo(Role);
exports.default = db_1.default;
