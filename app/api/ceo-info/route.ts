import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const ceoInfo = await query(
      'SELECT * FROM ceo_info ORDER BY order_number ASC'
    );

    return NextResponse.json(ceoInfo, { status: 200 });
  } catch (error) {
    console.error('[v0] Get CEO info error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch CEO information' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { ceo_name, bio, title, image_url, order_number } = await request.json();

    if (!ceo_name) {
      return NextResponse.json(
        { error: 'CEO name is required' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO ceo_info (ceo_name, bio, title, image_url, order_number)
       VALUES (?, ?, ?, ?, ?)`,
      [ceo_name, bio || null, title || null, image_url || null, order_number || 0]
    ) as any;

    return NextResponse.json(
      { id: result.insertId, message: 'CEO information added successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Create CEO info error:', error);
    return NextResponse.json(
      { error: 'Failed to add CEO information' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ceo_name, bio, title, image_url, order_number } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'CEO ID required' },
        { status: 400 }
      );
    }

    const result = await query(
      `UPDATE ceo_info SET 
        ceo_name = ?, bio = ?, title = ?, image_url = ?, order_number = ?
       WHERE id = ?`,
      [ceo_name, bio, title, image_url, order_number, id]
    ) as any;

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'CEO information not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'CEO information updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('[v0] Update CEO info error:', error);
    return NextResponse.json(
      { error: 'Failed to update CEO information' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'CEO ID required' },
        { status: 400 }
      );
    }

    const result = await query(
      'DELETE FROM ceo_info WHERE id = ?',
      [id]
    ) as any;

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'CEO information not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'CEO information deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('[v0] Delete CEO info error:', error);
    return NextResponse.json(
      { error: 'Failed to delete CEO information' },
      { status: 500 }
    );
  }
}
