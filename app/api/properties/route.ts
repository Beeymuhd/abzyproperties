import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseAdmin
      .from('properties')
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
      { error: 'Failed to fetch properties' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const propertyType = formData.get('propertyType') as string
    const price = Number(formData.get('price'))
    const state = formData.get('state') as string
    const city = formData.get('city') as string
    const address = formData.get('address') as string
    const areaSqft = Number(formData.get('areaSqft')) || 0
    const landSize = Number(formData.get('landSize')) || 0
    const status = formData.get('status') as string
    const image = formData.get('image') as File | null
    const amenities = JSON.parse((formData.get('amenities') as string) || '[]')
    console.log('IMAGE RECEIVED:', image)
    // Upload image first
    let imageUrl: string | null = null

    if (image) {

      console.log('IMAGE NAME:', image.name)
      console.log('IMAGE SIZE:', image.size)
      
      const fileName = `${Date.now()}-${image.name}`

      const { error: uploadError } = await supabaseAdmin.storage
        .from('property-images')
        .upload(fileName, image)

      if (uploadError) {
        return NextResponse.json(
          { error: uploadError.message },
          { status: 500 }
        )
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from('property-images')
        .getPublicUrl(fileName)

      imageUrl = publicUrlData.publicUrl
    }

    // Insert property after image upload
    const { data, error } = await supabaseAdmin
      .from('properties')
      .insert([
        {
          title,
          description,
          type: propertyType,
          location: `${address}, ${city}`,
          price,
          state,
          city,
          address,
          area_sqft: areaSqft,
          land_size: landSize,
          amenities,
          status,
          verified: false,
          image_url: imageUrl,
        },
      ])
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
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { id, verified, } = await request.json()

    const { error } = await supabaseAdmin
      .from('properties')
      .update({
        verified,
      })
      .eq('id', id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Property updated successfully',
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to update property' },
      { status: 500 }
    )
  }
}
