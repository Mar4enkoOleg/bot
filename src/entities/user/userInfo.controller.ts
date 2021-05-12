import { Request, Response } from 'express';

import UserModel from '../../db/models/user';
import GroupModel from '../../db/models/group';

import Res from '../../helpers/Response';

export const getUsersCount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const usersCount = await UserModel.findAndCountAll();

  if (!usersCount) {
    return Res.BadRequest(res, `Userlist is empty`);
  }
  return Res.Success(res, usersCount);
};

export const getUsersByGroup = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const name: string = req.params?.group;
  const groupCheck = await GroupModel.findOne({ where: { name } });

  if (!groupCheck) {
    return Res.BadRequest(res, `Group ${name} not exist`);
  }

  const group = await UserModel.findAndCountAll({
    include: { model: GroupModel, where: { name } },
  });

  return Res.Success(res, group);
};
