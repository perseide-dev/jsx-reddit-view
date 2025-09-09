import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { loginRequest, getToken, saveToken, clearToken, parseJwt } from '@cu/auth/auth'

const AuthContext = createContext(null)
export default AuthContext

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken())
  const [user, setUser] = useState(() => (token ? parseJwt(token) : null))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const t = await loginRequest({ email, password })
      saveToken(t)
      setToken(t)
      setUser(parseJwt(t))
      return true
    } catch (e) {
      setError(e.message || 'Error de autenticación')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    clearToken()
    setToken(null)
    setUser(null)
  }, [])

  const value = { token, user, loading, error, login, logout, isAuthenticated: !!token }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}