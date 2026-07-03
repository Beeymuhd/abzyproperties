import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-side only
)

export async function POST(request: NextRequest) {
  try {
 const { username, password } = await request.json()
    if (!username || !password) {
      return NextResponse.json({ error: 'username and password are required' }, { status: 400 })
    }

    // Fetch user from Supabase
    const { data: users, error } = await supabase
  .from('users')
  .select('id, username, email, password_hash, name, role')
  .eq('username', username)
  .limit(1)

    if (error) throw error
    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
    }

    const user = users[0]

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password_hash)
    if (!passwordValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
    }

    // Generate session token (you can reuse your generateSessionToken function)
    const sessionToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    // Store session in Supabase sessions table
    const { error: sessionError } = await supabase
      .from('sessions')
      .insert([{ user_id: user.id, token: sessionToken, expires_at: expiresAt }])

    if (sessionError) throw sessionError

    // Respond with session and set HTTP-only cookie
   const response = NextResponse.json({
  user_id: user.id,
  username: user.username,
  email: user.email,
  name: user.name,
  role: user.role,
  created_at: new Date().toISOString(),
  expires_at: expiresAt.toISOString(),
})

    response.cookies.set({
      name: 'abzy_session_token',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    })

    return response
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json({ error: 'Internal server error', details: (error as Error).message }, { status: 500 })
  }
}