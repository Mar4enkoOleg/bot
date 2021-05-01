'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.createTable('Users', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            telegramId: { type: Sequelize.INTEGER, unique: true, allowNull: false, validate: { notNull: { msg: 'telegram ID is required' } } },
            fullName: { type: Sequelize.STRING, allowNull: false, validate: { notNull: { msg: 'full name is required' } } },
            userName: { type: Sequelize.STRING, allowNull: false, validate: { notNull: { msg: 'userName is required' } } },
            phone: { type: Sequelize.STRING, allowNull: true },
            userType: { type: Sequelize.STRING, allowNull: false, validate: { notNull: { msg: 'user type is required' } } },
            state: { type: Sequelize.STRING, defaultValue: '' },
            RoleId: { type: Sequelize.INTEGER, defaultValue: 1, allowNull: false },
        });
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.dropTable('Users');
    }),
};
