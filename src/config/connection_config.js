
require('dotenv').config()


module.exports = {
  development: {
    url: process.env.HEROKU_POSTGRESQL_GOLD_URL,
    ssl: true,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    url: process.env.HEROKU_POSTGRESQL_GOLD_URL,
    ssl: true,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

