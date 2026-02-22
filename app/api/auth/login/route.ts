import { NextRequest, NextResponse } from 'next/server'
import { query, queryOne } from '@/lib/db'
import { verifyPassword } from '@/lib/password'
import { generateSessionToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user in database
    const user = await queryOne(
      'SELECT id, email, password_hash, name, role FROM users WHERE email = ?',
      [email]
    ) as any

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const passwordValid = await verifyPassword(password, user.password_hash)

    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate session
    const sessionToken = generateSessionToken()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    // Store session in database
    await query(
      'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
      [user.id, sessionToken, expiresAt]
    )

    const session = {
      user_id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      created_at: new Date(),
      expires_at: expiresAt,
    }

    const response = NextResponse.json(session, { status: 200 })

    // Set HTTP-only cookie
    response.cookies.set({
      name: 'abzy_session_token',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
