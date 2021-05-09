import { Request, Response } from 'express';
import { SubjectAttributes } from '../../helpers/interfacesEnums';
import SubjectModel from '../../db/models/subject';
import ApiError from '../../helpers/ApiError';

export const getAll = async (
  req: Request,
  res: Response,
  next: Function
): Promise<Response> => {
  try {
    const subjects = await SubjectModel.findAll();
    if (!subjects.length) {
      return next(ApiError.badRequest(`Subjects does not exist yet`));
    }
    return res.status(200).json(subjects);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: Function
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const subject = await SubjectModel.findOne({ where: { id } });
    if (!subject) {
      return next(ApiError.badRequest(`Subject with id=${id} not exist`));
    }
    return res.status(200).json(subject);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};

export const add = async (
  req: Request,
  res: Response,
  next: Function
): Promise<Response> => {
  try {
    const { title }: SubjectAttributes = req.body;
    await SubjectModel.create({
      title,
    });
    return res.status(201).json({ message: 'Subject was created' });
  } catch (error) {
    return next(ApiError.forbidden(error.message));
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: Function
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const { title }: SubjectAttributes = req.body;
    const updateSubject = await SubjectModel.findOne({ where: { id } });
    if (!updateSubject) {
      return next(ApiError.badRequest(`Subject with id=${id} not exist`));
    }
    await SubjectModel.update(
      {
        title,
      },
      { where: { id } }
    );
    return res.status(200).json({ message: `Subject with id=${id} updated` });
  } catch (error) {
    return next(ApiError.forbidden(error.message));
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: Function
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const deleteSubject = await SubjectModel.findOne({ where: { id } });
    if (!deleteSubject) {
      return next(ApiError.badRequest(`Subject with id=${id} not exist`));
    }
    await SubjectModel.destroy({ where: { id } });
    return res.status(200).json({ message: `Subject with id=${id} deleted` });
  } catch (error) {
    return next(ApiError.forbidden(error.message));
  }
};
