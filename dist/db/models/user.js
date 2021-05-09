"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const interfacesEnums_1 = require("../../helpers/interfacesEnums");
const User = _1.sequelize.define('User', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    telegramId: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
    },
    userType: {
        type: sequelize_1.DataTypes.STRING,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: interfacesEnums_1.Roles.USER,
        allowNull: false,
    },
});
exports.default = User;
