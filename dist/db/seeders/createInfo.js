"use strict";
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
const models_1 = require("../models");
require("../models/botInfo");
require("../models/cafedraInfo");
function CreateCafedraInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const check = yield models_1.sequelize.model('CafedraInfo').findOne();
        if (!check) {
            yield models_1.sequelize.model('CafedraInfo').create();
        }
        else {
            console.log('Cafedra info already exist');
        }
    });
}
function CreateBotInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const check = yield models_1.sequelize.model('BotInfo').findOne();
        if (!check) {
            yield models_1.sequelize.model('BotInfo').create();
        }
        else {
            console.log('Bot info already exist');
        }
    });
}
CreateCafedraInfo();
CreateBotInfo();
