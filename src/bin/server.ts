import { sequelize as db } from "../db/models";
import app from "../app";

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    console.log(process.env.NODE_ENV);
    await db.authenticate();
    console.log("Connection has been established successfully.");
    await db.sync();
    console.log("All models were synchronized successfully.");
    app.listen(port, () => console.log(`Server start on ${port} port`));
  } catch (error) {
    console.error(error);
  }
};

start();

export default db;
