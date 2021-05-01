import ApiError from '../error/ApiError'
import { Request, Response } from 'express'

export default function (err: Error, req: Request, res: Response, next: Function) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }
  return res.status(500).json({ message: 'Internal error' })
}
