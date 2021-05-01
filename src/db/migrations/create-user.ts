'use strict'
module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      telegramId: { type: Sequelize.INTEGER, unique: true, allowNull: false, validate: { notNull: { msg: 'telegram ID is required' } } },
      fullName: { type: Sequelize.STRING, allowNull: false, validate: { notNull: { msg: 'full name is required' } } },
      userName: { type: Sequelize.STRING, allowNull: false, validate: { notNull: { msg: 'userName is required' } } },
      phone: { type: Sequelize.STRING, allowNull: true },
      userType: { type: Sequelize.STRING, allowNull: false, validate: { notNull: { msg: 'user type is required' } } },
      state: { type: Sequelize.STRING, defaultValue: '' },
      RoleId: { type: Sequelize.INTEGER, defaultValue: 1, allowNull: false },
    })
  },
  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.dropTable('Users')
  },
}
