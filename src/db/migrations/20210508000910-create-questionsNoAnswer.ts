'use strict'

export default {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('QuestionsNoAnswers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
    })
  },
  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.dropTable('QuestionsNoAnswers')
  },
}
