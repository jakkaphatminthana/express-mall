import { Sequelize } from 'sequelize';

import config from '@/config';

const sequelize = new Sequelize({
  database: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
  dialect: 'postgres',
  host: 'localhost',
  logging: false, //console.log
});

export { sequelize };
