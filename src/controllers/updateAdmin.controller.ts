import { Request, Response } from 'express'
import { logs } from '../db/helpers/logFunc'
import UserModel from '../db/models/user'
import ApiError from '../error/ApiError'
import { Roles } from '../db/interfaces/index'

export const changeAdminToUser = async (req: Request, res: Response, next: Function): Promise<Response> => {
  logs(req, res)
  try {
    const username: string = req.params.username
    const updateCandidate = await UserModel.findOne({ where: { userName: username } })
    if (!updateCandidate) {
      return next(ApiError.badRequest(`Admin with userName: ${username} not exist`))
    }
    await UserModel.update({ RoleId: Roles.USER }, { where: { userName: username } })
    return res.status(200).json(`Admin ${username} was changed to user`)
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}
export const changeUserToAdmin = async (req: Request, res: Response, next: Function): Promise<Response> => {
  logs(req, res)
  try {
    const username: string = req.params.username
    const updateCandidate = await UserModel.findOne({ where: { userName: username } })
    if (!updateCandidate) {
      return next(ApiError.badRequest(`User with userName: ${username} not exist`))
    }
    if (updateCandidate.RoleId === Roles.ADMIN) {
      return next(ApiError.badRequest(`User with userName: ${username} is already admin`))
    }
    await UserModel.update({ RoleId: Roles.ADMIN }, { where: { userName: username } })
    return res.status(200).json(`User ${username} was changed to admin`)
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}
export const getAllAdmins = async (req: Request, res: Response, next: Function): Promise<Response> => {
  logs(req, res)
  try {
    const admins = await UserModel.findAll({ where: { RoleId: Roles.ADMIN } })
    if (!admins.length) {
      return next(ApiError.badRequest(`No one admin`))
    }

    return res.status(200).json(admins)
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}
