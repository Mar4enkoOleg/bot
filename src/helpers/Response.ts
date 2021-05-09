import { Response } from 'express';
import { httpCode } from '../typeScript/enums';

class Res {
  static Success<D>(res: Response, data: D): void {
    res.status(httpCode.OK).json({
      data,
    });
  }

  static Created<D>(res: Response, data: D): void {
    res.status(httpCode.CREATED).json({
      data,
    });
  }

  static BadRequest(res: Response, message = 'Bad Requset'): void {
    res.status(httpCode.BAD_REQUEST).json({
      message,
    });
  }

  static Unauthorized(res: Response, message = 'Unauthorized'): void {
    res.status(httpCode.UNAUTHORIZED).json({
      message,
    });
  }

  static Forbidden(res: Response): void {
    res.status(httpCode.FORBIDDEN).json({
      message: 'Bad Requset',
    });
  }

  static Conflict(res: Response, message: string): void {
    res.status(httpCode.CONFLICT).json({
      message,
    });
  }

  static InternalError(res: Response, message = 'Shit Happens'): void {
    res.status(httpCode.CONFLICT).json({
      message,
    });
  }
}

export default Res;
