import { Router } from 'express';
import tryCatchWrapper from '../../helpers/tryCatchWrapper';
import { getlistIntents } from './dialogFlowController';

const dfRouter = Router();

dfRouter.post('/', tryCatchWrapper(getlistIntents));

export default dfRouter;
