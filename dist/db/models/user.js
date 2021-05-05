"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const User = _1.sequelize.define('User', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    telegramId: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        validate: { notNull: { msg: 'telegram ID is required' }, isNumeric: { msg: 'telegram id must be number' } },
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'full name is required' },
            is: '^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$',
            len: { args: [2, 50], msg: 'full name must contain between 2 and 50' },
        },
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: 'userName is required' },
            len: { args: [2, 50], msg: 'userName must contain between 2 and 50' },
        },
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        // validate: { is: { args: '/(?([0-9]{3}))?([ .-]?)([0-9]{3})\2([0-9]{4})/', msg: 'phone must contains only numbers' } },
    },
    userType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'user type is required' },
        },
    },
    state: { type: sequelize_1.DataTypes.STRING, defaultValue: '' },
    RoleId: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
        validate: {
            isInt: { msg: 'must be integer' },
            isIn: { args: [['1', '2', '3']], msg: 'invalid role id' },
        },
    },
});
exports.default = User;
