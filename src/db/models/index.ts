import { Sequelize } from "sequelize";
import pkg from "dotenv";
pkg.config();

const env = process.env.NODE_ENV || "production";
const config = require(__dirname + "/../../config/connection_config.js")[env];

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };
