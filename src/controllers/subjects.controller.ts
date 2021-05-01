import { Request, Response } from 'express'
import { SubjectAttributes } from '../db/interfaces'
import SubjectModel from '../db/models/subject'
import ApiError from '../error/ApiError'
import { logs } from '../db/helpers/logFunc'

export const getAllSubjects = async (req: Request, res: Response, next: Function): Promise<Response> => {
  logs(req, res)

  try {
    const subjects = await SubjectModel.findAll()
    if (!subjects.length) {
      return next(ApiError.badRequest(`Subjects does not exist yet`))
    }
    return res.status(200).json(subjects)
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}
export const getSubject = async (req: Request, res: Response, next: Function): Promise<Response> => {
  logs(req, res)
  try {
    const id = parseInt(req.params.id)
    const subject = await SubjectModel.findOne({ where: { id } })
    if (!subject) {
      return next(ApiError.badRequest(`Subject with id=${id} not exist`))
    }
    return res.status(200).json(subject)
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}

export const createSubject = async (req: Request, res: Response, next: Function): Promise<Response> => {
  logs(req, res)
  try {
    const { title }: SubjectAttributes = req.body
    await SubjectModel.create({
      title,
    })
    return res.status(201).json({ message: 'Subject was created' })
  } catch (error) {
    return next(ApiError.forbidden(error.message))
  }
}

export const updateSubject = async (req: Request, res: Response, next: Function): Promise<Response> => {
  logs(req, res)
  try {
    const id = parseInt(req.params.id)
    const { title }: SubjectAttributes = req.body
    const updateSubject = await SubjectModel.findOne({ where: { id } })
    if (!updateSubject) {
      return next(ApiError.badRequest(`Subject with id=${id} not exist`))
    }
    await SubjectModel.update(
      {
        title,
      },
      { where: { id } }
    )
    return res.status(200).json({ message: `Subject with id=${id} updated` })
  } catch (error) {
    return next(ApiError.forbidden(error.message))
  }
}
export const deleteSubject = async (req: Request, res: Response, next: Function): Promise<Response> => {
  logs(req, res)
  try {
    const id = parseInt(req.params.id)
    const deleteSubject = await SubjectModel.findOne({ where: { id } })
    if (!deleteSubject) {
      return next(ApiError.badRequest(`Subject with id=${id} not exist`))
    }
    await SubjectModel.destroy({ where: { id } })
    return res.status(200).json({ message: `Subject with id=${id} deleted` })
  } catch (error) {
    return next(ApiError.forbidden(error.message))
  }
}
