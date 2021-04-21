import { Router } from 'express'
import { getAllUsers, deleteUser, getUser, updateUser } from '../controllers/users.controller'

const router = Router()

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
