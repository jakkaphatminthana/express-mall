require('dotenv').config();

module.exports = {
  development: {
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    host: 'localhost',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
};
