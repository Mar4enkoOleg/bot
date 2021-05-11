import { Router } from 'express';
import tryCatchWrapper from '../../helpers/tryCatchWrapper';
import { getUsersByGroup, getUsersCount } from './userInfo.controller';

const router = Router();

router.get('/', tryCatchWrapper(getUsersCount));
router.get('/:group', tryCatchWrapper(getUsersByGroup));

export default router;
