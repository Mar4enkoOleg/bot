import { DataTypes } from 'sequelize'
import { sequelize } from '.'

const BotInfo = sequelize.define('BotInfo', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'About bot',
    get() {
      const result = this.getDataValue('description')
      return result
    },
  },
})

export default BotInfo
