import Joi from 'joi';
import { UserAttributes } from '../../typeScript/interfaces';
import { httpCode, Roles, UserType } from '../../typeScript/enums';
import { NextFunction, RequestHandler } from 'express-serve-static-core';

const createUserSchema: Joi.ObjectSchema<UserAttributes> = Joi.object().keys({
  telegramId: Joi.number().integer().min(1).positive().required(),
  userName: Joi.string().min(2).max(80).alphanum(),
  fullName: Joi.string().min(2).max(100),
  phone: Joi.string().pattern(/^[0-9]+$/),
  userType: Joi.string().valid(
    UserType.ASPIRANT,
    UserType.STUDENT,
    UserType.TEACHER
  ),
  state: Joi.string().default(''),
  GroupId: Joi.number(),
  role: Joi.string()
    .default(Roles.USER)
    .valid(Roles.USER, Roles.ADMIN, Roles.SUPERADMIN),
});

const updateUserSchema: Joi.ObjectSchema<UserAttributes> = Joi.object().keys({
  telegramId: Joi.number().integer().min(1).positive(),
  fullName: Joi.string().min(2).max(100),
  userName: Joi.string().min(2).max(80).alphanum(),
  userType: Joi.string().valid(
    UserType.STUDENT,
    UserType.TEACHER,
    UserType.ASPIRANT
  ),
  phone: Joi.string().pattern(/^[0-9]+$/),
  state: Joi.string().default(''),
  GroupId: Joi.number(),
  role: Joi.string()
    .default(Roles.USER)
    .valid(Roles.ADMIN, Roles.SUPERADMIN, Roles.USER),
});

const userIdSchema: Joi.ObjectSchema = Joi.object().keys({
  id: Joi.number().min(1).integer().positive(),
});

const validate = <T>(schema: Joi.ObjectSchema, obj: T, next: NextFunction) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    const formMessage = message.replace(/"([^"]+(?="))"/g, '$1');
    return next({
      status: 'error',
      code: httpCode.BAD_REQUEST,
      message: formMessage,
    });
  }
  next();
};

export type Tvalidate<T> = (
  schema: Joi.ObjectSchema<T>,
  obj: T,
  next: NextFunction
) => void;

export const createUserValidation = ((req, _, next) => {
  return validate<UserAttributes>(createUserSchema, req.body, next);
}) as RequestHandler;

export const updateUserValidation = ((req, _, next) => {
  return validate<UserAttributes>(updateUserSchema, req.body, next);
}) as RequestHandler;

export const idValidation = ((req, _, next) => {
  return validate(userIdSchema, req.params, next);
}) as RequestHandler;
