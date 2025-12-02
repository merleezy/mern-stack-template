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
          <h2>Profile Information</h2>
          <div className="user-info">
            <p><strong>Username</strong> <span>{user?.username}</span></p>
            <p><strong>Email</strong> <span>{user?.email}</span></p>
            <p><strong>Full Name</strong> <span>{user?.fullName || 'Not set'}</span></p>
            <p><strong>Role</strong> <span className="badge">{user?.role}</span></p>
            <p><strong>Member Since</strong> <span>{new Date(user?.createdAt).toLocaleDateString()}</span></p>
          </div>
        </div>

        <div className="quick-links">
          <h3>Application Status</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">Active</span>
              <span className="stat-label">Account Status</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">Profile Complete</span>
            </div>
          </div>
          <p style={{ marginTop: '2rem' }}>
            This is a starter template. Customize this dashboard to show relevant application data.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
