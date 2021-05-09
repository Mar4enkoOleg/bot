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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../db/models");
const app_1 = __importDefault(require("../app"));
const port = process.env.PORT || 3000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(process.env.NODE_ENV);
        yield models_1.sequelize.authenticate();
        console.log("Connection has been established successfully.");
        yield models_1.sequelize.sync();
        console.log("All models were synchronized successfully.");
        app_1.default.listen(port, () => console.log(`Server start on ${port} port`));
    }
    catch (error) {
        console.error(error);
    }
});
start();
exports.default = models_1.sequelize;
