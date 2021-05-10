import { Router } from 'express';
import tryCatchWrapper from '../../helpers/tryCatchWrapper';
import {
  getAll,
  remove,
  getById,
  update,
  add,
  getUserByParams,
} from './userController';

const router = Router();

router.post('/', tryCatchWrapper(add));
router.get('/', tryCatchWrapper(getAll));

router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

router.get('/byparams/', getUserByParams);

export default router;
