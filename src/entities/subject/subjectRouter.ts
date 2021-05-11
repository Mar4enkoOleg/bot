import { Router } from 'express';
import tryCatchWrapper from '../../helpers/tryCatchWrapper';
import { add, remove, getAll, getById, update } from './subjectController';

const subject = Router();

subject.get('/', tryCatchWrapper(getAll));
subject.post('/', tryCatchWrapper(add));

subject
  .get('/:id', tryCatchWrapper(getById))
  .put('/:id', tryCatchWrapper(update))
  .delete('/:id', tryCatchWrapper(remove));

export default subject;
