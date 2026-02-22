import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'approved';

    let sql = 'SELECT * FROM testimonials WHERE 1=1';
    const params: any[] = [];

    if (status !== 'all') {
      sql += ' AND status = ?';
      params.push(status);
    }

    sql += ' ORDER BY created_at DESC LIMIT 100';

    const testimonials = await query(sql, params);
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error('[v0] Get testimonials error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, rating, message } = await request.json();

    if (!name || !email || !rating || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO testimonials (name, email, rating, message, status)
       VALUES (?, ?, ?, ?, 'pending')`,
      [name, email, rating, message]
    ) as any;

    return NextResponse.json(
      { id: result.insertId, message: 'Testimonial submitted successfully. Pending admin approval.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Create testimonial error:', error);
    return NextResponse.json(
      { error: 'Failed to submit testimonial' },
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

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const result = await query(
      'UPDATE testimonials SET status = ? WHERE id = ?',
      [status, id]
    ) as any;

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Testimonial updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('[v0] Update testimonial error:', error);
    return NextResponse.json(
      { error: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Testimonial ID required' },
        { status: 400 }
      );
    }

    const result = await query(
      'DELETE FROM testimonials WHERE id = ?',
      [id]
    ) as any;

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Testimonial deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('[v0] Delete testimonial error:', error);
    return NextResponse.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}
