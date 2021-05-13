import { Request, Response } from 'express';

import UserModel from '../../db/models/user';
import Logger from '../../config/winston_config';

import Res from '../../helpers/Response';
import { userSchemaCreate, userSchemaUpdate } from '../../helpers/validation';

import { httpCode, Roles } from '../../typeScript/enums';
import { UserAttributes } from '../../typeScript/interfaces';

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await UserModel.findAll();

  if (!users.length) {
    return Res.BadRequest(res, 'There are no users in DB');
  }

  return Res.Success(res, users);
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

//  need to Fix it
export const getUserByParams = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // const params: any = req.body;

  const user = null;
  return res.json(user);
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
  return Res.Success(res, user);
};

export const add = async (req: Request, res: Response): Promise<Response> => {
  // telegramId, fullname, role, userName, state, userType, phone, GroupId
  const userAttributes: UserAttributes = req.body;

  Logger.info(userAttributes);

  await userSchemaCreate.validateAsync(req.body);

  const dbUser = await UserModel.create({
    ...userAttributes,
  });
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

  await userSchemaUpdate.validateAsync(req.body);

  const userAttributes: UserAttributes = req.body;

  // eslint-disable-next-line no-unused-vars
  const [_amount, [updatedUser]] = await UserModel.update(
    { ...userAttributes },
    { returning: true, where: { id } }
  );

  return Res.Success(res, updatedUser.get());
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id, 10);

  const deleteCandidate = await UserModel.findOne({ where: { id } });
  if (!deleteCandidate) {
    return Res.BadRequest(res, `User with id '${id}' not exist`);
  }
  await UserModel.destroy({ where: { id } });
  return res.sendStatus(httpCode.NO_CONTENT);
};
