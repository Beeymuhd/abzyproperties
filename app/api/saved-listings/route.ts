import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    const savedListings = await query(
      `SELECT p.* FROM properties p
       INNER JOIN saved_listings s ON p.id = s.property_id
       WHERE s.user_id = ?
       ORDER BY s.created_at DESC`,
      [userId]
    );

    return NextResponse.json(savedListings, { status: 200 });
  } catch (error) {
    console.error('[v0] Get saved listings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch saved listings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user_id, property_id } = await request.json();

    if (!user_id || !property_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if already saved
    const existing = await queryOne(
      'SELECT id FROM saved_listings WHERE user_id = ? AND property_id = ?',
      [user_id, property_id]
    );

    if (existing) {
      return NextResponse.json(
        { message: 'Property already saved' },
        { status: 200 }
      );
    }

    const result = await query(
      'INSERT INTO saved_listings (user_id, property_id) VALUES (?, ?)',
      [user_id, property_id]
    ) as any;

    return NextResponse.json(
      { id: result.insertId, message: 'Property saved successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Save listing error:', error);
    return NextResponse.json(
      { error: 'Failed to save listing' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { user_id, property_id } = await request.json();

    if (!user_id || !property_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await query(
      'DELETE FROM saved_listings WHERE user_id = ? AND property_id = ?',
      [user_id, property_id]
    ) as any;

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Saved listing not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Saved listing removed successfully' }, { status: 200 });
  } catch (error) {
    console.error('[v0] Delete saved listing error:', error);
    return NextResponse.json(
      { error: 'Failed to remove saved listing' },
      { status: 500 }
    );
  }
}
