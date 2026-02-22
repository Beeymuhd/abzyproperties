'use server'

import type { Session } from './types'
import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'abzy_session_token'

export async function setServerSession(session: Session) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
  })
}

export async function getServerSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

    if (!sessionCookie?.value) return null

    const session = JSON.parse(sessionCookie.value)
    if (new Date(session.expires_at) > new Date()) {
      return session
    }

    await clearServerSession()
    return null
  } catch {
    return null
  }
}

export async function clearServerSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
