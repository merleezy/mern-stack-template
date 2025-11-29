# DevConnect

A lightweight “LinkedIn for developers” — a platform where developers can connect, post projects, follow others, and collaborate.

---

## Overview

DevConnect is a social platform designed specifically for developers.
Instead of generic social noise, it focuses on:

- sharing projects
- discussing technology
- forming niche communities
- and creating meaningful developer-to-developer interactions

---

## Purpose

Most developer communities are scattered across GitHub, Discord servers, StackOverflow, Reddit, etc.
DevConnect aims to centralize these interactions into one unified platform.

---

## Features (Planned)

- [ ] User registration + login (JWT)
- [ ] Create / edit / delete posts
- [ ] Like / dislike posts and comments
- [ ] Comment threads
- [ ] Real-time DM messaging
- [ ] User profiles with bio, skills, and project links
- [ ] Edit profile and account settings
- [ ] Personalized feed with recommended posts
- [ ] Follow/unfollow system
- [ ] Search for users, posts, or groups
- [ ] Create and join developer groups
- [ ] Group feeds and discussions

---

## Tech Stack

### Frontend

- React (Vite)
- JavaScript
- CSS / Tailwind (optional)

### Backend

- Node.js
- Express.js
- Mongoose (MongoDB ODM)

### Database

- MongoDB Atlas (production)
- MongoDB Docker container (development)

### Infrastructure / DevOps

- Docker & Docker Compose
- GitHub Actions (planned)
- Render / Vercel for deployment

---

## Learning Objectives

- Build a clean, scalable MERN application
- Understand REST API architecture + JWT authentication
- Use containerization with Docker
- Strengthen React design patterns and state management
- Learn CI/CD concepts for deployment

---

## User Flow Summary

Users can register, build a profile, follow other developers, create posts, comment, and join community groups.
A personalized feed shows posts from followed users, groups, and recommended content.

---

# Project Structure

```text
devconnect/
├── client/                 # Frontend (React + Vite)
│   ├── public/             # Static assets (favicon, manifest)
│   ├── src/
│   │   ├── assets/         # Images, fonts, and icons
│   │   ├── components/     # Reusable UI components (Buttons, Inputs)
│   │   ├── context/        # Global state (AuthContext, ThemeContext)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Full page views (Dashboard, Login)
│   │   ├── services/       # API service calls (Axios setup)
│   │   ├── styles/         # Global styles & Tailwind setup
│   │   ├── utils/          # Helper functions (dates, validation)
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Frontend entry point
│   ├── Dockerfile          # Frontend container configuration
│   ├── .env.example        # Client environment variables
│   ├── .eslintignore       # ESLint exclusion list
│   ├── .dockerignore       # Docker exclusion list
│   └── package.json        # Frontend dependencies
│
├── server/                 # Backend (Node.js + Express)
│   ├── config/             # DB connection & app configuration
│   ├── controllers/        # Request handlers (The "Brain")
│   ├── middleware/         # Auth checks, error handling, logging
│   ├── models/             # Mongoose schemas (Data structure)
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic isolation
│   ├── tests/              # Unit and integration tests
│   ├── utils/              # Backend helper functions
│   ├── server.js           # Backend entry point
│   ├── Dockerfile          # Backend container configuration
│   ├── .env.example        # Server environment variables
│   ├── .eslintignore       # ESLint exclusion list
│   ├── .dockerignore       # Docker exclusion list
│   └── package.json        # Backend dependencies
│
├── docker-compose.yml      # Orchestrates Client, Server, and Database
├── .gitignore              # Git exclusion list
├── package.json            # Root dependencies and scripts
├── .dockerignore           # Docker exclusion list
├── .editorconfig           # Editor configuration
├── .prettierrc             # Prettier configuration
└── README.md               # Project documentation
```
---

# Environment Variables

### Client `.env`

```env
VITE_API_URL=http://localhost:4000
```

### Server `.env`

```env
PORT=4000
MONGODB_URI=mongodb://mongo:27017/devconnect
JWT_SECRET=your-secret-here
```

Be sure to copy `.env.example` into `.env` when setting up locally.

---

npm install

# Setup Instructions

## 1. Clone the repository

```bash
git clone https://github.com/yourusername/devconnect.git
cd devconnect
```

## 2. Install dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd ../server
npm install
```

### Root dependencies

```bash
cd ..
npm install
```

## 3. Local Development (without Docker)

```bash
npm run dev
```

This starts:

- Frontend → http://localhost:5173
- Backend → http://localhost:4000

---

# Docker Setup

Docker runs client, server, and MongoDB at once.

### Start Docker

Ensure Docker Desktop is running, then in WSL:

# Docker Setup

Docker runs client, server, and MongoDB together.

### Start Docker

Ensure Docker (or Docker Desktop) is running, then in WSL / terminal:

```bash
docker compose up --build
```

### Services

- Client → http://localhost:5173
- Server → http://localhost:4000
- MongoDB → localhost:27017

### Stop Docker

Press `Ctrl + C` in the terminal running compose, then:

```bash
docker compose down
```

# Linting & Code Quality

### Frontend

```bash
cd client
npm run lint
```

### Backend

```bash
cd server
npm run lint
```

### Root

```bash
npm run lint
```

# Recommended VS Code Extensions

- ESLint (Microsoft)
- Prettier – Code formatter
- EditorConfig

# Future Enhancements

- [ ] Notifications settings
- [ ] Group chats in DMs
- [ ] Public/private groups
- [ ] Dark mode support
- [ ] Tag-based post discovery
- [ ] “Following only” feed
- [ ] Infinite scroll feed
- [ ] Skill tags or badges

React Docs – https://react.dev/
Express Docs – https://expressjs.com/
MongoDB Atlas Docs – https://www.mongodb.com/docs/atlas/
Docker Docs – https://docs.docker.com/
Vite Docs – https://vitejs.dev/guide/

---

# Notes

This project is actively being developed as a full-stack learning experience. Features and structure may evolve over time.
