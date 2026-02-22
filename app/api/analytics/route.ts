import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30'; // days

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Total page views
    const pageViews = await query(
      `SELECT COUNT(*) as total FROM analytics_events 
       WHERE created_at >= ? AND event_type = 'page_view'`,
      [startDate]
    ) as any;

    // Unique visitors
    const uniqueVisitors = await query(
      `SELECT COUNT(DISTINCT user_id) as total FROM analytics_events 
       WHERE created_at >= ? AND user_id IS NOT NULL`,
      [startDate]
    ) as any;

    // Top properties by views
    const topProperties = await query(
      `SELECT p.id, p.title, COUNT(*) as views
       FROM analytics_events a
       LEFT JOIN properties p ON a.property_id = p.id
       WHERE a.created_at >= ? AND a.property_id IS NOT NULL
       GROUP BY a.property_id
       ORDER BY views DESC LIMIT 10`,
      [startDate]
    );

    // Daily page views trend
    const trend = await query(
      `SELECT DATE(created_at) as date, COUNT(*) as views
       FROM analytics_events
       WHERE created_at >= ? AND event_type = 'page_view'
       GROUP BY DATE(created_at)
       ORDER BY date ASC`,
      [startDate]
    );

    // Traffic sources
    const sources = await query(
      `SELECT 
        CASE 
          WHEN event_type = 'organic_search' THEN 'Organic'
          WHEN event_type = 'direct' THEN 'Direct'
          WHEN event_type = 'social' THEN 'Social'
          WHEN event_type = 'referral' THEN 'Referral'
          ELSE 'Other'
        END as source,
        COUNT(*) as count
       FROM analytics_events
       WHERE created_at >= ?
       GROUP BY source
       ORDER BY count DESC`,
      [startDate]
    );

    // Conversion metrics
    const inquiries = await query(
      `SELECT COUNT(*) as total FROM inquiries WHERE created_at >= ?`,
      [startDate]
    ) as any;

    const bookings = await query(
      `SELECT COUNT(*) as total FROM inspections WHERE created_at >= ?`,
      [startDate]
    ) as any;

    return NextResponse.json({
      period,
      pageViews: pageViews[0]?.total || 0,
      uniqueVisitors: uniqueVisitors[0]?.total || 0,
      inquiries: inquiries[0]?.total || 0,
      bookings: bookings[0]?.total || 0,
      topProperties,
      trend,
      sources,
    }, { status: 200 });
  } catch (error) {
    console.error('[v0] Get analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user_id, event_type, page_url, property_id } = await request.json();

    if (!event_type) {
      return NextResponse.json(
        { error: 'Event type is required' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO analytics_events (user_id, event_type, page_url, property_id)
       VALUES (?, ?, ?, ?)`,
      [user_id || null, event_type, page_url || null, property_id || null]
    );

    return NextResponse.json(
      { message: 'Event recorded successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Record event error:', error);
    return NextResponse.json(
      { error: 'Failed to record event' },
      { status: 500 }
    );
  }
}
