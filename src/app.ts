import express from "express";
import logger from "morgan";

import { sequelize } from "./db/models";
import errorHandler from "./helpers/middleware/errorHandler";

import "./db/models/user";
import "./db/models/question";
import "./db/models/subject";
import "./db/models/group";
import "./db/models/cafedraInfo";

import usersRouter from "./entities/user/usersRouter";
import subjectsRouter from "./entities/subject/subjectRouter";
import questionsRouter from "./entities/questions/questionsRouter";
import infoRouter from "./entities/info/infoRouter";
import usersInfoRouter from "./entities/user/usersInfoRouter";
import updateAdminRouter from "./entities/user/updateAdminRouter";

const app = express();

// Loger
// ===========================================
if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

// middlewares
// ===========================================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
// ===========================================
app.use("/users", usersRouter);
app.use("/admins", updateAdminRouter);
app.use("/usersInfo", usersInfoRouter);

app.use("/subjects", subjectsRouter);
app.use("/questions", questionsRouter);

app.use("/info", infoRouter);

app.use(errorHandler);

export default app;
