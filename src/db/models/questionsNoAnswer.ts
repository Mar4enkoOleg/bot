import { DataTypes } from 'sequelize'
import { sequelize } from '.'

const QuestionNoAnswer = sequelize.define('QuestionNoAnswer', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
})

export default QuestionNoAnswer
