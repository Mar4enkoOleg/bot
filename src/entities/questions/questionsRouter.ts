import { Router } from 'express';
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionByName,
  getQuestionsBySubjectAndName,
  updateQuestion,
  getQuestionsBySubject,
  getPopularQuestions,
} from './questionsController';

import {
  deleteAllNoAnswerQuestions,
  deleteNoAnswerQuestionById,
  getNoAnswerQuestions,
} from './questionsNoAnswer.controller';

const router = Router();

router.get('/main', getAllQuestions);
router.post('/main', createQuestion);

router.put('/main/:id', updateQuestion);
router.delete('/main/:id', deleteQuestion);

router.get('/main/:name', getQuestionByName);

router.get('/main/subject/:subject/', getQuestionsBySubject);
router.get('/main/subject/:subject/:name', getQuestionsBySubjectAndName);

router.get('/noanswer', getNoAnswerQuestions);
router.delete('/noanswer', deleteAllNoAnswerQuestions);
router.delete('/noanswer/:id', deleteNoAnswerQuestionById);

router.get('/popular', getPopularQuestions);

export default router;
