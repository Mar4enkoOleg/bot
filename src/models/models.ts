import sequelize from '../db'
import { DataTypes } from 'sequelize'

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  telegram_id: { type: DataTypes.INTEGER, unique: true, allowNull: false },
  full_name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  user_type: { type: DataTypes.STRING, allowNull: false },
  state: { type: DataTypes.STRING, defaultValue: '' },
})

const Role = sequelize.define('role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.STRING, defaultValue: 'USER' },
})

Role.hasOne(User)
User.belongsTo(Role)

export default sequelize
