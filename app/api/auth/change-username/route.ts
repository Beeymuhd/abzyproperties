import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function PUT(request: NextRequest) {
  try {
    const { currentUsername, newUsername } =
      await request.json()

    const sessionToken =
      request.cookies.get('abzy_session_token')?.value

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const { data: session } = await supabase
      .from('sessions')
      .select('*')
      .eq('token', sessionToken)
      .single()

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user_id)
      .single()

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (user.username !== currentUsername) {
      return NextResponse.json(
        { error: 'Current username is incorrect' },
        { status: 400 }
      )
    }

    const { data: existingUser } =
      await supabase
        .from('users')
        .select('id')
        .eq('username', newUsername)
        .maybeSingle()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('users')
      .update({
        username: newUsername,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Username updated successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error.message ||
          'Failed to update username',
      },
      { status: 500 }
    )
  }
}