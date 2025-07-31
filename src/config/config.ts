import dotenv from 'dotenv';

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  //Database
  DB_NAME: process.env.POSTGRES_DB,
  DB_USER: process.env.POSTGRES_USER,
  DB_PASSWORD: process.env.POSTGRES_PASSWORD,
  DB_PORT: parseInt(process.env.POSTGRES_PORT || '5432'),
};

export default config;
