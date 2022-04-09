import { client } from '../../config/db'

export const initDatabaseTables = async (tables: string[]) => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  try {
    await client.connect()
    await Promise.all(tables.map(table => client.query(table)))
    console.log(`Databse Initialization complete`)
    await client.end()
  } catch (e) {
    console.log('Databse Initialization', e)
    throw new Error('Databse Initialization error')
  }
}
