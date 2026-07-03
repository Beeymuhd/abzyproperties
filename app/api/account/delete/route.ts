import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function DELETE(req: NextRequest) {
  try {
    const { user_id } = await req.json()

    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Delete saved properties
    const { error: savedError } = await supabaseAdmin
      .from('saved_properties')
      .delete()
      .eq('user_id', user_id)

    if (savedError) throw savedError

    // Delete inquiries
    const { error: inquiryError } = await supabaseAdmin
      .from('inquiries')
      .delete()
      .eq('user_id', user_id)

    if (inquiryError) throw inquiryError

    // Delete sessions
    const { error: sessionError } = await supabaseAdmin
      .from('sessions')
      .delete()
      .eq('user_id', user_id)

    if (sessionError) throw sessionError

    // Delete user
    const { error: userError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', user_id)

    if (userError) throw userError

    const response = NextResponse.json({
      success: true,
      message: 'Account deleted successfully.',
    })

    // Remove login cookie
    response.cookies.set({
      name: 'abzy_session_token',
      value: '',
      expires: new Date(0),
      httpOnly: true,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('[DELETE ACCOUNT]', error)

    return NextResponse.json(
      {
        error: 'Failed to delete account',
      },
      {
        status: 500,
      }
    )
  }
}