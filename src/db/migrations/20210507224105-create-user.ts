import { Roles } from '../../typeScript/enums';

export default {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      telegramId: {
        type: Sequelize.INTEGER,
        unique: true,
        aloowNull: false,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      userName: {
        type: Sequelize.STRING,

        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
      },
      userType: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: Roles.USER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface: any) => {
    await queryInterface.dropTable('Users');
  },
};
