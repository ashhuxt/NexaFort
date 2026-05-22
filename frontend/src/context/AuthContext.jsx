import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('nexafort_user')
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    const { accessToken, refreshToken, user: u } = res.data.data
    localStorage.setItem('nexafort_token',   accessToken)
    localStorage.setItem('accessToken',      accessToken)
    localStorage.setItem('nexafort_refresh', refreshToken)
    localStorage.setItem('refreshToken',     refreshToken)
    localStorage.setItem('nexafort_user',    JSON.stringify(u))
    setUser(u)
    return u
  }

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password })
    const { accessToken, refreshToken, user: u } = res.data.data
    localStorage.setItem('nexafort_token',   accessToken)
    localStorage.setItem('accessToken',      accessToken)
    localStorage.setItem('nexafort_refresh', refreshToken)
    localStorage.setItem('refreshToken',     refreshToken)
    localStorage.setItem('nexafort_user',    JSON.stringify(u))
    setUser(u)
    return u
  }

  const logout = () => { localStorage.clear(); setUser(null) }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
