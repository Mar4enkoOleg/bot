"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubjectsAndQuestions = exports.createUsersAndRolesAndGroups = void 0;
const models_1 = require("../models");
const users = [
    // RoleId = 1 (defaultValue in sequelize model)
    {
        telegramId: 1,
        fullName: 'John Doe',
        userName: 'johnDoe',
        phone: '111-111-111',
        userType: 'Student',
        state: '.......',
        GroupId: 1,
    },
    {
        telegramId: 2,
        fullName: 'Ivanov Ivan',
        userName: 'Ivanushka',
        phone: '222-222-222',
        userType: 'Teacher',
        state: '.......',
        RoleId: 2,
        GroupId: 1,
    },
    {
        telegramId: 3,
        fullName: 'Petrov Petr',
        userName: 'Petruha',
        phone: '333-333-333',
        userType: 'Student',
        state: '.......',
        GroupId: 2,
    },
];
const roles = [
    {
        value: 'USER',
    },
    {
        value: 'ADMIN',
    },
    {
        value: 'SUPERADMIN',
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
const createUsersAndRolesAndGroups = () => {
    groups.map((group) => {
        models_1.sequelize.model('Group').create(group);
    });
    roles.map((role) => {
        models_1.sequelize.model('Role').create(role);
    });
    users.map((user) => {
        models_1.sequelize.model('User').create(user);
    });
};
exports.createUsersAndRolesAndGroups = createUsersAndRolesAndGroups;
const createSubjectsAndQuestions = () => {
    subjects.map((sub) => {
        models_1.sequelize.model('Subject').create(sub);
    });
    questions.map((question) => {
        models_1.sequelize.model('Question').create(question);
    });
};
exports.createSubjectsAndQuestions = createSubjectsAndQuestions;
