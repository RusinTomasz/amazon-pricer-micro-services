import express from 'express'
import * as authController from '../controllers/authController'

const router = express.Router()

router.post('/api/users/signout', authController.signout)

export { router as singoutRouter }
