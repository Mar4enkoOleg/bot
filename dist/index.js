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
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const users_1 = __importDefault(require("./routes/users"));
const models_1 = __importDefault(require("./models/models"));
const createUsers_1 = require("./helpers/createUsers");
const app = express_1.default();
app.use('/users', users_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.authenticate();
        console.log('Connection has been established successfully.');
        yield models_1.default.sync({ force: true });
        console.log('All models were synchronized successfully.');
        app.listen(config_1.server.port, () => console.log(`Server start on ${config_1.server.port} port`));
        createUsers_1.createUsersAndRoles();
    }
    catch (error) {
        console.error(error);
    }
});
start();
