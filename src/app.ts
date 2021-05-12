import express from 'express';

import Logger from './config/winston_config';
import morganMiddleware from './config/morgan_config';

import errorHandler from './helpers/middleware/errorHandler';

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

app.use(errorHandler);

export default app;
