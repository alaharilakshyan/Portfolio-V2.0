import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Return a 200 OK response with empty data to prevent console errors
  return NextResponse.json({ success: true });
}
