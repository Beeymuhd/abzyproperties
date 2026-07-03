import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 }
  )

  response.cookies.set({
    name: 'abzy_session_token',
    value: '',
    expires: new Date(0), // immediately expire
    path: '/',
  })

  return response
}
