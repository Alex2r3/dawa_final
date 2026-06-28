import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session from localStorage
  useEffect(() => {
    const token = localStorage.getItem('cq_token')
    const saved = localStorage.getItem('cq_user')
    if (token && saved) {
      try { setUser(JSON.parse(saved)) } catch { logout() }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    localStorage.setItem('cq_token', data.token)
    localStorage.setItem('cq_user',  JSON.stringify(data.user))
    setUser(data.user)
    return data
  }, [])

  const register = useCallback(async (username, email, password) => {
    const { data } = await api.post('/auth/register', { username, email, password })
    localStorage.setItem('cq_token', data.token)
    localStorage.setItem('cq_user',  JSON.stringify(data.user))
    setUser(data.user)
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('cq_token')
    localStorage.removeItem('cq_user')
    setUser(null)
  }, [])

  const updateUser = useCallback((updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates }
      localStorage.setItem('cq_user', JSON.stringify(updated))
      return updated
    })
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/me')
      localStorage.setItem('cq_user', JSON.stringify(data.user))
      setUser(data.user)
    } catch { /* keep current user */ }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
