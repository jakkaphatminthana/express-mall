import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  WHITELIST_ORIGINS: process.env.WHITELIST_ORIGINS?.split(',') ?? [],

  //Database
  DB_NAME: process.env.POSTGRES_DB,
  DB_USER: process.env.POSTGRES_USER,
  DB_PASSWORD: process.env.POSTGRES_PASSWORD,
  DB_PORT: parseInt(process.env.POSTGRES_PORT || '5432', 10),
};

export default config;
