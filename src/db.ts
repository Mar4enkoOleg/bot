import { Sequelize } from 'sequelize'
import { db } from './config'

export default new Sequelize(process.env.DATABASE_URL!, { ssl: true })
