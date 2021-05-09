"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = __importDefault(require("./helpers/middleware/errorHandler"));
require("./db/models/user");
require("./db/models/question");
require("./db/models/subject");
require("./db/models/group");
require("./db/models/cafedraInfo");
const usersRouter_1 = __importDefault(require("./entities/user/usersRouter"));
const subjectRouter_1 = __importDefault(require("./entities/subject/subjectRouter"));
const questionsRouter_1 = __importDefault(require("./entities/questions/questionsRouter"));
const infoRouter_1 = __importDefault(require("./entities/info/infoRouter"));
const usersInfoRouter_1 = __importDefault(require("./entities/user/usersInfoRouter"));
const updateAdminRouter_1 = __importDefault(require("./entities/user/updateAdminRouter"));
const app = express_1.default();
// Loger
// ===========================================
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
// middlewares
// ===========================================
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Routes
// ===========================================
app.use('/users', usersRouter_1.default);
app.use('/admins', updateAdminRouter_1.default);
app.use('/usersInfo', usersInfoRouter_1.default);
app.use('/subjects', subjectRouter_1.default);
app.use('/questions', questionsRouter_1.default);
app.use('/info', infoRouter_1.default);
app.use(errorHandler_1.default);
exports.default = app;
