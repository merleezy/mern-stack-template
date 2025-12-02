import dotenv from 'dotenv'
import { z } from 'zod'

// Load environment variables
dotenv.config()

/**
 * Environment Variable Schema
 * Validates and type-checks all required environment variables
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().default('4000'),
  MONGODB_URI: z.string().min(1, 'MongoDB URI is required'),
  JWT_SECRET: z
    .string()
    .min(32, 'JWT Secret must be at least 32 characters long'),
  JWT_EXPIRE: z.string().default('15m'),
  JWT_REFRESH_EXPIRE: z.string().default('7d'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
})

/**
 * Validate environment variables
 */
let config

try {
  config = envSchema.parse(process.env)
} catch (error) {
  console.error('❌ Invalid environment variables:')
  if (error instanceof z.ZodError) {
    error.errors.forEach((err) => {
      console.error(`  - ${err.path.join('.')}: ${err.message}`)
    })
  }
  process.exit(1)
}

export default config
