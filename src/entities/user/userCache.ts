import { NextFunction, Request, Response } from 'express'
import Redis from 'ioredis'
import { UserInstance } from '../../db/models/user'

const redis = new Redis()
const expireTime: number = 60 * 60 // seconds(for test 1 hour)

export const setAll = (userarr: Array<UserInstance>) => {
  userarr.forEach((user) => {
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
      () => {
        redis.sadd(`userIds`, `userId:${user.id}`)
      }
    )
    redis.expire(`userId:${user.id}`, expireTime)
  })
}

export const setOne = (user: any) => {
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
      redis.sadd(`userIds`, `userId:${user.id}`)
      redis.expire('userIds', expireTime)
    }
  )
  redis.expire(`userId:${user.id}`, expireTime)
}

export const getAllCache = async () => {
  const userIds = await redis.smembers('userIds')
  console.log(userIds)
  let users: any[] = []
  userIds.forEach((userId) => {
    redis.hgetall(userId, (err, data) => {
      if (err) throw err

      //   console.log(data)

      users.push(data)
      console.log(users)
    })
  })
  //   console.log(typeof users)

  return users
}

export const getCacheById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  redis.hgetall(`userId:${id}`, (err, data) => {
    if (err) throw err
    if (Object.keys(data).length !== 0) {
      console.log(data)

      console.log('work redis')
      res.json(data)
    } else {
      console.log('go to next')

      next()
    }
  })
}
