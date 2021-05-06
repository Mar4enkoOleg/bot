import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '.'
import { Roles, UserAttributes } from '../../interfacesEnums'

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  createdAt?: Date
  updatedAt?: Date
}

const User = sequelize.define<UserInstance>('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  telegramId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userType: {
    type: DataTypes.STRING,
  },
  state: { type: DataTypes.STRING, defaultValue: '' },
  RoleId: {
    type: DataTypes.INTEGER,
    defaultValue: Roles.USER,
    allowNull: false,
  },
})

export default User
