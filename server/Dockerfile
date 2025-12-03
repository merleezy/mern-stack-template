# server/Dockerfile

FROM node:22-alpine

WORKDIR /app

# Ensure production mode inside the container
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install dependencies (production only) with BuildKit cache
# For Docker BuildKit: DOCKER_BUILDKIT=1 enables cache mounts
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

# Copy application code
COPY . .

# Create logs directory
RUN mkdir -p logs

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start server
CMD ["npm", "start"]
