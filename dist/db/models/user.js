"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const interfacesEnums_1 = require("../../interfacesEnums");
const User = _1.sequelize.define('User', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    telegramId: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    userType: {
        type: sequelize_1.DataTypes.STRING,
    },
    state: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    RoleId: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: interfacesEnums_1.Roles.USER,
        allowNull: false,
    },
});
exports.default = User;
