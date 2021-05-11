import { NextFunction, Request, Response } from 'express'
import Redis from 'ioredis'
import { UserInstance } from '../../db/models/user'
import ApiError from '../../helpers/ApiError'

const redis = new Redis()
const expireTime: number = 60 * 60 // seconds(for test 1 hour)

export const setAllToCache = async (userarr: Array<UserInstance>) => {
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
      },
      async () => {
        await redis.sadd(`userIds`, `userId:${user.id}`)
        await redis.expire(`userIds`, expireTime)
      }
    )
    await redis.expire(`userId:${user.id}`, expireTime)
  })
}

export const setOne = async (user: any) => {
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
    },
    async () => {
      await redis.sadd(`userIds`, `userId:${user.id}`)
      await redis.expire('userIds', expireTime)
    }
  )
  await redis.expire(`userId:${user.id}`, expireTime)
}

export const getCacheById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    redis.hgetall(`userId:${id}`, (err, data) => {
      if (err) {
        next()
      }
      if (Object.keys(data).length !== 0) {
        res.json(data)
        return
      } else {
        next()
      }
    })
  } catch (err) {
    next(ApiError.badRequest(err.message))
  }
}

export const deleteFromCache = async (userId: number) => {
  try {
    await redis.srem(`userIds`, `userId:${userId}`)
    await redis.del(`userId:${userId}`)
  } catch (err) {
    throw err
  }
}
