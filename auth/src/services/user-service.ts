import { pool } from '../config/db'
import { PasswordManager } from './PasswordManager'
import { DatabaseConnectionError } from '../errors/DatabaseConnectionError'

export const findUser = async (userEmail: string) => {
  const client = await pool.connect()
  try {
    const user = await client.query(
      'SELECT * FROM public.user WHERE email = $1',
      [userEmail]
    )
    client.release()
    return user
  } catch (e) {
    client.release()
    throw new Error('Cannot find user')
  }
}

export const createUser = async (email: string, password: string) => {
  const client = await pool.connect()
  try {
    const hashedPassword = await PasswordManager.toHash(password)
    const query = {
      text: 'INSERT INTO public.user(email, password) VALUES($1, $2) RETURNING *',
      values: [email, hashedPassword]
    }
    const user = await client.query(query)
    client.release()
    return user
  } catch (e) {
    client.release()
    console.log('Creating user failed: ', e)
    throw new DatabaseConnectionError()
  }
}
