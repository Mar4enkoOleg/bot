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
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
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
const info_1 = __importDefault(require("./routes/info"));
const usersInfo_1 = __importDefault(require("./routes/usersInfo"));
const updateAdmin_1 = __importDefault(require("./routes/updateAdmin"));
const app = express_1.default();
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/users', users_1.default);
app.use('/subjects', subjects_1.default);
app.use('/questions', questions_1.default);
app.use('/info', info_1.default);
app.use('/usersInfo', usersInfo_1.default);
app.use('/admins', updateAdmin_1.default);
app.use(errorHandler_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(process.env.NODE_ENV);
        yield models_1.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        yield models_1.sequelize.sync();
        console.log('All models were synchronized successfully.');
        app.listen(port, () => console.log(`Server start on ${port} port`));
    }
    catch (error) {
        console.error(error);
    }
});
start();
