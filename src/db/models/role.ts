import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '.'
import { RoleAttributes } from '../interfaces'
import User from './user'

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {}

interface RoleInstance extends Model<RoleAttributes, RoleCreationAttributes>, RoleAttributes {
  //   createdAt?: Date
  //   updatedAt?: Date
  //   createdAt: false
  //   updatedAt: false
}

const Role = sequelize.define<RoleInstance>(
  'Role',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    value: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  {
    timestamps: false,
  }
)

Role.hasOne(User)
User.belongsTo(Role)

export default Role
