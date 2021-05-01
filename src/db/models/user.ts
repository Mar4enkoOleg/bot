import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '.'
import { UserAttributes } from '../../interfacesEnums'

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  createdAt?: Date
  updatedAt?: Date
}

const User = sequelize.define<UserInstance>('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  telegramId: { type: DataTypes.INTEGER, unique: true, allowNull: false, validate: { notNull: { msg: 'telegram ID is required' } } },
  fullName: { type: DataTypes.STRING, allowNull: false, validate: { notNull: { msg: 'full name is required' } } },
  userName: { type: DataTypes.STRING, allowNull: false, validate: { notNull: { msg: 'userName is required' } } },
  phone: { type: DataTypes.STRING, allowNull: true },
  userType: { type: DataTypes.STRING, allowNull: false, validate: { notNull: { msg: 'user type is required' } } },
  state: { type: DataTypes.STRING, defaultValue: '' },
  RoleId: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
})

export default User
