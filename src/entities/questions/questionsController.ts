import { Request, Response } from 'express';

import QuestionModel from '../../db/models/question';
import QuestionNoAnswer from '../../db/models/questionsNoAnswer';
import Subject from '../../db/models/subject';
import Logger from '../../config/winston_config';

import { popularQuestionsSettings } from '../../helpers/constants';
import Res from '../../helpers/Response';

import { httpCode } from '../../typeScript/enums';
import { QuestionAttributes } from '../../typeScript/interfaces';

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const questions = await QuestionModel.findAll();

  if (!questions.length) {
    return Res.BadRequest(res, `Questions does not exist yet`);
  }
  return Res.Success(res, questions);
};

export const getByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const name = req.params?.name;

  const question = await QuestionModel.findOne({ where: { name } });
  if (!question) {
    await QuestionNoAnswer.create({ name });

    return Res.BadRequest(res, `${name} no answer`);
  }
  await question.increment('counter', { by: 1 });

  return Res.Success(res, question.get());
};

export const getBySubject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const subject: string = req.params?.subject;

  const questions = await QuestionModel.findAll({
    include: { model: Subject, where: { title: subject } },
  });

  if (!questions.length) {
    return Res.BadRequest(res, `${subject} have not questions`);
  }

  return Res.Success(res, questions);
};

export const getBySubjectAndName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const subject: string = req.params?.subject;
  const name: string = req.params?.name;

  Logger.info(`params ${req.params}`);

  const question = await QuestionModel.findOne({
    where: { name },
    include: { model: Subject, where: { title: subject } },
  });

  if (!question) {
    await QuestionNoAnswer.create({ name });
    return Res.BadRequest(res, `${subject} have not question ${name}`);
  }

  return Res.Success(res, question.get());
};

export const add = async (req: Request, res: Response): Promise<Response> => {
  const { name, answer, SubjectId }: QuestionAttributes = req.body;

  const newQuestion = await QuestionModel.create({
    name,
    answer,
    SubjectId,
  });

  return Res.Created(res, newQuestion);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id, 10);
  const { name, answer, SubjectId }: QuestionAttributes = req.body;

  Logger.info(`params ${req.params}`);

  const updateQuestion = await QuestionModel.findOne({ where: { id } });

  if (!updateQuestion) {
    return Res.BadRequest(res, `Question with id '${id}' not exist`);
  }

  // eslint-disable-next-line no-unused-vars
  const [_amount, [updatedQuestion]] = await QuestionModel.update(
    {
      name,
      answer,
      SubjectId,
    },
    { returning: true, where: { id } }
  );

  return Res.Success(res, updatedQuestion);
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id, 10);

  Logger.info(`Question id '${id}'`);

  const deleteQuestion = await QuestionModel.findOne({ where: { id } });

  if (!deleteQuestion) {
    return Res.BadRequest(res, `Question with id '${id}' not exist`);
  }

  await QuestionModel.destroy({ where: { id } });
  return res.sendStatus(httpCode.NO_CONTENT);
};

export const getPopular = async (
  req: Request,
  res: Response,
  next: Function
): Promise<Response> => {
  const popularQuestions = await QuestionModel.findAll({
    order: [['counter', 'DESC']],
    limit: popularQuestionsSettings.limitQuestions,
  });
  if (!popularQuestions.length) {
    return Res.BadRequest(res, 'No questions');
  }
  return res.status(200).json(popularQuestions);
};
