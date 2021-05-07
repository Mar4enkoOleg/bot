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
const interfacesEnums_1 = require("../../interfacesEnums");
const interfacesEnums_2 = require("../../interfacesEnums");
const models_1 = require("../models");
require("../models/group");
require("../models/user");
require("../models/subject");
require("../models/question");
const users = [
    // RoleId = 1 (defaultValue in sequelize model)
    {
        telegramId: 1,
        fullName: 'John Doe',
        userName: 'johnDoe',
        phone: '111-111-111',
        userType: interfacesEnums_2.UserType.STUDENT,
        state: '.......',
        GroupId: 1,
    },
    {
        telegramId: 2,
        fullName: 'Ivanov Ivan',
        userName: 'Ivanushka',
        phone: '222-222-222',
        userType: interfacesEnums_2.UserType.TEACHER,
        state: '.......',
        role: interfacesEnums_1.Roles.ADMIN,
        GroupId: 1,
    },
    {
        telegramId: 3,
        fullName: 'Petrov Petr',
        userName: 'Petruha',
        phone: '333-333-333',
        userType: interfacesEnums_2.UserType.STUDENT,
        state: '.......',
        GroupId: 2,
    },
];
const groups = [
    {
        name: 'Group1',
    },
    {
        name: 'Group2',
    },
];
const subjects = [
    {
        title: 'Machine learning',
    },
    {
        title: 'Deep learning',
    },
];
const questions = [
    { name: 'Вопрос1', answer: 'Answer1', SubjectId: 1 },
    { name: 'Question2', answer: 'Answer2', SubjectId: 1 },
    { name: 'Question3', answer: 'Answer3', SubjectId: 1 },
    { name: 'Question4', answer: 'Answer4', SubjectId: 1 },
    { name: 'Question5', answer: 'Answer5', SubjectId: 2 },
    { name: 'Question6', answer: 'Answer6', SubjectId: 2 },
    { name: 'Question7', answer: 'Answer7', SubjectId: 2 },
];
function createUsersAndGroups() {
    return __awaiter(this, void 0, void 0, function* () {
        groups.map((group) => __awaiter(this, void 0, void 0, function* () {
            yield models_1.sequelize.model('Group').create(group);
        }));
        users.map((user) => __awaiter(this, void 0, void 0, function* () {
            yield models_1.sequelize.model('User').create(user);
        }));
    });
}
function createSubjectsAndQuestions() {
    return __awaiter(this, void 0, void 0, function* () {
        subjects.map((sub) => __awaiter(this, void 0, void 0, function* () {
            yield models_1.sequelize.model('Subject').create(sub);
        }));
        questions.map((question) => __awaiter(this, void 0, void 0, function* () {
            yield models_1.sequelize.model('Question').create(question);
        }));
    });
}
createUsersAndGroups();
createSubjectsAndQuestions();
