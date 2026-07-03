import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

export async function query(sql: string, values?: any[]) {
  const client = await pool.connect()
  try {
    const result = await client.query(sql, values)
    return result.rows
  } finally {
    client.release()
  }
}

export async function queryOne(sql: string, values?: any[]) {
  const rows = await query(sql, values)
  return rows[0] || null
}

export default pool