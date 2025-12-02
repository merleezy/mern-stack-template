import { AuthProvider } from './context/AuthContext'
import { AppRoutes } from './routes/AppRoutes'
import './styles/index.css'

/**
 * Main Application Component
 * Wraps the app with AuthProvider and sets up routing
 */
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App

