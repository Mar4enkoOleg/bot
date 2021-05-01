import { Router } from 'express'
import { getNoAnswerQuestions, deleteAllNoAnswerQuestions, deleteNoAnswerQuestionById } from '../controllers/questionsNoAnswer.controller'

const router = Router()

router.get('/', getNoAnswerQuestions)
router.delete('/', deleteAllNoAnswerQuestions)
router.delete('/:id', deleteNoAnswerQuestionById)

export default router
