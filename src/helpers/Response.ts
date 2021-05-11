import { Response } from 'express';
import Logger from '../config/winston_config';
import { httpCode } from '../typeScript/enums';

class Res {
  static Success<D>(res: Response, data: D): Response {
    Logger.info(data);
    return res.status(httpCode.OK).json({
      data,
    });
  }

  static Created<D>(res: Response, data: D): Response {
    Logger.info(data);
    return res.status(httpCode.CREATED).json({
      data,
    });
  }

  static BadRequest(res: Response, message = 'Bad Requset'): Response {
    Logger.info(message);
    return res.status(httpCode.BAD_REQUEST).json({
      message,
    });
  }

  static Unauthorized(res: Response, message = 'Unauthorized'): Response {
    Logger.info(message);
    return res.status(httpCode.UNAUTHORIZED).json({
      message,
    });
  }

  static Forbidden(res: Response): Response {
    Logger.info('Forbidden');
    return res.status(httpCode.FORBIDDEN).json({
      message: 'Forbidden',
    });
  }

  static Conflict(res: Response, message: string): Response {
    Logger.info(message);
    return res.status(httpCode.CONFLICT).json({
      message,
    });
  }

  static InternalError(res: Response, message = 'Shit Happens'): Response {
    Logger.info(message);
    return res.status(httpCode.CONFLICT).json({
      message,
    });
  }
}

export default Res;
