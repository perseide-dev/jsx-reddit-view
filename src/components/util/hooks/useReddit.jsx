import { getRedditThreadsService } from "@/services/reddit.services"
import { useState, useCallback } from "react"
import { useAuth } from "@cg/context/AuthContext"  


export const useReddit = () => {
  const { token, isAuthenticated, logout } = useAuth()
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const getPosts = useCallback(async (queryData = {}) => {
    if (!isAuthenticated || !token) {
      setError('No autenticado')
      return
    }
    try {
      setLoading(true)
      setError(null)
      const res = await getRedditThreadsService(token, queryData)
      setResponse(res.data)
    } catch (err) {

      if (err?.response?.status === 401) {
        logout()
      }
      setError(err?.response?.data?.message || err.message || 'Error al cargar posts')
    } finally {
      setLoading(false)
    }
  }, [token, isAuthenticated, logout])

  return {
    response,
    error,
    loading,
    getPosts,
    hasData: !!response
  }
}