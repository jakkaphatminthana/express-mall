require('dotenv').config();

module.exports = {
  development: {
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    host: 'localhost',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
};
