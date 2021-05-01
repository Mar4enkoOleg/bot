import { Router } from 'express'
import { getPopularQuestions } from '../controllers/popularQuestions.controller'

const router = Router()

router.get('/', getPopularQuestions)

export default router
