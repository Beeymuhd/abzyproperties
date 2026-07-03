import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin'
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      user_id,
      property_id,
      property_title,
      name,
      contact,
      method,
      message,
    } = await request.json()

    const { data, error } = await supabaseAdmin
      .from('inquiries')
      .insert([
        {
          user_id,
          property_id,
          property_title,
          name,
          contact,
          method,
          message,
          status: 'pending',
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
      { error: 'Failed to create inquiry' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json()

    const { error } = await supabaseAdmin
      .from('inquiries')
      .update({ status })
      .eq('id', id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Inquiry updated successfully',
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()

    const { error } = await supabaseAdmin
      .from('inquiries')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Inquiry deleted successfully',
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to delete inquiry' },
      { status: 500 }
    )
  }
}