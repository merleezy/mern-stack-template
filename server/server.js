import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import morgan from 'morgan'
import config from './config/env.js'
import { connectDB, closeDB } from './config/database.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import { apiLimiter } from './middleware/rateLimiter.js'
import routes from './routes/index.js'
import logger from './utils/logger.js'

// Create Express app
const app = express()
const PORT = config.PORT

// Connect to database
connectDB()

// Security Middleware
app.use(helmet()) // Set security headers
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true)
      
      const allowedOrigins = Array.isArray(config.CORS_ORIGIN)
        ? config.CORS_ORIGIN
        : [config.CORS_ORIGIN]
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true, // Allow cookies
  })
)
app.use(mongoSanitize()) // Prevent NoSQL injection

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser()) // Parse cookies

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
const server = app.listen(PORT, () => {
  logger.info(`Server running in ${config.NODE_ENV} mode on port ${PORT}`)
})

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  logger.info(`${signal} received. Shutting down gracefully...`)
  server.close(async () => {
    logger.info('HTTP server closed')
    try {
      await closeDB()
      process.exit(0)
    } catch (error) {
      logger.error('Error during shutdown:', error)
      process.exit(1)
    }
  })
  
  // Force close after 10 seconds
  setTimeout(() => {
    logger.error('Forcing shutdown after timeout')
    process.exit(1)
  }, 10000)
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`)
  // Close server & exit process
  process.exit(1)
})