import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const location = searchParams.get('location');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');

    let sql = 'SELECT * FROM properties WHERE 1=1';
    const params: any[] = [];

    if (type && type !== 'all') {
      sql += ' AND type = ?';
      params.push(type);
    }

    if (location) {
      sql += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    if (minPrice) {
      sql += ' AND price >= ?';
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      sql += ' AND price <= ?';
      params.push(parseFloat(maxPrice));
    }

    if (search) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY created_at DESC LIMIT 100';

    const properties = await query(sql, params);

    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.error('[v0] Get properties error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, type, location, price, bedrooms, bathrooms, area_sqft, agent_name, agent_phone, agent_email, image_url, amenities } = await request.json();

    if (!title || !type || !location || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO properties (title, description, type, location, price, bedrooms, bathrooms, area_sqft, agent_name, agent_phone, agent_email, image_url, amenities)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, type, location, price, bedrooms || null, bathrooms || null, area_sqft || null, agent_name, agent_phone, agent_email, image_url, amenities ? JSON.stringify(amenities) : null]
    ) as any;

    return NextResponse.json(
      { id: result.insertId, message: 'Property created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Create property error:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}
