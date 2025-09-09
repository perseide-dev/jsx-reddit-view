import { createContext, useContext, useState, useCallback } from 'react'
import { postLoginService, postRegisterService } from '@/services/auth.services'
import { getToken, saveToken, clearToken, parseJwt } from '@cu/auth/auth'

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
      const data = await postLoginService({ email, password })
      if (!data?.token) throw new Error('Respuesta inválida')
      saveToken(data.token)
      setToken(data.token)
      setUser(parseJwt(data.token))
      return true
    } catch (e) {
      setError(e.message || 'Error de autenticación')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (form) => {
    setLoading(true)
    setError(null)
    try {
      const data = await postRegisterService(form)
      return data
    } catch (e) {
      setError(e.message || 'Error de registro')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    clearToken()
    setToken(null)
    setUser(null)
  }, [])

  const value = {
    token,
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!token
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
