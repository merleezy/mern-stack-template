import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import morgan from 'morgan'
import config from './config/env.js'
import { connectDB } from './config/database.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import { apiLimiter } from './middleware/rateLimiter.js'
import routes from './routes/index.js'
import logger from './utils/logger.js'

// Create Express app
const app = express()
const PORT = config.PORT || 4000

// Connect to database
connectDB()

// Security Middleware
app.use(helmet()) // Set security headers
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true, // Allow cookies
  })
)
app.use(mongoSanitize()) // Prevent NoSQL injection

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Logging Middleware
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(
    morgan('combined', {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  )
}

// Rate Limiting
app.use('/api', apiLimiter)

// API Routes
app.use('/api', routes)

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the API',
    version: '1.0.0',
    docs: '/api/health',
  })
})

// 404 Handler
app.use(notFound)

// Global Error Handler
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  logger.info(`Server running in ${config.NODE_ENV} mode on port ${PORT}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`)
  // Close server & exit process
  process.exit(1)
})