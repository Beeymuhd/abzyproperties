import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const cacInfo = await queryOne(
      'SELECT * FROM cac_registration ORDER BY created_at DESC LIMIT 1'
    );

    return NextResponse.json(cacInfo || {}, { status: 200 });
  } catch (error) {
    console.error('[v0] Get CAC info error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch CAC information' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { cac_number, document_url } = await request.json();

    if (!cac_number || !document_url) {
      return NextResponse.json(
        { error: 'CAC number and document URL are required' },
        { status: 400 }
      );
    }

    // Check if CAC already exists
    const existing = await queryOne(
      'SELECT id FROM cac_registration WHERE cac_number = ?',
      [cac_number]
    );

    if (existing) {
      // Update existing
      const result = await query(
        `UPDATE cac_registration SET document_url = ? WHERE cac_number = ?`,
        [document_url, cac_number]
      ) as any;

      return NextResponse.json(
        { message: 'CAC information updated successfully' },
        { status: 200 }
      );
    } else {
      // Insert new
      const result = await query(
        `INSERT INTO cac_registration (cac_number, document_url, verified)
         VALUES (?, ?, FALSE)`,
        [cac_number, document_url]
      ) as any;

      return NextResponse.json(
        { id: result.insertId, message: 'CAC information registered successfully' },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('[v0] Create CAC info error:', error);
    return NextResponse.json(
      { error: 'Failed to register CAC information' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, verified } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'CAC ID required' },
        { status: 400 }
      );
    }

    const result = await query(
      `UPDATE cac_registration SET verified = ? WHERE id = ?`,
      [verified, id]
    ) as any;

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'CAC information not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'CAC verification status updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('[v0] Update CAC info error:', error);
    return NextResponse.json(
      { error: 'Failed to update CAC information' },
      { status: 500 }
    );
  }
}
