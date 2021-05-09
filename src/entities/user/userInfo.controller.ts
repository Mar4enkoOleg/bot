import { Request, Response } from 'express';
import UserModel from '../../db/models/user';
import GroupModel from '../../db/models/group';
import ApiError from '../../helpers/ApiError';

export const getUsersCount = async (
  req: Request,
  res: Response,
  next: Function
): Promise<Response> => {
  try {
    const usersCount = await UserModel.findAndCountAll();
    if (!usersCount) {
      return next(ApiError.badRequest(`Userlist is empty`));
    }
    return res.status(200).json(usersCount.count);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getUsersByGroup = async (
  req: Request,
  res: Response,
  next: Function
): Promise<Response> => {
  try {
    const name: string = req.params.group;
    const groupCheck = await GroupModel.findOne({ where: { name } });
    if (!groupCheck) {
      return next(ApiError.badRequest(`Group ${name} not exist`));
    }

    const group = await UserModel.findAndCountAll({
      include: { model: GroupModel, where: { name } },
    });

    return res.status(200).json(group);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};
