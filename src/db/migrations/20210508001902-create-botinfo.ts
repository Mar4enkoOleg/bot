'use strict'

export default {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('BotInfo', {
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'About bot',
      },
    })
  },
  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.dropTable('BotInfo')
  },
}
