import { Request, Response } from 'express'
import { UserAttributes } from '../interfacesEnums'
import UserModel from '../db/models/user'
import ApiError from '../error/ApiError'

export const getAllUsers = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const users = await UserModel.findAll()
    if (!users.length) {
      return next(ApiError.badRequest(`Users does not exist yet`))
    }
    return res.status(200).json(users)
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}
export const getUser = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    const user = await UserModel.findOne({ where: { id } })
    if (!user) {
      return next(ApiError.badRequest(`User with id=${id} not exist`))
    }
    return res.status(200).json(user)
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}

export const createUser = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const { telegramId, fullName, RoleId, userName, state, userType, phone }: UserAttributes = req.body
    await UserModel.create({
      telegramId,
      fullName,
      userName,
      RoleId,
      state,
      userType,
      phone,
    })
    return res.status(201).json({ message: 'User was created' })
  } catch (error) {
    return next(ApiError.forbidden(error.message))
  }
}

export const updateUser = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    const { telegramId, fullName, RoleId, userName, state, GroupId, userType, phone }: UserAttributes = req.body
    const updateCandidate = await UserModel.findOne({ where: { id } })
    if (!updateCandidate) {
      return next(ApiError.badRequest(`User with id=${id} not exist`))
    }
    await UserModel.update(
      {
        telegramId,
        GroupId,
        userName,
        fullName,
        RoleId,
        state,
        userType,
        phone,
      },
      { where: { id } }
    )
    return res.status(200).json({ message: `User with id=${id} updated` })
  } catch (error) {
    return next(ApiError.forbidden(error.message))
  }
}
export const deleteUser = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    const deleteCandidate = await UserModel.findOne({ where: { id } })
    if (!deleteCandidate) {
      return next(ApiError.badRequest(`User with id=${id} not exist`))
    }
    await UserModel.destroy({ where: { id } })
    return res.status(200).json({ message: `User with id=${id} deleted` })
  } catch (error) {
    return next(ApiError.forbidden(error.message))
  }
}
