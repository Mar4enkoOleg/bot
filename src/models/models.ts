import sequelize from '../db'
import { DataTypes } from 'sequelize'

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  telegram_id: { type: DataTypes.INTEGER, unique: true, allowNull: false, validate: { notNull: { msg: 'telegram ID is required' } } },
  full_name: { type: DataTypes.STRING, allowNull: false, validate: { notNull: { msg: 'full name is required' } } },
  phone: { type: DataTypes.STRING, allowNull: true },
  user_type: { type: DataTypes.STRING, allowNull: false, validate: { notNull: { msg: 'user type is required' } } },
  state: { type: DataTypes.STRING, defaultValue: '' },
  roleId: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
})

const Role = sequelize.define(
  'role',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    value: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
)

Role.hasOne(User)
User.belongsTo(Role)

export default sequelize
