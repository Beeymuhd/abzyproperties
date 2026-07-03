import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { error } = await supabaseAdmin
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Property deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete property' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
const amenities = JSON.parse(
  (formData.get('amenities') as string) || '[]')
  const status = formData.get('status') as string

    const { data, error } = await supabaseAdmin
      .from('properties')
      .update({
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
      })
      .eq('id', id)
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
      { error: 'Failed to update property' },
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
    const landSize = Number(formData.get('landSize'))
    const status = formData.get('status') as string
    const amenities = JSON.parse((formData.get('amenities') as string) || '[]')

    const file = formData.get('image') as File | null

    let imageUrl = null

    if (file) {
      const fileName = `${Date.now()}-${file.name}`

      const { error: uploadError } = await supabaseAdmin.storage
        .from('property-images')
        .upload(fileName, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabaseAdmin.storage
        .from('property-images')
        .getPublicUrl(fileName)

      imageUrl = data.publicUrl
    }

    const location = `${address}, ${city}`

    const { data, error } = await supabaseAdmin
      .from('properties')
      .insert([
        {
          title,
          description,
          type: propertyType,
          property_type: propertyType,
          price,
          state,
          city,
          address,
          location,
          land_size: landSize,
          amenities,
          image_url: imageUrl,
          status,
          verified: false,
        },
      ])
      .select()
      .single()

    if (error) {
      return Response.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return Response.json(data)
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

