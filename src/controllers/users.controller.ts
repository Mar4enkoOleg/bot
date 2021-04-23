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
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    // const { full_name, telegram_id, user_type, phone, state, roleId } = req.body
    const id = parseInt(req.params.id)
    // const newUser: UserAttributes = {
    //   full_name,
    //   telegram_id,
    //   user_type,
    //   phone,
    //   state,
    //   roleId,
    // }
    // await sequelize.model('user').update(newUser, { where: { id } })
    console.log(JSON.stringify(req.body))

    return res.send(JSON.parse(req.body))
  } catch (error) {
    return res.json(error)
  }
}
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.json('deleteUser method')
  } catch (error) {
    return res.json(error)
  }
}
