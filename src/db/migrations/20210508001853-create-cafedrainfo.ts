'use strict'

export default {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('CafedraInfos', {
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'About cafedra',
      },
    })
  },
  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.dropTable('CafedraInfos')
  },
}
