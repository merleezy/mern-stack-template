import express from 'express'
import authRoutes from './auth.routes.js'

const router = express.Router()

/**
 * Health Check Route
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  })
})

/**
 * API Routes
 */
router.use('/auth', authRoutes)

// Add more routes here as you build your application
// router.use('/users', userRoutes)
// router.use('/posts', postRoutes)
// router.use('/comments', commentRoutes)

export default router
