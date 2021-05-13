import { Router } from 'express';
import tryCatchWrapper from '../../helpers/tryCatchWrapper';
import { deleteFromCache, getAllFromCache, getCacheById } from './userCache';
import { getAll, remove, getById, update, add } from './userController';

const users = Router();

users.post('/', tryCatchWrapper(add));
users.get('/', tryCatchWrapper(getAllFromCache), tryCatchWrapper(getAll));

users.get('/:id', tryCatchWrapper(getCacheById), tryCatchWrapper(getById));
users.put('/:id', tryCatchWrapper(update));
users.delete('/:id', tryCatchWrapper(remove), tryCatchWrapper(deleteFromCache));

export default users;
