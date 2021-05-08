"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const QuestionNoAnswer = _1.sequelize.define('QuestionNoAnswer', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: sequelize_1.DataTypes.STRING },
});
exports.default = QuestionNoAnswer;
