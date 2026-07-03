import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET(request: NextRequest) {
try {
const { searchParams } = new URL(request.url)
const userId = searchParams.get('userId')


if (!userId) {
  return NextResponse.json(
    { error: 'User ID required' },
    { status: 400 }
  )
}

const { data, error } = await supabaseAdmin
  .from('saved_properties')
  .select(`
    property_id,
    properties (*)
  `)
  .eq('user_id', userId)

if (error) throw error

const savedProperties =
  data?.map((item: any) => item.properties).filter(Boolean) || []

return NextResponse.json(savedProperties)


} catch (error) {
console.error(error)


return NextResponse.json(
  { error: 'Failed to fetch saved listings' },
  { status: 500 }
)


}
}

export async function POST(request: NextRequest) {
try {
const { user_id, property_id } = await request.json()


const { data: existing } = await supabaseAdmin
  .from('saved_properties')
  .select('id')
  .eq('user_id', user_id)
  .eq('property_id', property_id)
  .single()

if (existing) {
  return NextResponse.json({
    message: 'Property already saved',
  })
}

const { error } = await supabaseAdmin
  .from('saved_properties')
  .insert([
    {
      user_id,
      property_id,
    },
  ])

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

export async function DELETE(request: NextRequest) {
try {
const { user_id, property_id } = await request.json()


const { error } = await supabaseAdmin
  .from('saved_properties')
  .delete()
  .eq('user_id', user_id)
  .eq('property_id', property_id)

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
