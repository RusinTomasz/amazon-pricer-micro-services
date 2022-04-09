import express from 'express'
import * as authController from '../controllers/authController'
import { currentUser } from '../middlewares/currentUser'

const router = express.Router()

router.get('/api/users/currentuser', currentUser, authController.currentUser)

export { router as currentUserRouter }
