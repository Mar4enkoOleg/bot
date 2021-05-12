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

const users = Router();

users.post('/', tryCatchWrapper(add));
users.get('/', tryCatchWrapper(getAll));

users.get('/:id', tryCatchWrapper(getById));
users.put('/:id', tryCatchWrapper(update));
users.delete('/:id', tryCatchWrapper(remove));

users.get('/byparams/', tryCatchWrapper(getUserByParams));

export default users;
