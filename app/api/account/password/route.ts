import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
import bcrypt from 'bcrypt'

export async function PUT(request: NextRequest) {
  try {
    const {
      user_id,
      currentPassword,
      newPassword,
    } = await request.json()

    if (!user_id || !currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data: user, error } = await supabaseAdmin 
      .from('users')
      .select('password_hash')
      .eq('id', user_id)
      .single()

    if (error || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      user.password_hash
    )

    if (!passwordMatches) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      )
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        password_hash: hashedPassword,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user_id)

    if (updateError) {
      throw updateError
    }

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
    })
  } catch (error: any) {
    console.error(error)

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}