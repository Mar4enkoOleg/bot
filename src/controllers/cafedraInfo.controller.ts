import { Request, Response } from 'express'
import CafedraInfoModel from '../db/models/cafedraInfo'
import ApiError from '../error/ApiError'

export const getCafedraInfo = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const info = await CafedraInfoModel.findOne()
    return res.status(200).json(info?.getDataValue('description'))
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}

export const updateCafedraInfo = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const { description } = req.body
    if (!description) {
      return next(ApiError.badRequest('Wrong description'))
    }
    await CafedraInfoModel.update({ description }, { where: { id: 1 } })
    return res.status(200).json({ message: `Info was updated` })
  } catch (error) {
    return next(ApiError.forbidden(error.message))
  }
}
