import { Request, Response } from 'express';
import { UserAttributes } from '../../helpers/interfacesEnums';
import UserModel from '../../db/models/user';
import ApiError from '../../helpers/ApiError';
import { userSchemaCreate, userSchemaUpdate } from '../../helpers/validation';
import Res from '../../helpers/Response';
import Logger from '../../config/winston_config';
import { httpCode } from '../../typeScript/enums';

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

//  need to Fix it
export const getUserByParams = async (
  req: Request,
  res: Response,
  next: Function
): Promise<Response> => {
  try {
    // const params: any = req.body;

    const user = null;
    return res.json(user);
  } catch (error) {
    return next(ApiError.badRequest(`User not found`));
  }
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

  // return res.status(200).json({ message: `User with id=${id} updated` });
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
