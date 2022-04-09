import express from 'express'
import { validateSchema } from '../middlewares/validSchema'
import * as authController from '../controllers/authController'

const router = express.Router()

router.post(
  '/api/users/signin',
  validateSchema('authSchema'),
  authController.signinUser
)

export { router as signinRouter }
