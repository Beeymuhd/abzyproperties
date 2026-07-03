import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .select('name, phone, email')
      .eq('id', userId)
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { user_id, name, phone } = await request.json()

    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('users')
      .update({
        name,
        phone,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user_id)

    if (error) throw error

    return NextResponse.json({
      success: true,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}