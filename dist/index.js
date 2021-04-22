"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { server } from './config'
const users_1 = __importDefault(require("./routes/users"));
const app = express_1.default();
const port = process.env.PORT || 3000;
app.use('/users', users_1.default);
app.listen(port, () => console.log(`Server start on ${port} port`));
