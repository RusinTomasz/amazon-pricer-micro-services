import { Client, Pool } from 'pg'

const pool = new Pool({
  user: 'amazonpricer',
  host: 'auth-postgres-srv',
  database: 'amazonpricer',
  password: 'root',
  port: 5432,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0
})

const client = new Client({
  user: 'amazonpricer',
  host: 'auth-postgres-srv',
  database: 'amazonpricer',
  password: 'root',
  port: 5432
})

pool.on('connect', () => {
  console.log('Udało się połączyć z bazą danych!')
})

export { pool, client }
