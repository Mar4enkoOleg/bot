import { Router } from 'express';
import { getUsersByGroup, getUsersCount } from './userInfo.controller';

const router = Router();

router.get('/', getUsersCount);
router.get('/:group', getUsersByGroup);

export default router;
