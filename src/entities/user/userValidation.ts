import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import Res from '../../helpers/Response';

export const validationBody = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);

      const valid = error == null;
      if (valid) {
        next();
        return;
      }

      const err = error?.details[0].message;
      Res.BadRequest(res, err);
      return;
    } catch (error) {}
  };
};

export const validationId = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.params);

      const valid = error == null;
      if (valid) {
        next();
        return;
      }

      const err = error?.details[0].message;
      Res.BadRequest(res, err);
      return;
    } catch (error) {}
  };
};
