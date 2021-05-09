import { Router } from 'express';
import { add, remove, getAll, getById, update } from './subjectController';

const router = Router();

router.get('/', getAll);
router.post('/', add);

router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
