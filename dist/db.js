"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
// export default new Sequelize(db.full_address!, { ssl: true, dialect: 'postgres', dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } })
exports.default = new sequelize_1.Sequelize(config_1.db.full_address, { ssl: true, dialect: 'postgres' });
