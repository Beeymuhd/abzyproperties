import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const property = await queryOne(
      'SELECT * FROM properties WHERE id = ?',
      [id]
    );

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Get property images
    const images = await query(
      'SELECT * FROM property_images WHERE property_id = ? ORDER BY display_order',
      [id]
    );

    return NextResponse.json({ ...property, images }, { status: 200 });
  } catch (error) {
    console.error('[v0] Get property error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, description, type, location, price, bedrooms, bathrooms, area_sqft, verified, agent_name, agent_phone, agent_email, image_url, amenities } = await request.json();

    const result = await query(
      `UPDATE properties SET 
        title = ?, description = ?, type = ?, location = ?, price = ?, 
        bedrooms = ?, bathrooms = ?, area_sqft = ?, verified = ?,
        agent_name = ?, agent_phone = ?, agent_email = ?, image_url = ?, amenities = ?
       WHERE id = ?`,
      [title, description, type, location, price, bedrooms, bathrooms, area_sqft, verified, agent_name, agent_phone, agent_email, image_url, amenities ? JSON.stringify(amenities) : null, id]
    ) as any;

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Property updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('[v0] Update property error:', error);
    return NextResponse.json(
      { error: 'Failed to update property' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await query(
      'DELETE FROM properties WHERE id = ?',
      [id]
    ) as any;

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Property deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('[v0] Delete property error:', error);
    return NextResponse.json(
      { error: 'Failed to delete property' },
      { status: 500 }
    );
  }
}
