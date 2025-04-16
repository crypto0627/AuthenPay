import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.DB_HOST || '35.78.206.238',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'mydatabase',
  port: 5432,
})

export default pool
