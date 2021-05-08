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
Object.defineProperty(exports, "__esModule", { value: true });
const interfacesEnums_1 = require("../../interfacesEnums");
exports.default = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.createTable('Users', {
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
                defaultValue: interfacesEnums_1.Roles.USER,
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
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.dropTable('Users');
    }),
};
