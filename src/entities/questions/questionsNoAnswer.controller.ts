import { Request, Response } from "express";
import QuestionsNoAnswerModel from "../../db/models/questionsNoAnswer";
import { noAnswerSettings } from "../../helpers/constants";
import ApiError from "../../helpers/ApiError";

export const getNoAnswerQuestions = async (
  req: Request,
  res: Response,
  next: Function
): Promise<Response> => {
  try {
    const noAnswer = await QuestionsNoAnswerModel.findAll({
      limit: noAnswerSettings.limitQuestions,
    });
    if (!noAnswer.length) {
      return next(ApiError.badRequest(`List no answer questions is empty`));
    }
    return res.status(200).json(noAnswer);
  } catch (error) {
    return next(ApiError.badRequest(error.message));
  }
};
export const deleteAllNoAnswerQuestions = async (
  req: Request,
  res: Response,
  next: Function
): Promise<Response> => {
  try {
    await QuestionsNoAnswerModel.destroy({ where: {}, truncate: true });
    return res
      .status(200)
      .json({ message: `All no answer questions was deleted` });
  } catch (error) {
    return next(ApiError.forbidden(error.message));
  }
};

export const deleteNoAnswerQuestionById = async (
  req: Request,
  res: Response,
  next: Function
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const deleteQuestion = await QuestionsNoAnswerModel.findOne({
      where: { id },
    });
    if (!deleteQuestion) {
      return next(
        ApiError.badRequest(`No answer question with id=${id} not exist`)
      );
    }
    await QuestionsNoAnswerModel.destroy({ where: { id } });
    return res.status(200).json({ message: `Question with id=${id} deleted` });
  } catch (error) {
    return next(ApiError.forbidden(error.message));
  }
};
