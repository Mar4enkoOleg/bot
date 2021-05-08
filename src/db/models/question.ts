import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '.'
import { QuestionAttributes } from '../../interfacesEnums'

interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id'> {}

interface QuestionInstance extends Model<QuestionAttributes, QuestionCreationAttributes>, QuestionAttributes {
  createdAt?: Date
  updatedAt?: Date
}

const Question = sequelize.define<QuestionInstance>('Question', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  name: { type: DataTypes.STRING, unique: true },
  answer: { type: DataTypes.STRING, allowNull: false, validate: { notNull: { msg: 'answer is required' } } },
  SubjectId: { type: DataTypes.INTEGER, allowNull: false, validate: { notNull: { msg: 'subjectId is required' } } },
  counter: { type: DataTypes.INTEGER, defaultValue: 0 },
})

export default Question
