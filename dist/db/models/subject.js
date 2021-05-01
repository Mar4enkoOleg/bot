"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const question_1 = __importDefault(require("./question"));
const Subject = _1.sequelize.define('Subject', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true, validate: { notNull: { msg: 'title is required' } } },
});
Subject.hasMany(question_1.default);
question_1.default.belongsTo(Subject);
exports.default = Subject;
