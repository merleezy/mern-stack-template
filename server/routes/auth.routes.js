import express from 'express'
import {
  register,
  login,
  logout,
  refreshToken,
  getMe,
} from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.js'
import { authLimiter } from '../middleware/rateLimiter.js'

const router = express.Router()

/**
 * Public Routes
 */
router.post('/register', authLimiter, register)
router.post('/login', authLimiter, login)
router.post('/refresh', refreshToken)

/**
 * Protected Routes
 */
router.post('/logout', protect, logout)
router.get('/me', protect, getMe)

export default router
