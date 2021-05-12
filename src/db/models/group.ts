import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '.';
import User from './user';
import { GroupAttributes } from '../../typeScript/interfaces';

interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

interface GroupInstance
  extends Model<GroupAttributes, GroupCreationAttributes>,
    GroupAttributes {}

const Group = sequelize.define<GroupInstance>(
  'Group',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  {
    timestamps: false,
  }
);

Group.hasMany(User);
User.belongsTo(Group);

export default Group;
