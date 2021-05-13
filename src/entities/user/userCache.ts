import { NextFunction, Request, Response } from 'express';
import Redis from 'ioredis';
import { UserInstance } from '../../db/models/user';
import Res from '../../helpers/Response';

const redis = new Redis();
const expireTime: number = 60 * 60 * 24; // 86 400s / 24h

// catch error
export const setAllToCache = async (userarr: Array<UserInstance>) => {
  try {
    userarr.forEach(async (user) => {
      redis.hmset(
        `userId:${user.id}`,
        {
          id: `${user.id}`,
          telegramId: `${user.telegramId}`,
          userName: `${user.userName}`,
          fullName: `${user.fullName}`,
          phone: `${user.phone}`,
          userType: `${user.userType}`,
          state: `${user.state}`,
          role: `${user.role}`,
          GroupId: `${user.GroupId}`,
          createdAt: `${user.createdAt}`,
          updatedAt: `${user.updatedAt}`,
        },
        async () => {
          await redis.sadd(`userIds`, `userId:${user.id}`);
          await redis.expire(`userIds`, expireTime);
        }
      );
      await redis.expire(`userId:${user.id}`, expireTime);
    });
  } catch (error) {
    throw error;
  }
};

export const setOneToCache = async (user: any) => {
  try {
    redis.hmset(
      `userId:${user.id}`,
      {
        id: `${user.id}`,
        telegramId: `${user.telegramId}`,
        userName: `${user.userName}`,
        fullName: `${user.fullName}`,
        phone: `${user.phone}`,
        userType: `${user.userType}`,
        state: `${user.state}`,
        role: `${user.role}`,
        GroupId: `${user.GroupId}`,
        createdAt: `${user.createdAt}`,
        updatedAt: `${user.updatedAt}`,
      },
      async () => {
        await redis.sadd(`userIds`, `userId:${user.id}`);
        await redis.expire('userIds', expireTime);
      }
    );
    await redis.expire(`userId:${user.id}`, expireTime);
  } catch (error) {
    throw error;
  }
};

const getIds = async () => {
  try {
    const ids = await redis.smembers('userIds');

    return ids;
  } catch (err) {
    throw err;
  }
};

export const getAllFromCache = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = [];
  const ids = await getIds();
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const data = await redis.hgetall(id);
    users.push(data);
  }
  if (!users.length) {
    next();
    return;
  }

  if (Object.keys(req.body).length !== 0) {
    //если есть параметры в боди -- фильтруем

    // возвращаем отфильтрованных пользователей
    next(); // временно перекидываем на поиск в БД
    return;
  }

  Res.Success(res, users);
  return;
};

export const getCacheById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  redis.hgetall(`userId:${id}`, (err, data) => {
    if (err) {
      console.log(err);
      next();
      return;
    }
    if (Object.keys(data).length !== 0) {
      Res.Success(res, data);
      return;
    } else {
      next();
      return;
    }
  });
};

export const deleteFromCache = async (req: Request, res: Response) => {
  const { id } = req.params;
  await redis.srem(`userIds`, `userId:${id}`);
  await redis.del(`userId:${id}`);
  return;
};
