import { UserAttributes } from '../interfaces/user'
import { RoleAttributes } from '../interfaces/role'
import sequelize from '../models/models'

const users: Array<UserAttributes> = [
  {
    telegram_id: 1,
    full_name: 'John Doe',
    phone: '123123123',
    user_type: 'Student',
    state: '.......',
    roleId: 1,
  },
  {
    telegram_id: 2,
    full_name: 'Van Helsing',
    phone: '99999999',
    user_type: 'Teacher',
    state: '.......',
    roleId: 2,
  },
  {
    telegram_id: 3,
    full_name: 'Name Noneme',
    phone: '123123123',
    user_type: 'Student',
    state: '.......',
    roleId: 3,
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
