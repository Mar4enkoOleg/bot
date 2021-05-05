import { Request, Response } from 'express'
import BotInfoModel from '../db/models/botInfo'
import ApiError from '../error/ApiError'

export const getBotInfo = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const info = await BotInfoModel.findOne()
    return res.status(200).json(info?.getDataValue('description'))
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}
