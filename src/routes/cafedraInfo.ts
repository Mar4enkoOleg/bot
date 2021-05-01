import { Router } from 'express'
import { getCafedraInfo, updateInfo } from '../controllers/cafedraInfo.controller'

const router = Router()

router.get('/', getCafedraInfo)
router.put('/', updateInfo)

export default router
