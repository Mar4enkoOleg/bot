import { Request, Response } from 'express'
import { logs } from '../db/helpers/logFunc'
import QuestionModel from '../db/models/question'
import ApiError from '../error/ApiError'
import { popularQuestionsSettings } from '../project_settings'

export const getPopularQuestions = async (req: Request, res: Response, next: Function): Promise<Response> => {
  logs(req, res)
  try {
    const popularQuestions = await QuestionModel.findAll({ order: [['counter', 'DESC']], limit: popularQuestionsSettings.limitQuestions })
    if (!popularQuestions.length) {
      return next(ApiError.badRequest(`No questions yet`))
    }
    return res.status(200).json(popularQuestions)
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}
