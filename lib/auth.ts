import type { Session } from './types'

const SESSION_STORAGE_KEY = 'abzy_session'
const SESSION_COOKIE_NAME = 'abzy_session_token'

export function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function setSession(session: Session): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  }
}

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null

  const sessionData = sessionStorage.getItem(SESSION_STORAGE_KEY)
  if (!sessionData) return null

  try {
    const session = JSON.parse(sessionData)
    if (new Date(session.expires_at) > new Date()) {
      return session
    }
    clearSession()
    return null
  } catch {
    return null
  }
}

export function clearSession(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(SESSION_STORAGE_KEY)
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null
}

export function isAdmin(): boolean {
  const session = getSession()
  return session?.role === 'admin'
}
