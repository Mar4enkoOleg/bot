import { Router } from 'express';

import {
  createInfo,
  getInfoByTag,
  setInfoByTag,
} from './infoController';
import tryCatchWrapper from '../../helpers/tryCatchWrapper';

const info = Router();

info.get('/about/:subj', tryCatchWrapper(getInfoByTag));
info.put('/update/:subj', tryCatchWrapper(setInfoByTag));
info.put('/create', tryCatchWrapper(createInfo));

export default info;
