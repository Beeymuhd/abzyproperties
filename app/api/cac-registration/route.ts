import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
// GET CAC INFO
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('cac_registration')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data || {})
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to fetch CAC information' },
      { status: 500 }
    )
  }
}

// CREATE OR UPDATE CAC INFO
export async function POST(request: NextRequest) {
  try {
    const { cac_number, document_url } = await request.json()

    const { data: existing } = await supabaseAdmin
      .from('cac_registration')
      .select('id')
      .eq('cac_number', cac_number)
      .maybeSingle()

    if (existing) {
      const { error } = await supabaseAdmin
        .from('cac_registration')
        .update({
  document_url,
  verified: true,
  updated_at: new Date().toISOString(),
})
        .eq('id', existing.id)

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        )
      }

      return NextResponse.json({
        message: 'CAC information updated successfully',
      })
    }

    const { data, error } = await supabaseAdmin
      .from('cac_registration')
      .insert([
  {
    cac_number,
    document_url,
    verified: true,
  },
])
      .select()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data[0], {
      status: 201,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to register CAC information' },
      { status: 500 }
    )
  }
}

// VERIFY CAC
export async function PUT(request: NextRequest) {
  try {
    const { id, verified } = await request.json()

    const { error } = await supabaseAdmin
      .from('cac_registration')
      .update({
        verified,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'CAC verification updated successfully',
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to update CAC information' },
      { status: 500 }
    )
  }
}