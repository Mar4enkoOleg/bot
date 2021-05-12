import { Request, Response } from 'express';

import QuestionsNoAnswerModel from '../../db/models/questionsNoAnswer';

import { noAnswerSettings } from '../../helpers/constants';
import Res from '../../helpers/Response';

import { httpCode } from '../../typeScript/enums';

export const getNoAnswerQuestions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const noAnswer = await QuestionsNoAnswerModel.findAll({
    limit: noAnswerSettings.limitQuestions,
  });

  if (!noAnswer.length) {
    return Res.BadRequest(res, `List no answer questions is empty`);
  }

  return Res.Success(res, noAnswer);
};

export const deleteAllNoAnswerQuestions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await QuestionsNoAnswerModel.destroy({ where: {}, truncate: true });
  return res.sendStatus(httpCode.NO_CONTENT);
};

export const deleteNoAnswerQuestionById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id, 10);

  const deleteQuestion = await QuestionsNoAnswerModel.findOne({
    where: { id },
  });

  if (!deleteQuestion) {
    return Res.BadRequest(res, `No answer question with id '${id}' not exist`);
  }
  await QuestionsNoAnswerModel.destroy({ where: { id } });

  return res.sendStatus(httpCode.NO_CONTENT);
};
