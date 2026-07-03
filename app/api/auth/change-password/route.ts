import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function PUT(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json()

if (newPassword.length < 8) {
  return NextResponse.json(
    { error: 'Password must be at least 8 characters' },
    { status: 400 }
  )
}

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

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.password_hash
    )

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    const samePassword = await bcrypt.compare(
  newPassword,
  user.password_hash
)

 if (samePassword) {
   return NextResponse.json(
     {
       error:
         'New password must be different from current password',
     },
     { status: 400 }
   )
 }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    )

    const { error } = await supabase
      .from('users')
      .update({
        password_hash: hashedPassword,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (error) {
      throw error
    }

    await supabase
  .from('sessions')
  .delete()
  .eq('user_id', user.id)

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error.message || 'Failed to change password',
      },
      { status: 500 }
    )
  }
}