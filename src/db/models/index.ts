import { Sequelize } from 'sequelize';
import pkg from 'dotenv';

pkg.config();

const env = process.env.NODE_ENV || 'production';
const config = require('../../config/connection_config')[env];

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };
