import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
// GET ALL CEOs
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('ceo_info')
      .select('*')
      .order('order_number', { ascending: true })

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
      { error: 'Failed to fetch CEO information' },
      { status: 500 }
    )
  }
}

// CREATE CEO
export async function POST(request: NextRequest) {
  try {
    const {
      ceo_name,
      bio,
      title,
      image_url,
      order_number,
    } = await request.json()

    const { data, error } = await supabaseAdmin
      .from('ceo_info')
      .insert([
        {
          ceo_name,
          bio,
          title,
          image_url,
          order_number,
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
      { error: 'Failed to create CEO information' },
      { status: 500 }
    )
  }
}

// UPDATE CEO
export async function PUT(request: NextRequest) {
  try {
    const {
      id,
      ceo_name,
      bio,
      title,
      image_url,
      order_number,
    } = await request.json()

    const { error } = await supabaseAdmin
      .from('ceo_info')
      .update({
        ceo_name,
        bio,
        title,
        image_url,
        order_number,
      })
      .eq('id', id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'CEO updated successfully',
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to update CEO information' },
      { status: 500 }
    )
  }
}

// DELETE CEO
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()

    const { error } = await supabaseAdmin
      .from('ceo_info')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'CEO deleted successfully',
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to delete CEO information' },
      { status: 500 }
    )
  }
}