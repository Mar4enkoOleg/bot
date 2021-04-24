import { Router } from 'express'
import { getAllUsers, deleteUser, getUser, updateUser, createUser } from '../controllers/users.controller'
import bodyParser from 'body-parser'

const router = Router()

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.post('/', bodyParser.json(), createUser)
router.put('/:id', bodyParser.json(), updateUser)
router.delete('/:id', deleteUser)

export default router
