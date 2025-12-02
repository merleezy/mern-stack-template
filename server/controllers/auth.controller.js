import { User } from '../models/User.js'
import AppError from '../utils/AppError.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { generateToken } from '../middleware/auth.js'
import logger from '../utils/logger.js'

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  })

  if (existingUser) {
    if (existingUser.email === email) {
      throw new AppError('Email already in use', 409)
    }
    if (existingUser.username === username) {
      throw new AppError('Username already taken', 409)
    }
  }

  // Create new user
  const user = await User.create({
    username,
    email,
    password,
    firstName,
    lastName,
  })

  // Generate tokens
  const accessToken = generateToken(user._id, process.env.JWT_EXPIRE)
  const refreshToken = generateToken(
    user._id,
    process.env.JWT_REFRESH_EXPIRE
  )

  // Set refresh token in httpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })

  logger.info(`New user registered: ${user.email}`)

  res.status(201).json({
    success: true,
    data: {
      user: user.toJSON(),
      accessToken,
    },
    message: 'Registration successful',
  })
})

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Validate input
  if (!email || !password) {
    throw new AppError('Please provide email and password', 400)
  }

  // Find user and include password field
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    throw new AppError('Invalid email or password', 401)
  }

  // Check if user is active
  if (!user.isActive) {
    throw new AppError('Account is deactivated', 401)
  }

  // Verify password
  const isPasswordValid = await user.comparePassword(password)

  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401)
  }

  // Update last login
  await user.updateLastLogin()

  // Generate tokens
  const accessToken = generateToken(user._id, process.env.JWT_EXPIRE)
  const refreshToken = generateToken(
    user._id,
    process.env.JWT_REFRESH_EXPIRE
  )

  // Set refresh token in httpOnly cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  logger.info(`User logged in: ${user.email}`)

  res.json({
    success: true,
    data: {
      user: user.toJSON(),
      accessToken,
    },
    message: 'Login successful',
  })
})

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logout = asyncHandler(async (req, res) => {
  // Clear refresh token cookie
  res.clearCookie('refreshToken')

  logger.info(`User logged out: ${req.user.email}`)

  res.json({
    success: true,
    message: 'Logout successful',
  })
})

/**
 * @desc    Refresh access token
 * @route   POST /api/auth/refresh
 * @access  Public
 */
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.cookies

  if (!token) {
    throw new AppError('No refresh token provided', 401)
  }

  // Verify refresh token
  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  // Get user
  const user = await User.findById(decoded.userId)

  if (!user) {
    throw new AppError('User not found', 404)
  }

  if (!user.isActive) {
    throw new AppError('Account is deactivated', 401)
  }

  // Generate new access token
  const accessToken = generateToken(user._id, process.env.JWT_EXPIRE)

  res.json({
    success: true,
    data: {
      accessToken,
    },
    message: 'Token refreshed successfully',
  })
})

/**
 * @desc    Get current user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user,
    },
  })
})
