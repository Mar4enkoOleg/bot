"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.Sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env.NODE_ENV || 'production';
const config = require('../../config/connection_config')[env];
const sequelize = config.url
    ? new sequelize_1.Sequelize(config.url, config)
    : new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.sequelize = sequelize;
