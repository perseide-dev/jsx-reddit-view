const STORAGE_KEY = 'app_jwt_token'

export async function loginRequest(credentials) {
  const base = import.meta.env.VITE_API_BASE || ''
  const res = await fetch(base + '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Credenciales inválidas')
  }
  const data = await res.json()
  if (!data.token) throw new Error('Respuesta sin token')
  return data.token
}

export function saveToken(token) {
  localStorage.setItem(STORAGE_KEY, token)
}

export function getToken() {
  return localStorage.getItem(STORAGE_KEY)
}

export function clearToken() {
  localStorage.removeItem(STORAGE_KEY)
}

export function parseJwt(token) {
  try {
    const [, payload] = token.split('.')
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return null
  }
}