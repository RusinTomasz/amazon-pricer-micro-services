import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import * as userService from '../services/user-service'
import { BadRequestError } from '../errors/BadRequestError'
import { PasswordManager } from '../services/PasswordManager'

export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const alreadyExistingUser = await userService.findUser(email)

  if (alreadyExistingUser.rowCount > 0) {
    throw new BadRequestError('Email in use')
  }

  const user = await userService.createUser(email, password)

  const userJwt = jwt.sign(
    {
      id: user.rows[0].id,
      email: user.rows[0].email
    },
    process.env.JWT_KEY!
  )

  req.session = {
    jwt: userJwt
  }

  res.status(201).send({ id: user.rows[0].id, email: user.rows[0].email })
}

export const signinUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await userService.findUser(email)

  if (user.rowCount === 0) {
    throw new BadRequestError('Invalid Credentials')
  }

  const passwordMatch = await PasswordManager.compare(
    user.rows[0].password,
    password
  )

  if (!passwordMatch) {
    throw new BadRequestError('Invalid Credentials')
  }

  const userJwt = jwt.sign(
    {
      id: user.rows[0].id,
      email: user.rows[0].email
    },
    process.env.JWT_KEY!
  )

  req.session = {
    jwt: userJwt
  }

  res.status(200).send({ id: user.rows[0].id, email: user.rows[0].email })
}

export const currentUser = async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null })
}

export const signout = async (req: Request, res: Response) => {
  req.session = null

  res.send({})
}
