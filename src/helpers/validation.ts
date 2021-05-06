import Joi from 'joi'
import { Roles, UserAttributes } from '../interfacesEnums'
import { sequelize } from '../db/models'
// const checkTelegramId = async (telegramId: number) => {
//   const user = await sequelize.model('User').findOne({ where: { telegramId } })
//   if (user) {
//     throw new Error('Must be unique')
//   }
// }
const checkUserName = async (userName: string) => {
  const user = await sequelize.model('User').findOne({ where: { userName } })
  if (user) {
    throw new Error('Must be unique')
  }
}
const checkGroupExist = async (GroupId: number) => {
  const group = await sequelize.model('Group').findOne({ where: { id: GroupId } })
  if (group) {
    return
  } else {
    throw new Error(`Group id:${GroupId} not exist`)
  }
}

export const userSchema = Joi.object<UserAttributes>({
  telegramId: Joi.number().required().min(0).max(99999999), //.external(checkTelegramId)
  fullName: Joi.string().required().min(2).max(50),
  userName: Joi.string().required().min(2).max(100).alphanum().external(checkUserName),
  userType: Joi.string().valid('Student', 'Teacher', 'Aspirant'),
  phone: Joi.string().pattern(/^[0-9]+$/),
  state: Joi.string().default(''),
  GroupId: Joi.number().required().external(checkGroupExist),
  RoleId: Joi.number().default(Roles.USER),
})
