"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const User = _1.sequelize.define('User', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    telegramId: { type: sequelize_1.DataTypes.INTEGER, unique: true, allowNull: false, validate: { notNull: { msg: 'telegram ID is required' } } },
    fullName: { type: sequelize_1.DataTypes.STRING, allowNull: false, validate: { notNull: { msg: 'full name is required' } } },
    userName: { type: sequelize_1.DataTypes.STRING, allowNull: false, validate: { notNull: { msg: 'userName is required' } } },
    phone: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    userType: { type: sequelize_1.DataTypes.STRING, allowNull: false, validate: { notNull: { msg: 'user type is required' } } },
    state: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    RoleId: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 1, allowNull: false },
});
exports.default = User;
