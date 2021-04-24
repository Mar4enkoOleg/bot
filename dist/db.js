"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = new sequelize_1.Sequelize(process.env.DATABASE_URL, { ssl: true });
