"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const user_1 = __importDefault(require("./user"));
const Group = _1.sequelize.define('Group', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
}, {
    timestamps: false,
});
Group.hasMany(user_1.default);
user_1.default.belongsTo(Group);
exports.default = Group;
