import { DataTypes } from 'sequelize';
import { sequelize } from '.';

const Info = sequelize.define('Info', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Info Title',
    get() {
      const result = this.getDataValue('title');
      return result;
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'Info about something',
    get() {
      const result = this.getDataValue('description');
      return result;
    },
  },
  searchTag: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Info;
