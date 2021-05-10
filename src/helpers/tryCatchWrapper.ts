/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

export type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => any;

export default (cb: ControllerFunction) => (
  req: Request,
  res: Response,
  next: NextFunction
) => cb(req, res, next).catch((err: any) => next(err));
