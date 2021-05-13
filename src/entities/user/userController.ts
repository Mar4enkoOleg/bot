import { NextFunction, Request, Response } from 'express';

import UserModel from '../../db/models/user';
import Logger from '../../config/winston_config';

import Res from '../../helpers/Response';

import { UserAttributes } from '../../typeScript/interfaces';
import { setAllToCache, setOneToCache } from './userCache';
import { Roles } from '../../typeScript/enums';

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (Object.keys(req.body).length !== 0) {
    const params = req.body;
    const users = await UserModel.findAll({
      where: { ...params },
    });
    return Res.Success(res, users);
  }
  const users = await UserModel.findAll();

  if (!users.length) {
    return Res.BadRequest(res, 'There are no users in DB');
  }

  setAllToCache(users);

  return Res.Success(res, users);
};

export const getById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id, 10);

  Logger.info(`req User id ${id}`);
  const user = await UserModel.findOne({ where: { id } });
  if (!user) {
    return Res.BadRequest(res, `User with id '${id}' not exist`);
  }
  setOneToCache(user);
  return Res.Success(res, user);
};

export const add = async (req: Request, res: Response): Promise<Response> => {
  // telegramId, fullname, role, userName, state, userType, phone, GroupId
  const userAttributes: UserAttributes = req.body;

  Logger.info(userAttributes);

  const dbUser = await UserModel.create({
    ...userAttributes,
  });
  setAllToCache(await UserModel.findAll());
  return Res.Created(res, { ...dbUser.get() });
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id, 10);

  Logger.info(`User id '${id}'`);

  const updateCandidate = await UserModel.findOne({ where: { id } });
  if (!updateCandidate) {
    return Res.BadRequest(res, `User with id '${id}' not exist`);
  }

  const userAttributes: UserAttributes = req.body;

  // eslint-disable-next-line no-unused-vars
  const [_amount, [updatedUser]] = await UserModel.update(
    { ...userAttributes },
    { returning: true, where: { id } }
  );
  setAllToCache(await UserModel.findAll());
  return Res.Success(res, updatedUser.get());
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const id = parseInt(req.params.id, 10);

  const deleteCandidate = await UserModel.findOne({ where: { id } });
  if (!deleteCandidate) {
    return Res.BadRequest(res, `User with id '${id}' not exist`);
  }
  await UserModel.destroy({ where: { id } });
  next();
  return Res.Deleted(res, deleteCandidate.get());
};

export const getAllAdmins = async (
  req: Request,
  res: Response
): Promise<Response> => {
  Logger.info(`req for All Admins`);
  const foundAdmins = await UserModel.findAll({
    where: { GroupId: Roles.ADMIN },
  });
  if (foundAdmins === null) {
    return Res.BadRequest(res, `There are no admins`);
  }
  return Res.Success(res, foundAdmins);
};
