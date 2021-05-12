import { Router } from 'express';

import tryCatchWrapper from '../../helpers/tryCatchWrapper';
import {
  getCafedraInfo,
  updateCafedraInfo,
  getBotInfo,
} from './infoController';

const info = Router();

info.get('/bot', tryCatchWrapper(getBotInfo));

info.get('/cafedra', tryCatchWrapper(getCafedraInfo));
info.put('/cafedra', tryCatchWrapper(updateCafedraInfo));

export default info;
