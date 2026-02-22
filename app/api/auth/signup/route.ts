import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { hashPassword } from '@/lib/password';
import { generateSessionToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, phone } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await queryOne(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const result = await query(
      'INSERT INTO users (email, password_hash, name, phone, role) VALUES (?, ?, ?, ?, ?)',
      [email, passwordHash, name, phone || null, 'user']
    ) as any;

    const userId = result.insertId;

    // Generate session
    const sessionToken = generateSessionToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Store session in database
    await query(
      'INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)',
      [userId, sessionToken, expiresAt]
    );

    const session = {
      user_id: userId,
      email: email,
      name: name,
      role: 'user',
      created_at: new Date(),
      expires_at: expiresAt,
    };

    const response = NextResponse.json(session, { status: 201 });

    // Set HTTP-only cookie
    response.cookies.set({
      name: 'abzy_session_token',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('[v0] Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
