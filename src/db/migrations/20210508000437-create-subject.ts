'use strict'

export default {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('Subjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    })
  },
  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.dropTable('Subjects')
  },
}
