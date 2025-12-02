import { createContext, useState, useEffect, useContext } from 'react'
import { authAPI } from '../api/auth.api'

const AuthContext = createContext(null)

/**
 * Auth Context Provider
 * Manages authentication state and provides auth methods
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  /**
   * Check if user is logged in on mount
   */
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        try {
          const data = await authAPI.getMe()
          setUser(data.data.user)
        } catch (error) {
          localStorage.removeItem('accessToken')
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  /**
   * Register new user
   */
  const register = async (userData) => {
    try {
      setError(null)
      const data = await authAPI.register(userData)
      localStorage.setItem('accessToken', data.data.accessToken)
      setUser(data.data.user)
      return data
    } catch (error) {
      const message =
        error.response?.data?.message || 'Registration failed'
      setError(message)
      throw new Error(message)
    }
  }

  /**
   * Login user
   */
  const login = async (credentials) => {
    try {
      setError(null)
      const data = await authAPI.login(credentials)
      localStorage.setItem('accessToken', data.data.accessToken)
      setUser(data.data.user)
      return data
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      setError(message)
      throw new Error(message)
    }
  }

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('accessToken')
      setUser(null)
    }
  }

  /**
   * Update user data
   */
  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }))
  }

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Custom hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
