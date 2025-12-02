import jwt from 'jsonwebtoken'
import AppError from '../utils/AppError.js'
import { asyncHandler } from './asyncHandler.js'
import { User } from '../models/User.js'

/**
 * Generate JWT Token
 */
export const generateToken = (userId, expiresIn = '15m') => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn,
  })
}

/**
 * Verify JWT Token
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    throw new AppError('Invalid or expired token', 401)
  }
}

/**
 * Protect Route Middleware
 * Verifies JWT token and attaches user to request
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  // If no token found
  if (!token) {
    throw new AppError('Not authorized to access this route', 401)
  }

  try {
    // Verify token
    const decoded = verifyToken(token)

    // Get user from token
    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      throw new AppError('User no longer exists', 401)
    }

    // Check if user is active
    if (!user.isActive) {
      throw new AppError('User account is deactivated', 401)
    }

    // Attach user to request
    req.user = user
    next()
  } catch (error) {
    throw new AppError('Not authorized to access this route', 401)
  }
})

/**
 * Restrict to specific roles
 * Usage: restrictTo('admin', 'moderator')
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError(
        'You do not have permission to perform this action',
        403
      )
    }
    next()
  }
}
