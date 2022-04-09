import express from 'express'
import * as authController from '../controllers/authController'
import { validateSchema } from '../middlewares/validSchema'

const router = express.Router()

router.post(
  '/api/users/signup',
  validateSchema('authSchema'),
  authController.signupUser
)

export { router as signupRouter }
