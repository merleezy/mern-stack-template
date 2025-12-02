import { useAuth } from '../../context/AuthContext'
import './Dashboard.css'

const Dashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={logout} className="btn-logout">
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        <div className="user-card">
          <h2>Welcome, {user?.username}!</h2>
          <div className="user-info">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Name:</strong> {user?.fullName || 'Not set'}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Member since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="quick-links">
          <h3>Quick Links</h3>
          <p>Add your application content here</p>
          {/* Add your dashboard widgets and content here */}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
