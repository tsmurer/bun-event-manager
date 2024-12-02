import dotenv from 'dotenv';

dotenv.config();

// APP
export const PORT = Number(process.env.PORT) || 3000;

// DATABASE
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

export { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME };
