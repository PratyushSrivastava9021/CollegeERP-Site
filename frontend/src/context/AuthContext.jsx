import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../utils/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      checkAuthStatus()
    } else {
      setLoading(false)
    }
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await api.get('/auth/me')
      setUser(response.data.data.user)
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      setError(null)
      const response = await api.post('/auth/login', { email, password })
      const { user, token, role } = response.data.data
      
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)
      
      return { success: true, role: role || user.role, user }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      setError(message)
      return { success: false, message }
    }
  }

  const register = async (userData) => {
    try {
      setError(null)
      const response = await api.post('/auth/register', userData)
      const { user, token, role } = response.data.data
      
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)
      
      return { success: true, role: role || user.role, user }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      setError(message)
      return { success: false, message }
    }
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
      setUser(null)
      setError(null)
    }
  }

  const updateProfile = async (profileData) => {
    try {
      setError(null)
      const response = await api.put('/users/profile', profileData)
      setUser(response.data.data.user)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed'
      setError(message)
      return { success: false, message }
    }
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    setError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
