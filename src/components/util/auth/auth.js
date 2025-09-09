const STORAGE_KEY = 'app_jwt_token'

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
  if (!token) return null
  try {
    const [, payload] = token.split('.')
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return null
  }
}