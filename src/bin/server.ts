import app from '../app';
import { sequelize as db } from '../db/models';

import Logger from '../config/winston_config';

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    Logger.info(`ENV ${process.env.NODE_ENV}`);
    await db.authenticate();
    Logger.info('Connection has been established successfully.');
    await db.sync();
    Logger.info('All models were synchronized successfully.');
    app.listen(port, () => Logger.info(`Server start on ${port} port`));
  } catch (error) {
    Logger.error(error);
  }
};

start();

export default db;
