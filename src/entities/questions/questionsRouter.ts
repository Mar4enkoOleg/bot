import { Router } from 'express';
import tryCatchWrapper from '../../helpers/tryCatchWrapper';
import {
  add,
  remove,
  getAll,
  getByName,
  getBySubject,
  update,
  getBySubjectAndName,
  getPopular,
} from './questionsController';

import {
  deleteAllNoAnswerQuestions,
  deleteNoAnswerQuestionById,
  getNoAnswerQuestions,
} from './questionsNoAnswer.controller';

const questions = Router();

questions.get('/main', tryCatchWrapper(getAll));
questions.post('/main', tryCatchWrapper(add));

questions.put('/main/:id', tryCatchWrapper(update));
questions.delete('/main/:id', tryCatchWrapper(remove));

questions.get('/main/:name', tryCatchWrapper(getByName));

questions.get('/main/subject/:subject/', tryCatchWrapper(getBySubject));
questions.get(
  '/main/subject/:subject/:name',
  tryCatchWrapper(getBySubjectAndName)
);

questions.get('/noanswer', tryCatchWrapper(getNoAnswerQuestions));
questions.delete('/noanswer', tryCatchWrapper(deleteAllNoAnswerQuestions));

questions.delete('/noanswer/:id', tryCatchWrapper(deleteNoAnswerQuestionById));

questions.get('/popular', tryCatchWrapper(getPopular));

export default questions;
