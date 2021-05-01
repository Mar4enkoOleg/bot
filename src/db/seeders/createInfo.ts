import { sequelize } from '../models'

export default async function () {
  await sequelize.model('CafedraInfo').create()
  await sequelize.model('BotInfo').create()
}
