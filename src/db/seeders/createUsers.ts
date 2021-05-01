import { GroupAttributes, QuestionAttributes, SubjectAttributes, UserAttributes } from '../../interfacesEnums'
import { RoleAttributes } from '../../interfacesEnums'
import { sequelize } from '../models'

const users: Array<UserAttributes> = [
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
]

const roles: Array<RoleAttributes> = [
  {
    value: 'USER',
  },
  {
    value: 'ADMIN',
  },
  {
    value: 'SUPERADMIN',
  },
]

const groups: Array<GroupAttributes> = [
  {
    name: 'Group1',
  },
  {
    name: 'Group2',
  },
]

const subjects: Array<SubjectAttributes> = [
  {
    title: 'Machine learning',
  },
  {
    title: 'Deep learning',
  },
]

const questions: Array<QuestionAttributes> = [
  { name: 'Вопрос1', answer: 'Answer1', SubjectId: 1 },
  { name: 'Question2', answer: 'Answer2', SubjectId: 1 },
  { name: 'Question3', answer: 'Answer3', SubjectId: 1 },
  { name: 'Question4', answer: 'Answer4', SubjectId: 1 },
  { name: 'Question5', answer: 'Answer5', SubjectId: 2 },
  { name: 'Question6', answer: 'Answer6', SubjectId: 2 },
  { name: 'Question7', answer: 'Answer7', SubjectId: 2 },
]

export const createUsersAndRolesAndGroups = () => {
  groups.map(async (group) => {
    await sequelize.model('Group').create(group)
  })

  roles.map(async (role) => {
    await sequelize.model('Role').create(role)
  })

  users.map(async (user) => {
    await sequelize.model('User').create(user)
  })
}

export const createSubjectsAndQuestions = async () => {
  subjects.map(async (sub) => {
    await sequelize.model('Subject').create(sub)
  })
  questions.map(async (question) => {
    await sequelize.model('Question').create(question)
  })
}
