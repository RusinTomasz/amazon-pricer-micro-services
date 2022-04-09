import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/currentUser'
import { signinRouter } from './routes/signin'
import { singoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/errorHandler'
import { NotFoundError } from './errors/NotFoundError'
import { createUserTableQuery } from './database/init-queries'
import { initDatabaseTables } from './database/seeders'

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(singoutRouter)
app.use(signupRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Listening on port 3000')
})

initDatabaseTables([createUserTableQuery])
