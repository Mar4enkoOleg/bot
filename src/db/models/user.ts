import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

import { Roles } from '../../typeScript/enums';
import { UserAttributes } from '../../typeScript/interfaces';

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
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
  },
  userName: {
    type: DataTypes.STRING,

    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
  },
  userType: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: Roles.USER,
    allowNull: false,
  },
});

export default User;
