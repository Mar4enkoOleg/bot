import { RoleAttributes } from '../../helpers/interfacesEnums';
import { sequelize } from '../models';
import '../models/role';

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
];

async function createRoles() {
  roles.map(async (role) => {
    await sequelize.model('Role').create(role);
  });
}

createRoles();
