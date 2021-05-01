import { Router } from 'express'
import { getBotInfo } from '../controllers/botInfo.controller'
import { getCafedraInfo, updateCafedraInfo } from '../controllers/cafedraInfo.controller'

const router = Router()

router.get('/bot', getBotInfo)
router.get('/cafedra', getCafedraInfo)
router.put('/cafedra', updateCafedraInfo)

export default router
