import express, { ErrorRequestHandler } from 'express';

import Logger from './config/winston_config';
import morganMiddleware from './config/morgan_config';

import { httpCode } from './typeScript/enums';

import './db/models/user';
import './db/models/question';
import './db/models/subject';
import './db/models/group';
import './db/models/cafedraInfo';

import usersRouter from './entities/user/usersRouter';
import subjectsRouter from './entities/subject/subjectRouter';
import questionsRouter from './entities/questions/questionsRouter';
import infoRouter from './entities/info/infoRouter';
import usersInfoRouter from './entities/user/usersInfoRouter';
import dfRouter from './entities/dialogFlow/dialogFlowRouter';
import Res from './helpers/Response';

import dialogFlowConfig from './config/connection_config';

Logger.info(dialogFlowConfig);

const app = express();

// Http Loger
// ===========================================
app.use(morganMiddleware);

// middlewares
// ===========================================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
// ===========================================
app.use('/users', usersRouter);
app.use('/usersInfo', usersInfoRouter);

app.use('/subjects', subjectsRouter);
app.use('/questions', questionsRouter);

app.use('/info', infoRouter);

app.use('/dialogflow', dfRouter);

app.get('/logger', (_, res) => {
  Logger.error('This is an error log');
  Logger.warn('This is a warn log');
  Logger.info('This is a info log');
  Logger.http('This is a http log');
  Logger.debug('This is a debug log');

  res.send('Hello world');
});

// eslint-disable-next-line no-unused-vars
app.use(((err, _, res, next) => {
  const { status, message } = err;
  if (status === 'error') return Res.BadRequest(res, message);
  if (status === httpCode.BAD_REQUEST) return Res.BadRequest(res, message);

  return Res.InternalError(res, message);
}) as ErrorRequestHandler);

export default app;
