import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let sql = 'SELECT * FROM inspections WHERE 1=1';
    const params: any[] = [];

    if (userId) {
      sql += ' AND user_id = ?';
      params.push(userId);
    }

    sql += ' ORDER BY inspection_date DESC LIMIT 100';

    const inspections = await query(sql, params);
    return NextResponse.json(inspections, { status: 200 });
  } catch (error) {
    console.error('[v0] Get inspections error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inspections' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user_id, property_id, inspection_date, notes } = await request.json();

    if (!user_id || !property_id || !inspection_date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO inspections (user_id, property_id, inspection_date, notes, status)
       VALUES (?, ?, ?, ?, 'scheduled')`,
      [user_id, property_id, inspection_date, notes || null]
    ) as any;

    return NextResponse.json(
      { id: result.insertId, message: 'Inspection booked successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Create inspection error:', error);
    return NextResponse.json(
      { error: 'Failed to book inspection' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status, notes } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let sql = 'UPDATE inspections SET status = ?';
    const params: any[] = [status];

    if (notes) {
      sql += ', notes = ?';
      params.push(notes);
    }

    sql += ' WHERE id = ?';
    params.push(id);

    const result = await query(sql, params) as any;

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Inspection not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Inspection updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('[v0] Update inspection error:', error);
    return NextResponse.json(
      { error: 'Failed to update inspection' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Inspection ID required' },
        { status: 400 }
      );
    }

    const result = await query(
      'DELETE FROM inspections WHERE id = ?',
      [id]
    ) as any;

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Inspection not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Inspection cancelled successfully' }, { status: 200 });
  } catch (error) {
    console.error('[v0] Delete inspection error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel inspection' },
      { status: 500 }
    );
  }
}
