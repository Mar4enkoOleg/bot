import { Router } from 'express';
import tryCatchWrapper from '../../helpers/tryCatchWrapper';
import { deleteFromCache, getAllFromCache, getCacheById } from './userCache';
import {
  getAll,
  remove,
  getById,
  update,
  add,
  getAllAdmins,
} from './userController';
import {
  createUserValidation,
  idValidation,
  updateUserValidation,
} from './userValidation';

const users = Router();

users.post('/', createUserValidation, tryCatchWrapper(add));
users.get('/', tryCatchWrapper(getAllFromCache), tryCatchWrapper(getAll));

users.get('/admins/', tryCatchWrapper(getAllAdmins));

users.get(
  '/:id',
  idValidation,
  tryCatchWrapper(getCacheById),
  tryCatchWrapper(getById)
);
users.put('/:id', idValidation, updateUserValidation, tryCatchWrapper(update));
users.delete(
  '/:id',
  idValidation,
  tryCatchWrapper(remove),
  tryCatchWrapper(deleteFromCache)
);

export default users;
