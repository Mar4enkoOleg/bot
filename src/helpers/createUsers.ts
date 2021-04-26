import { UserAttributes } from '../interfaces/user'
import { RoleAttributes } from '../interfaces/role'
import sequelize from '../models/models'

const users: Array<UserAttributes> = [
  // roleId = 1 (defaultValue in sequelize model)
  {
    telegram_id: 1,
    full_name: 'John Doe',
    phone: '111-111-111',
    user_type: 'Student',
    state: '.......',
  },
  {
    telegram_id: 2,
    full_name: 'Ivanov Ivan',
    phone: '222-222-222',
    user_type: 'Teacher',
    state: '.......',
    roleId: 2,
  },
  {
    telegram_id: 3,
    full_name: 'Petrov Petr',
    phone: '333-333-333',
    user_type: 'Student',
    state: '.......',
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

export const createUsersAndRoles = () => {
  roles.map((role) => {
    sequelize.model('role').create(role)
  })

  users.map((user) => {
    sequelize.model('user').create(user)
  })
}
