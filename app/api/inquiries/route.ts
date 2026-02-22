import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let sql = 'SELECT * FROM inquiries WHERE 1=1';
    const params: any[] = [];

    if (status && status !== 'all') {
      sql += ' AND status = ?';
      params.push(status);
    }

    sql += ' ORDER BY created_at DESC LIMIT 100';

    const inquiries = await query(sql, params);
    return NextResponse.json(inquiries, { status: 200 });
  } catch (error) {
    console.error('[v0] Get inquiries error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user_id, property_id, name, email, phone, message } = await request.json();

    if (!property_id || !name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO inquiries (user_id, property_id, name, email, phone, message, status)
       VALUES (?, ?, ?, ?, ?, ?, 'new')`,
      [user_id || null, property_id, name, email, phone, message || null]
    ) as any;

    return NextResponse.json(
      { id: result.insertId, message: 'Inquiry created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Create inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to create inquiry' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await query(
      'UPDATE inquiries SET status = ? WHERE id = ?',
      [status, id]
    ) as any;

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Inquiry updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('[v0] Update inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Inquiry ID required' },
        { status: 400 }
      );
    }

    const result = await query(
      'DELETE FROM inquiries WHERE id = ?',
      [id]
    ) as any;

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Inquiry deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('[v0] Delete inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}
