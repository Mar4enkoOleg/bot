"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const Question = _1.sequelize.define("Question", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: { type: sequelize_1.DataTypes.STRING, unique: true },
    answer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: { notNull: { msg: "answer is required" } },
    },
    SubjectId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: { notNull: { msg: "subjectId is required" } },
    },
    counter: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
});
exports.default = Question;
