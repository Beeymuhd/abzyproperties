import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
export async function GET() {
  return NextResponse.json({
    message: 'CAC Upload Route Working'
  })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const file = formData.get('file') as File

    console.log('FILE:', file?.name)

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `cac-${Date.now()}.${fileExt}`

    const { error } = await supabaseAdmin.storage
      .from('cac-documents')
      .upload(fileName, file, {
        upsert: true,
      })

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    const { data } = supabaseAdmin.storage
      .from('cac-documents')
      .getPublicUrl(fileName)

    return NextResponse.json({
      url: data.publicUrl,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}