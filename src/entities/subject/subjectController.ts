import { Request, Response } from 'express';

import SubjectModel from '../../db/models/subject';
import Logger from '../../config/winston_config';

import Res from '../../helpers/Response';

import { httpCode } from '../../typeScript/enums';
import { SubjectAttributes } from '../../typeScript/interfaces';

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const subjects = await SubjectModel.findAll();

  if (!subjects.length) {
    return Res.BadRequest(res, `Subjects does not exist yet`);
  }

  return Res.Success(res, subjects);
};

export const getById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params?.id, 10);

  Logger.info(`Subject id '${id}'`);

  const subject = await SubjectModel.findOne({ where: { id } });
  if (!subject) {
    return Res.BadRequest(res, `Subject with id=${id} not exist`);
  }
  return Res.Success(res, subject);
};

export const add = async (req: Request, res: Response): Promise<Response> => {
  const { title }: SubjectAttributes = req.body;

  const newSubject = await SubjectModel.create({
    title,
  });

  return Res.Created(res, { ...newSubject.get() });
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params?.id, 10);
  const { title }: SubjectAttributes = req.body;

  Logger.info(`Subject id '${id}' , req.body '${req.body}'`);

  const updateSubject = await SubjectModel.findOne({ where: { id } });
  if (!updateSubject) {
    return Res.BadRequest(res, `Subject with id '${id}' not exist`);
  }

  // eslint-disable-next-line no-unused-vars
  const [_amount, [updatedSubject]] = await SubjectModel.update(
    { title },
    { returning: true, where: { id } }
  );
  return Res.Success(res, updatedSubject);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params?.id, 10);
  const deleteSubject = await SubjectModel.findOne({ where: { id } });

  if (!deleteSubject) {
    return Res.BadRequest(res, `Subject with id '${id}' not exist`);
  }

  await SubjectModel.destroy({ where: { id } });
  return res.sendStatus(httpCode.NO_CONTENT);
};
