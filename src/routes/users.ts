import { Router } from 'express'
import { getAllUsers, deleteUser, getUser, updateUser, createUser } from '../controllers/users.controller'

const router = Router()

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
