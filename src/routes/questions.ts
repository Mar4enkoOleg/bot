import { Router } from 'express'
import { createQuestion, deleteQuestion, getAllQuestions, getQuestionByName, getQuestionsBySubjectAndName, updateQuestion, getQuestionsBySubject } from '../controllers/questions.controller'

const router = Router()

router.get('/', getAllQuestions)
router.get('/:name', getQuestionByName)
router.get('/:subject', getQuestionsBySubject)
router.get('/:subject/:name', getQuestionsBySubjectAndName)
router.post('/', createQuestion)
router.put('/:id', updateQuestion)
router.delete('/:id', deleteQuestion)

export default router
