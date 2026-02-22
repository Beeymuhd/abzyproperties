import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'abzy_properties',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function getConnection() {
  return pool.getConnection();
}

export async function query(sql: string, values?: any[]) {
  const connection = await getConnection();
  try {
    const [results] = await connection.execute(sql, values);
    return results;
  } finally {
    connection.release();
  }
}

export async function queryOne(sql: string, values?: any[]) {
  const results = await query(sql, values);
  return Array.isArray(results) ? results[0] : null;
}

export default pool;
