'use strict';

export default {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING, unique: true },
      answer: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notNull: { msg: 'answer is required' } },
      },
      SubjectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: { notNull: { msg: 'subjectId is required' } },
      },
      counter: { type: Sequelize.INTEGER, defaultValue: 0 },
    });
  },
  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.dropTable('Questions');
  },
};
