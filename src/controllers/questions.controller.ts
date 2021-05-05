import { Request, Response } from 'express'
import { QuestionAttributes } from '../interfacesEnums'
import QuestionModel from '../db/models/question'
import QuestionNoAnswer from '../db/models/questionsNoAnswer'
import Subject from '../db/models/subject'
import ApiError from '../error/ApiError'

export const getAllQuestions = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const questions = await QuestionModel.findAll()
    if (!questions.length) {
      return next(ApiError.badRequest(`Questions does not exist yet`))
    }
    return res.status(200).json(questions)
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}
export const getQuestionByName = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const name: string = req.params.name
    const question = await QuestionModel.findOne({ where: { name } })
    if (!question) {
      await QuestionNoAnswer.create({ name })
      return next(ApiError.badRequest(`${name} no answer`))
    }
    await question.increment('counter', { by: 1 })
    return res.status(200).json(question.answer)
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}
export const getQuestionsBySubject = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const subject: string = req.params.subject
    const questions = await QuestionModel.findAll({ include: { model: Subject, where: { title: subject } } })
    if (!questions.length) {
      return next(ApiError.badRequest(`${subject} have not questions`))
    }
    return res.status(200).json(questions)
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}
export const getQuestionsBySubjectAndName = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const subject: string = req.params.subject
    const name: string = req.params.name
    const question = await QuestionModel.findOne({ where: { name }, include: { model: Subject, where: { title: subject } } })
    if (!question) {
      await QuestionNoAnswer.create({ name })
      return next(ApiError.badRequest(`${subject} have not question ${name}`))
    }
    return res.status(200).json(question.answer)
  } catch (error) {
    return next(ApiError.badRequest(error.message))
  }
}

export const createQuestion = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const { name, answer, SubjectId }: QuestionAttributes = req.body
    await QuestionModel.create({
      name,
      answer,
      SubjectId,
    })
    return res.status(201).json({ message: 'Question was created' })
  } catch (error) {
    return next(ApiError.forbidden(error.message))
  }
}

export const updateQuestion = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    const { name, answer, SubjectId }: QuestionAttributes = req.body
    const updateQuestion = await QuestionModel.findOne({ where: { id } })
    if (!updateQuestion) {
      return next(ApiError.badRequest(`Question with id=${id} not exist`))
    }
    await QuestionModel.update(
      {
        name,
        answer,
        SubjectId,
      },
      { where: { id } }
    )
    return res.status(200).json({ message: `Question with id=${id} updated` })
  } catch (error) {
    return next(ApiError.forbidden(error.message))
  }
}
export const deleteQuestion = async (req: Request, res: Response, next: Function): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    const deleteQuestion = await QuestionModel.findOne({ where: { id } })
    if (!deleteQuestion) {
      return next(ApiError.badRequest(`Question with id=${id} not exist`))
    }
    await QuestionModel.destroy({ where: { id } })
    return res.status(200).json({ message: `Question with id=${id} deleted` })
  } catch (error) {
    return next(ApiError.forbidden(error.message))
  }
}
