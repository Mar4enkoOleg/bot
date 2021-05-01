import { Router } from 'express'
import { changeAdminToUser, changeUserToAdmin, getAllAdmins } from '../controllers/updateAdmin.controller'

const router = Router()

router.get('/getAdmins', getAllAdmins)
router.put('/changeAdminToUser/:username', changeAdminToUser)
router.put('/addAdmin/:username', changeUserToAdmin)

export default router
