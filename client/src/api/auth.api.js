import apiClient from './client'

/**
 * Auth API Methods
 */
export const authAPI = {
  /**
   * Register new user
   */
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData)
    return response.data
  },

  /**
   * Login user
   */
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials)
    return response.data
  },

  /**
   * Logout user
   */
  logout: async () => {
    const response = await apiClient.post('/auth/logout')
    return response.data
  },

  /**
   * Get current user
   */
  getMe: async () => {
    const response = await apiClient.get('/auth/me')
    return response.data
  },

  /**
   * Refresh access token
   */
  refreshToken: async () => {
    const response = await apiClient.post('/auth/refresh')
    return response.data
  },
}
