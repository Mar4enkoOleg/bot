import { Sequelize } from 'sequelize'
import { db } from './config'

export default new Sequelize(db.full_address!, { ssl: true })
