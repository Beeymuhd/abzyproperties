import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
export async function GET() {
  try {
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    const { data: savedProperties } = await supabaseAdmin
  .from('saved_properties')
  .select('user_id')

    const usersWithSavedCount = users.map((user) => ({
      ...user,
      saved_count:
        savedProperties?.filter(
          (saved) => saved.user_id === user.id
        ).length || 0,
    }))

    return NextResponse.json(usersWithSavedCount)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}