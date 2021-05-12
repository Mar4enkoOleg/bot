import { Request, Response, NextFunction } from 'express'
import { UserAttributes } from '../../helpers/interfacesEnums'
import UserModel from '../../db/models/user'
import ApiError from '../../helpers/ApiError'
import { userSchemaCreate, userSchemaUpdate } from '../../helpers/validation'
import { setOneToCache, setAllToCache, deleteFromCache, getAllFromCache } from './userCache'

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cacheUsers = await getAllFromCache()

    if (Object.keys(req.body).length !== 0) {
      const params = req.body
      const users = await UserModel.findAll({
        where: { ...params },
      })
      res.json(users)
      return
    }

    if (cacheUsers.length) {
      res.json(cacheUsers)
      return
    }

    const users = await UserModel.findAll()

    if (!users.length) {
      res.json(ApiError.badRequest(`Users does not exist yet`))
      return
    }
    setAllToCache(users)

    res.json(users)
    return
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const getById = async (req: Request, res: Response, next: Function) => {
  try {
    const id = parseInt(req.params.id)
    const user = await UserModel.findOne({ where: { id } })
    if (!user) {
      next(ApiError.badRequest(`User with id=${id} not exist`))
      return
    }
    setOneToCache(user)
    res.status(200).json(user)
    return
  } catch (error) {
    next(ApiError.badRequest(error.message))
  }
}

export const add = async (req: Request, res: Response, next: Function) => {
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
    setAllToCache(await UserModel.findAll())
    res.status(201).json({ message: 'User was created' })
    return
  } catch (error) {
    next(ApiError.badRequest(error.message))
    return
  }
}

export const update = async (req: Request, res: Response, next: Function) => {
  try {
    const id = parseInt(req.params.id)
    const updateCandidate = await UserModel.findOne({ where: { id } })
    if (!updateCandidate) {
      next(ApiError.badRequest(`User with id=${id} not exist`))
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

    setAllToCache(await UserModel.findAll())
    res.status(200).json({ message: `User with id=${id} updated` })

    return
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}
export const remove = async (req: Request, res: Response, next: Function) => {
  try {
    const id = parseInt(req.params.id)
    const deleteCandidate = await UserModel.findOne({ where: { id } })
    if (!deleteCandidate) {
      return next(ApiError.badRequest(`User with id=${id} not exist`))
    }
    await UserModel.destroy({ where: { id } })
    deleteFromCache(id)
    res.status(200).json({ message: `User with id=${id} deleted` })
    return
  } catch (error) {
    next(ApiError.badRequest(error.message))
    return
  }
}
