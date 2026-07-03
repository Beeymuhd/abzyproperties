import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('settings')
      .select('*')
      .limit(1)
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    const {
      companyName,
      email,
      phone,
      address,
      description,
      timezone,
      currency,
      instagramUrl,
      whatsappUrl,
      tiktokUrl,
    } = body

    const { data, error } = await supabaseAdmin
      .from('settings')
      .update({
        company_name: companyName,
        email,
        phone,
        address,
        description,
        timezone,
        currency,
        instagram_url: instagramUrl,
        whatsapp_url: whatsappUrl,
        tiktok_url: tiktokUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}