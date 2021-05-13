import { Request, Response } from 'express';
import { Op } from 'sequelize';

import Logger from '../../config/winston_config';
import Info from '../../db/models/info';

import Res from '../../helpers/Response';

export const getInfoByTitle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const searchSubj = req.params.subj;
  Logger.info(`Request for ${searchSubj}`);

  const foundInfo = await Info.findOne({
    where: { title: { [Op.substring]: searchSubj } },
  });
  if (foundInfo === null) {
    return Res.BadRequest(res, `There is no info about ${searchSubj}`);
  }
  return Res.Success(res, foundInfo);
};

export const getInfoByTag = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const searchTag = req.params.subj;
  Logger.info(`Request for bot ${searchTag}`);

  const foundInfo = await Info.findOne({ where: { searchTag } });
  if (foundInfo === null) {
    return Res.BadRequest(res, `There is no info about ${searchTag}`);
  }
  return Res.Success(res, foundInfo);
};

export const createInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newData = req.query;
  Logger.info(`Request for create info with data: ${newData}`);
  const newInfo = await Info.create(newData);

  if (newInfo === null) {
    return Res.BadRequest(res, `Note was not created`);
  }
  return Res.Success(res, newInfo);
};

export const setInfoByTag = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const searchTag = req.params.subj;
  Logger.info(`Request for update info about ${searchTag}`);

  const newData = req.query;

  const updInfo = await Info.update(newData, { where: { searchTag } });
  if (updInfo[0] <= 0) {
    return Res.BadRequest(res, `There is no info to update`);
  }
  return Res.Success(res, updInfo);
};

// export const getCafedraInfo = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const info = await CafedraInfoModel.findOne();
//   return Res.Success(res, info?.getDataValue('description'));
// };

// export const updateCafedraInfo = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const { description } = req.body;

//   if (!description) return Res.BadRequest(res, 'Wrong description');

//   // eslint-disable-next-line no-unused-vars
//   const [_amount, [updatedInfo]] = await CafedraInfoModel.update(
//     { description },
//     { returning: true, where: { id: 1 } }
//   );

//   return Res.Success(res, updatedInfo);
// };

// export const getBotInfo = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const info = await BotInfoModel.findOne();

//   if (!info) return Res.BadRequest(res);

//   return Res.Success(res, info?.getDataValue('description'));
// };
