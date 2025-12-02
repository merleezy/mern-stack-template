import { Link } from 'react-router-dom'
import './Home.css'

/**
 * Home Page
 * Landing page for non-authenticated users
 */
const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to {{ PROJECT_NAME }}</h1>
        <p>A modern MERN stack application template</p>
      </header>

      <div className="home-actions">
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
        <Link to="/register" className="btn btn-secondary">
          Get Started
        </Link>
      </div>

      <section className="home-features">
        <div className="feature">
          <h3>🚀 Production Ready</h3>
          <p>Built with best practices and security in mind</p>
        </div>
        <div className="feature">
          <h3>🔐 Authentication</h3>
          <p>JWT-based auth with refresh tokens</p>
        </div>
        <div className="feature">
          <h3>⚡ Modern Stack</h3>
          <p>React, Node.js, Express, MongoDB</p>
        </div>
      </section>
    </div>
  )
}

export default Home
