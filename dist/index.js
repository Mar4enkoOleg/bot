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
const models_1 = require("./db/models");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
require("./db/models/user");
require("./db/models/role");
require("./db/models/question");
require("./db/models/subject");
require("./db/models/group");
require("./db/models/cafedraInfo");
const users_1 = __importDefault(require("./routes/users"));
const subjects_1 = __importDefault(require("./routes/subjects"));
const questions_1 = __importDefault(require("./routes/questions"));
const popQuestions_1 = __importDefault(require("./routes/popQuestions"));
const questionsNoAnswer_1 = __importDefault(require("./routes/questionsNoAnswer"));
const cafedraInfo_1 = __importDefault(require("./routes/cafedraInfo"));
const botInfo_1 = __importDefault(require("./routes/botInfo"));
const usersInfo_1 = __importDefault(require("./routes/usersInfo"));
const updateAdmin_1 = __importDefault(require("./routes/updateAdmin"));
const body_parser_1 = __importDefault(require("body-parser"));
const createUsers_1 = require("./db/helpers/createUsers");
const createInfo_1 = __importDefault(require("./db/helpers/createInfo"));
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/users', users_1.default);
app.use('/subjects', subjects_1.default);
app.use('/questions', questions_1.default);
app.use('/info', cafedraInfo_1.default);
app.use('/botInfo', botInfo_1.default);
app.use('/popQuestions', popQuestions_1.default);
app.use('/noAnswer', questionsNoAnswer_1.default);
app.use('/usersInfo', usersInfo_1.default);
app.use('/admins', updateAdmin_1.default);
app.use(errorHandler_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(process.env.NODE_ENV);
        yield models_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        yield models_1.sequelize.sync({ force: true });
        console.log('All models were synchronized successfully.');
        yield createInfo_1.default();
        createUsers_1.createUsersAndRolesAndGroups();
        createUsers_1.createSubjectsAndQuestions();
        app.listen(port, () => console.log(`Server start on ${port} port`));
    }
    catch (error) {
        console.error(error);
    }
});
start();
