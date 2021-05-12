import { NextFunction, Request, Response } from 'express'
import Redis from 'ioredis'
import { UserInstance } from '../../db/models/user'
import ApiError from '../../helpers/ApiError'

const redis = new Redis()
const expireTime: number = 60 * 60 * 24 // 86 400s / 24h

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
        createdAt: `${user.createdAt}`,
        updatedAt: `${user.updatedAt}`,
      },
      async () => {
        await redis.sadd(`userIds`, `userId:${user.id}`)
        await redis.expire(`userIds`, expireTime)
      }
    )
    await redis.expire(`userId:${user.id}`, expireTime)
  })
}

export const setOneToCache = async (user: any) => {
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
      await redis.sadd(`userIds`, `userId:${user.id}`)
      await redis.expire('userIds', expireTime)
    }
  )
  await redis.expire(`userId:${user.id}`, expireTime)
}

const getIds = async () => {
  try {
    const ids = await redis.smembers('userIds')

    return ids
  } catch (err) {
    throw err
  }
}
export const getAllFromCache = async () => {
  try {
    const users = []
    const ids = await getIds()
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i]
      const data = await redis.hgetall(id)
      users.push(data)
    }
    return users
  } catch (err) {
    throw err
  }
}

export const getCacheById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    redis.hgetall(`userId:${id}`, (err, data) => {
      if (err) {
        console.log(err)
        next()
        return
      }
      if (Object.keys(data).length !== 0) {
        res.json(data)
        return
      } else {
        next()
        return
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
