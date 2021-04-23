"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
exports.default = new sequelize_1.Sequelize(config_1.db.full_address);