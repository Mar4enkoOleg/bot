import { DataTypes } from 'sequelize'
import { any } from 'sequelize/types/lib/operators'
import { sequelize } from '.'

const CafedraInfo = sequelize.define('CafedraInfo', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'About cafedra',
    get() {
      const result = this.getDataValue('description')
      return result
    },
  },
})

export default CafedraInfo
