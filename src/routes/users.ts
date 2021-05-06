import { Router } from 'express'
import { getAllUsers, deleteUser, getUser, updateUser, createUser, getUserByParams } from '../controllers/users.controller'

const router = Router()

router.get('/', getAllUsers)
router.get('/byparams/', getUserByParams)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
