import { Router } from 'express'
import { getBotInfo } from '../controllers/botInfo.controller'

const router = Router()

router.get('/', getBotInfo)

export default router
