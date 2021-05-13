import { Router } from 'express';
import { validationBody, validationId } from '../user/userValidation';
import tryCatchWrapper from '../../helpers/tryCatchWrapper';
import { userSchemas } from '../../helpers/userValidSchemas';
import { deleteFromCache, getAllFromCache, getCacheById } from './userCache';
import { getAll, remove, getById, update, add, getAllAdmins } from './userController';

const users = Router();

users.post('/', validationBody(userSchemas.userPOST), tryCatchWrapper(add));
users.get('/', tryCatchWrapper(getAllFromCache), tryCatchWrapper(getAll));

users.get(
  '/:id',
  validationId(userSchemas.userById),
  tryCatchWrapper(getCacheById),
  tryCatchWrapper(getById)
);
users.put(
  '/:id',
  validationId(userSchemas.userById),
  validationBody(userSchemas.userPUT),
  tryCatchWrapper(update)
);
users.delete(
  '/:id',
  validationId(userSchemas.userById),
  tryCatchWrapper(remove),
  tryCatchWrapper(deleteFromCache)
);

users.get('/admins', tryCatchWrapper(getAllAdmins));

export default users;
