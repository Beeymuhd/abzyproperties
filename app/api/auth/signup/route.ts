import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { name, username, email, password } = await req.json()

    // Check if username exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('username', username)
      .single()

    if (existingUser) {
      return NextResponse.json({ error: 'username already registered' }, { status: 400 })
    }

    // Hash password
    const password_hash = bcrypt.hashSync(password, 10)

    // Insert new user
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([{ name, username, email, password_hash }])
      .select()
      .single()

    if (error || !data) {
      console.error(error)
      return NextResponse.json({ error: 'Signup failed' }, { status: 500 })
    }

    // Return session object
   const session = {
  user_id: data.id,
  username: data.username,
  name: data.name,
  email: data.email,
  role: data.role,

  created_at: new Date().toISOString(),

  expires_at: new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 7
  ).toISOString(),
}

    return NextResponse.json(session)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}