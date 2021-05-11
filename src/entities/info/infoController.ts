import { Request, Response } from 'express';
import BotInfoModel from '../../db/models/botInfo';
import CafedraInfoModel from '../../db/models/cafedraInfo';

import Res from '../../helpers/Response';

export const getCafedraInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const info = await CafedraInfoModel.findOne();
  return Res.Success(res, info?.getDataValue('description'));
};

export const updateCafedraInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { description } = req.body;

  if (!description) return Res.BadRequest(res, 'Wrong description');

  // eslint-disable-next-line no-unused-vars
  const [_amount, [updatedInfo]] = await CafedraInfoModel.update(
    { description },
    { returning: true, where: { id: 1 } }
  );

  return Res.Success(res, updatedInfo);
};

export const getBotInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const info = await BotInfoModel.findOne();

  if (!info) return Res.BadRequest(res);

  return Res.Success(res, info?.getDataValue('description'));
};
