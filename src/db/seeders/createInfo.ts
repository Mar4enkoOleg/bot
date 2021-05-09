import { sequelize } from '../models';
import '../models/botInfo';
import '../models/cafedraInfo';

async function CreateCafedraInfo() {
  const check = await sequelize.model('CafedraInfo').findOne();
  if (!check) {
    await sequelize.model('CafedraInfo').create();
  } else {
    console.log('Cafedra info already exist');
  }
}
async function CreateBotInfo() {
  const check = await sequelize.model('BotInfo').findOne();
  if (!check) {
    await sequelize.model('BotInfo').create();
  } else {
    console.log('Bot info already exist');
  }
}
CreateCafedraInfo();
CreateBotInfo();
