import { Router } from 'express'
import { getPopularQuestions } from '../controllers/popularQuestions.controller'
import { createQuestion, deleteQuestion, getAllQuestions, getQuestionByName, getQuestionsBySubjectAndName, updateQuestion, getQuestionsBySubject } from '../controllers/questions.controller'
import { deleteAllNoAnswerQuestions, deleteNoAnswerQuestionById, getNoAnswerQuestions } from '../controllers/questionsNoAnswer.controller'

const router = Router()

router.get('/main', getAllQuestions)
router.get('/main/:name', getQuestionByName)
router.get('/main/subject/:subject/', getQuestionsBySubject)
router.get('/main/subject/:subject/:name', getQuestionsBySubjectAndName)
router.post('/main', createQuestion)
router.put('/main/:id', updateQuestion)
router.delete('/main/:id', deleteQuestion)

router.get('/noanswer', getNoAnswerQuestions)
router.delete('/noanswer', deleteAllNoAnswerQuestions)
router.delete('/noanswer/:id', deleteNoAnswerQuestionById)

router.get('/popular', getPopularQuestions)

export default router
