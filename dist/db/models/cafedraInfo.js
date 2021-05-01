"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const CafedraInfo = _1.sequelize.define('CafedraInfo', {
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'About cafedra',
        get() {
            const result = this.getDataValue('description');
            return result;
        },
    },
});
exports.default = CafedraInfo;
