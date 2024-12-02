import { Pool, QueryResult } from 'pg';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../../config/env-config';

export const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: 5432
});


export const executeQuery = async <T>(query: string, values: any[]): Promise<T[]> => {
  try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows;
  } catch (err) {
      console.error('Error executing query', err);
      throw err;
  }
};