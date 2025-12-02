import mongoose from 'mongoose'
import logger from '../utils/logger.js'

/**
 * Connect to MongoDB
 */
export const connectDB = async () => {
  try {
    const options = {
      // These options are no longer needed in Mongoose 6+, but included for backwards compatibility
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, options)

    logger.info(`MongoDB connected: ${conn.connection.host}`)

    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB connection error: ${err.message}`)
    })

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected')
    })

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected')
    })
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`)
    process.exit(1)
  }
}

/**
 * Graceful shutdown
 */
const gracefulShutdown = async (signal) => {
  logger.info(`${signal} received. Closing MongoDB connection...`)
  try {
    await mongoose.connection.close()
    logger.info('MongoDB connection closed')
    process.exit(0)
  } catch (error) {
    logger.error(`Error closing MongoDB connection: ${error.message}`)
    process.exit(1)
  }
}

// Handle shutdown signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'))
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
