import { Request, Response, NextFunction } from 'express'
import { UserAttributes } from '../../helpers/interfacesEnums'
import UserModel from '../../db/models/user'
import ApiError from '../../helpers/ApiError'
import { userSchemaCreate, userSchemaUpdate } from '../../helpers/validation'
import { setAll, getAllCache, setOne } from './userCache'
// import Redis from 'ioredis'

// const redis = new Redis()

export const getAll = async (req: Request, res: Response, next: Function) => {
  try {
    // const arr = getAllCache()
    // console.log(arr)

    // return res.json(arr)
    // getAllCache()
    const users = await UserModel.findAll()
    if (!users.length) {
      next(ApiError.badRequest(`Users does not exist yet`))
    }
    setAll(users)

    res.status(200).json(users)
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const getUserByParams = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const params: any = req.body
    //////////////////////////////

    const user = null
    return res.json(user)
  } catch (error) {
    return next(ApiError.badRequest(`User not found`))
  }
}

export const getById = async (req: Request, res: Response, next: Function) => {
  try {
    const id = parseInt(req.params.id)
    const user = await UserModel.findOne({ where: { id } })
    if (!user) {
      next(ApiError.badRequest(`User with id=${id} not exist`))
    }
    setOne(user)
    res.status(200).json(user)
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const add = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const { telegramId, fullName, role, userName, state, userType, phone, GroupId }: UserAttributes = req.body
    await userSchemaCreate.validateAsync(req.body)

    await UserModel.create({
      telegramId,
      fullName,
      userName,
      role,
      state,
      userType,
      phone,
      GroupId,
    })
    return res.status(201).json({ message: 'User was created' })
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}

export const update = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    const updateCandidate = await UserModel.findOne({ where: { id } })
    if (!updateCandidate) {
      return next(ApiError.badRequest(`User with id=${id} not exist`))
    }
    await userSchemaUpdate.validateAsync(req.body)

    const { telegramId, fullName, role, userName, state, GroupId, userType, phone }: UserAttributes = req.body

    await UserModel.update(
      {
        telegramId,
        GroupId,
        userName,
        fullName,
        role,
        state,
        userType,
        phone,
      },
      { where: { id } }
    )
    return res.status(200).json({ message: `User with id=${id} updated` })
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}
export const remove = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    const deleteCandidate = await UserModel.findOne({ where: { id } })
    if (!deleteCandidate) {
      return next(ApiError.badRequest(`User with id=${id} not exist`))
    }
    await UserModel.destroy({ where: { id } })
    return res.status(200).json({ message: `User with id=${id} deleted` })
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}
