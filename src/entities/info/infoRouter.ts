import { Router } from 'express';
import {
  getCafedraInfo,
  updateCafedraInfo,
  getBotInfo,
} from './infoController';

const router = Router();

router.get('/bot', getBotInfo);

router.get('/cafedra', getCafedraInfo);
router.put('/cafedra', updateCafedraInfo);

export default router;
