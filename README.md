# {{PROJECT_NAME}} - Production-Ready MERN Stack Template

A modern, production-ready MERN (MongoDB, Express, React, Node.js) stack template with authentication, security best practices, and Docker support.

---

## 🚀 Features

### Backend
- ✅ **JWT Authentication** with access & refresh tokens
- ✅ **Security hardened** (Helmet, rate limiting, input sanitization)
- ✅ **Error handling** with development/production modes
- ✅ **Logging** with Winston (file & console)
- ✅ **Environment validation** with Zod
- ✅ **MongoDB** with Mongoose ODM
- ✅ **RESTful API** structure

### Frontend
- ✅ **React 19** with Vite
- ✅ **React Router** for navigation
- ✅ **Auth Context** for state management
- ✅ **Protected routes**
- ✅ **Axios** with interceptors for API calls
- ✅ **Responsive** starter pages

### DevOps
- ✅ **Docker** & Docker Compose support
- ✅ **ESLint** & Prettier configured
- ✅ **Consistent** code style with EditorConfig
- ✅ **Production-ready** folder structure

---

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Docker & Docker Compose (optional)

---

## 🎯 Getting Started

### 1. Use This Template

On GitHub, click "Use this template" to create a new repository.

### 2. Clone Your Repository

\`\`\`bash
git clone https://github.com/yourusername/your-project-name.git
cd your-project-name
\`\`\`

### 3. Initialize the Project

Run the interactive initialization script:

\`\`\`bash
npm install
npm run init
\`\`\`

This will:
- Replace `my-awesome-app` placeholders with your project name
- Set up package.json metadata
- Generate a secure JWT secret (optional)
- Create a customized README

### 4. Set Up Environment Variables

\`\`\`bash
# Copy environment files
cp server/.env.example server/.env
cp client/.env.example client/.env
\`\`\`

Edit the `.env` files with your actual configuration.

**Important**: Update `JWT_SECRET` in `server/.env` with the generated secret!

### 5. Install Dependencies

\`\`\`bash
npm run install:all
\`\`\`

### 6. Start Development

\`\`\`bash
npm run dev
\`\`\`

This starts both client and server concurrently:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:4000
- **Health check**: http://localhost:4000/api/health

---

## 🐳 Docker Setup

### Start with Docker Compose

\`\`\`bash
docker compose up --build
\`\`\`

This starts:
- Frontend (port 5173)
- Backend (port 4000)
- MongoDB (port 27017)

### Stop Docker

\`\`\`bash
docker compose down
\`\`\`

---

## 📁 Project Structure

\`\`\`
my-awesome-app/
├── client/                    # React frontend
│   ├── src/
│   │   ├── api/              # API client & methods
│   │   ├── components/       # Reusable components
│   │   ├── context/          # React context (Auth, etc.)
│   │   ├── pages/            # Page components
│   │   ├── routes/           # Route configuration
│   │   ├── styles/           # CSS files
│   │   └── App.jsx           # Main app component
│   ├── package.json
│   └── .env.example
│
├── server/                    # Node.js backend
│   ├── config/               # Configuration files
│   │   ├── database.js       # MongoDB connection
│   │   └── env.js            # Environment validation
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Express middleware
│   │   ├── auth.js           # JWT authentication
│   │   ├── errorHandler.js   # Error handling
│   │   └── rateLimiter.js    # Rate limiting
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── utils/                # Utilities
│   │   ├── AppError.js       # Custom error class
│   │   └── logger.js         # Winston logger
│   ├── server.js             # Entry point
│   ├── package.json
│   └── .env.example
│
├── scripts/                   # Utility scripts
│   └── init-project.js       # Template initialization
├── docker-compose.yml        # Docker orchestration
├── package.json              # Root dependencies
└── README.md                 # This file
\`\`\`

---

## 🔐 Authentication

The template includes a complete JWT authentication system:

### Endpoints

- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user (protected)

### How It Works

1. **Access tokens** (short-lived, 15 min) are stored in localStorage
2. **Refresh tokens** (long-lived, 7 days) are stored in httpOnly cookies
3. Axios interceptor automatically refreshes expired access tokens
4. Protected routes require valid JWT

---

## 🛠️ Available Scripts

### Root

- `npm run dev` - Start both client and server
- `npm run install:all` - Install all dependencies
- `npm run lint` - Lint both client and server
- `npm run init` - Initialize template with your project details

### Client

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

### Server

- `npm run dev` - Start with nodemon
- `npm start` - Start production server
- `npm run lint` - Run ESLint

---

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Configured for specific origins
- **Rate Limiting** - Prevent brute force attacks
- **Input Sanitization** - Prevent NoSQL injection
- **Password Hashing** - bcrypt with salt rounds
- **JWT** - Secure token-based authentication
- **Environment Validation** - Type-safe config with Zod

---

## 🧪 Customization Guide

### Add a New API Route

1. Create model in `server/models/`
2. Create controller in `server/controllers/`
3. Create route file in `server/routes/`
4. Register route in `server/routes/index.js`

### Add a New Frontend Page

1. Create component in `client/src/pages/YourPage/`
2. Add route in `client/src/routes/AppRoutes.jsx`
3. Link to it from other pages

### Add Protection to a Route

\`\`\`javascript
import { protect } from '../middleware/auth.js'

router.get('/protected', protect, yourController)
\`\`\`

### Add Role-Based Access

\`\`\`javascript
import { protect, restrictTo } from '../middleware/auth.js'

router.delete('/admin-only', protect, restrictTo('admin'), yourController)
\`\`\`

---

## 📝 Environment Variables

### Server (.env)

\`\`\`env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://mongo:27017/yourdb
JWT_SECRET=your-generated-secret-here
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=debug
\`\`\`

### Client (.env)

\`\`\`env
VITE_API_URL=http://localhost:4000/api
\`\`\`

---

## 📚 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (jsonwebtoken) |
| Security | Helmet, bcrypt, rate-limit |
| Logging | Winston, Morgan |
| Validation | Zod |
| Dev Tools | Vite, ESLint, Prettier, Nodemon |
| DevOps | Docker, Docker Compose |

---

## 🤝 Contributing

This is a template repository. After initializing your project, you can:

1. Remove the template-specific files
2. Update this README for your project
3. Add your own features and customizations

---

## 📄 License

MIT License - feel free to use this template for any project!

---

## 🙏 Acknowledgments

This template includes production-ready best practices for:
- Security hardening
- Error handling and logging
- Authentication and authorization
- Clean code architecture
- Docker containerization

Built with ❤️ for the developer community.

---

## 📖 Additional Resources

After running `npm run init`, see `README_ORIGINAL.md` for:
- Detailed architecture documentation
- Setup instructions
- Best practices guide
- Troubleshooting tips
