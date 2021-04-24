import { Request, Response } from 'express'
import { UserAttributes } from '../interfaces/user'
import sequelize from '../models/models'

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await sequelize.model('user').findAll()
    return res.status(200).json(users)
  } catch (error) {
    return res.json(error)
  }
}
export const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    const user = await sequelize.model('user').findOne({ where: { id } })
    return res.status(200).json(user)
  } catch (error) {
    return res.json(error)
  }
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { telegram_id, full_name, roleId, state, user_type, phone }: UserAttributes = req.body
    const newUser = await sequelize.model('user').create({
      telegram_id: telegram_id,
      full_name,
      roleId,
      state,
      user_type,
      phone,
    })
    console.log(newUser)

    return res.status(201).json(newUser)
  } catch (error) {
    return res.json(error)
  }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.status(204).json(req.body)
  } catch (error) {
    return res.json(error)
  }
}
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    await sequelize.model('user').destroy({ where: { id } })
    return res.status(204).json(`User with id=${id} deleted`)
  } catch (error) {
    return res.json(error)
  }
}
