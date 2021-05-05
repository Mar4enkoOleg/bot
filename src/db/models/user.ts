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
  telegramId: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    validate: { notNull: { msg: 'telegram ID is required' }, isNumeric: { msg: 'telegram id must be number' } },
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'full name is required' },
      is: '^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$',
      len: { args: [2, 50], msg: 'full name must contain between 2 and 50' },
    },
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: { msg: 'userName is required' },
      len: { args: [2, 50], msg: 'userName must contain between 2 and 50' },
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    // validate: { is: { args: '/(?([0-9]{3}))?([ .-]?)([0-9]{3})\2([0-9]{4})/', msg: 'phone must contains only numbers' } },
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: 'user type is required' },
    },
  },
  state: { type: DataTypes.STRING, defaultValue: '' },
  RoleId: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      isInt: { msg: 'must be integer' },
      isIn: { args: [['1', '2', '3']], msg: 'invalid role id' },
    },
  },
})

export default User
