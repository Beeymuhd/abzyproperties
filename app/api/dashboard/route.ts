import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'
export async function GET() {
  try {
    const { count: propertiesCount } = await supabaseAdmin
      .from('properties')
      .select('*', { count: 'exact', head: true })

    const { count: usersCount } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true })

    const { count: inquiriesCount } = await supabaseAdmin
      .from('inquiries')
      .select('*', { count: 'exact', head: true })

    const { data: recentInquiries } = await supabaseAdmin
     .from('inquiries')
     .select('id, name, property_title, created_at')
     .order('created_at', { ascending: false })
     .limit(5)

     const { count: testimonialsCount} = await supabaseAdmin
  .from("testimonials")
  .select("*", { count: "exact", head: true })

const { count: pendingTestimonialsCount } = await supabaseAdmin
  .from("testimonials")
  .select("*", { count: "exact", head: true })
  .eq("status", "pending")

    return NextResponse.json({
      properties: propertiesCount || 0,
      users: usersCount || 0,
      inquiries: inquiriesCount || 0,
      testimonials: testimonialsCount || 0,
      pendingTestimonials: pendingTestimonialsCount || 0,
      recentActivities: recentInquiries || [],
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}