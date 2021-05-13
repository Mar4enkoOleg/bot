import { Router } from 'express';

import tryCatchWrapper from '../../helpers/tryCatchWrapper';
import {
  createInfo,
  // getCafedraInfo,
  // updateCafedraInfo,
  // getBotInfo,
  getInfoByTag,
  setInfoByTag,
} from './infoController';

const info = Router();

info.get('/about/:subj', tryCatchWrapper(getInfoByTag));
info.put('/update/:subj', tryCatchWrapper(setInfoByTag));
info.put('/create', tryCatchWrapper(createInfo));
// info.get('/bot', tryCatchWrapper(getBotInfo));

// info.get('/cathedra', tryCatchWrapper(getCafedraInfo));
// info.put('/cathedra', tryCatchWrapper(updateCafedraInfo));

export default info;
