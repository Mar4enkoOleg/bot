import { Request, Response } from 'express'

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.json('getAllUsers method')
  } catch (error) {
    return res.json(error)
  }
}
export const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.json('getUser method')
  } catch (error) {
    return res.json(error)
  }
}
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.json('updateUser method')
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
