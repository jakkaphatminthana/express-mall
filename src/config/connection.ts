import { Sequelize } from 'sequelize';

import config from '@/config/config';

const sequelize = new Sequelize({
  database: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
  dialect: 'postgres',
  host: 'localhost',
  logging: console.log,
});

export { sequelize };
