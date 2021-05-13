import Joi from 'joi';
import { Roles, UserType } from '../typeScript/enums';

export const userSchemas = {
  userPOST: Joi.object().keys({
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
  }),
  userById: Joi.object().keys({
    id: Joi.number().min(1).integer().positive(),
  }),
  userPUT: Joi.object().keys({
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
  }),
};
