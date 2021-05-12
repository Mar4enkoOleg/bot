import { Router } from 'express'
import { getCacheById } from './userCache'
import { getAll, remove, getById, update, add } from './userController'

const router = Router()

router.post('/', add)
router.get('/', getAll)

router.get('/:id', getCacheById, getById)
router.put('/:id', update)
router.delete('/:id', remove)

export default router
