import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import Question from './question';

import { SubjectAttributes } from '../../typeScript/interfaces';

interface SubjectCreationAttributes extends Optional<SubjectAttributes, 'id'> {}

interface SubjectInstance
  extends Model<SubjectAttributes, SubjectCreationAttributes>,
    SubjectAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Subject = sequelize.define<SubjectInstance>('Subject', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: { type: DataTypes.STRING, allowNull: false, unique: true },
});

Subject.hasMany(Question);
Question.belongsTo(Subject);

export default Subject;
